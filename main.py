import socket
import dns.resolver
import time


# 读取文件内容
def read_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return [line.strip() for line in file if line.strip()]
    except FileNotFoundError:
        print(f"文件 {file_path} 未找到。")
        return []


# 配置自定义 DNS 解析器
def configure_dns_resolver():
    resolver = dns.resolver.Resolver()
    resolver.nameservers = ["119.29.29.29"]
    return resolver


# 解析通配符网址
def resolve_wildcard_hostname(hostname, resolver):
    if "*" in hostname:
        parts = hostname.split(".")
        if parts[0] == "*":
            wildcard_domain = ".".join(parts[1:])
            try:
                answer = resolver.resolve(wildcard_domain, "A")
                ip = answer[0].to_text()
                print(f"解析通配符地址 {hostname} 为 {ip}")
                return ip
            except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer):
                print(f"无法解析通配符地址 {hostname} 的 IP。")
                return None
    return None


# 获取网址的 IP 地址
def get_ip_from_hostname(hostname, resolver):
    if "*" in hostname:
        return resolve_wildcard_hostname(hostname, resolver)
    try:
        answer = resolver.resolve(hostname, "A")
        return answer[0].to_text()
    except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer):
        print(f"无法解析 {hostname} 的 IP 地址。")
        return None


# 写入到 out.txt 文件
def write_hosts_file(output_path, mappings):
    try:
        with open(output_path, "w", encoding="utf-8") as file:
            for ip, hostname in mappings:
                file.write(f"{ip}\t{hostname}\n")
        print(f"已成功写入 {output_path}")
    except Exception as e:
        print(f"写入文件时出错: {e}")


# 主程序
def main():
    website_file = "website.txt"
    output_file = "out.txt"

    # 读取文件
    websites = read_file(website_file)

    if not websites:
        print("没有可处理的网址。")
        return

    # 配置 DNS 解析器
    resolver = configure_dns_resolver()

    # 解析 IP 地址
    mappings = []
    for i, website in enumerate(websites):
        ip = get_ip_from_hostname(website, resolver)
        if ip:
            mappings.append((ip, website))
        if i % 5 == 0:  # 每处理 5 个请求暂停 1 秒
            time.sleep(1)

    # 写入结果
    write_hosts_file(output_file, mappings)


if __name__ == "__main__":
    main()
