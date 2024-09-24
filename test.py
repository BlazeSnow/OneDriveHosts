import dns.resolver


def get_ip_addresses_using_dnspython(domain_list):
    resolver = dns.resolver.Resolver()
    resolver.nameservers = ['1.1.1.1']
    ips = []
    for domain in domain_list:
        try:
            answers = resolver.resolve(domain)
            for rdata in answers:
                ips.append(rdata.address)
        except dns.resolver.NXDOMAIN:
            print(f"域名 {domain} 不存在。")
        except dns.resolver.NoAnswer:
            print(f"无法获取域名 {domain} 的 IP 地址。")
    return ips


domain_list = ['example.com', 'anotherdomain.com']
ips = get_ip_addresses_using_dnspython(domain_list)
print(ips)
