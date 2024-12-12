import socket


# 读取文件内容
def read_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return [line.strip() for line in file if line.strip()]
    except FileNotFoundError:
        print(f"文件 {file_path} 未找到。")
        return []


# 解析通配符网址
def resolve_wildcard_hostname(hostname):
    if "*" in hostname:
        parts = hostname.split(".")
        if parts[0] == "*":
            wildcard_domain = ".".join(parts[1:])
            try:
                ip = socket.gethostbyname(wildcard_domain)
                print(f"解析通配符地址 {hostname} 为 {ip}")
                return ip
            except socket.gaierror:
                print(f"无法解析通配符地址 {hostname} 的 IP。")
                return None
    return None


# 获取网址的 IP 地址
def get_ip_from_hostname(hostname):
    if "*" in hostname:
        return resolve_wildcard_hostname(hostname)
    try:
        return socket.gethostbyname(hostname)
    except socket.gaierror:
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

    # 解析 IP 地址
    mappings = []
    for website in websites:
        ip = get_ip_from_hostname(website)
        if ip:
            mappings.append((ip, website))

    # 写入结果
    write_hosts_file(output_file, mappings)


if __name__ == "__main__":
    main()
