import socket


def get_ips_from_hostname(hostname):
    try:
        return socket.gethostbyname_ex(hostname)[2]  # 获取所有IP地址
    except socket.gaierror:
        return []


def main():
    # 读取 website.txt 和 ban.txt
    with open('website.txt', 'r') as website_file:
        websites = website_file.read().splitlines()

    with open('ban.txt', 'r') as ban_file:
        banned_ips = set(ban_file.read().splitlines())

    valid_entries = []

    # 将网址解析为多个 IP 地址并过滤被禁 IP
    for website in websites:
        ip_addresses = get_ips_from_hostname(website)
        for ip in ip_addresses:
            if ip not in banned_ips:
                valid_entries.append((ip, website))

    # 将结果写入 hosts 文件，使用制表符分隔
    with open('hosts', 'w') as hosts_file:
        for ip, website in valid_entries:
            hosts_file.write(f"{ip}\t{website}\n")


if __name__ == '__main__':
    main()
