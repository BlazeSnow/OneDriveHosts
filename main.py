import socket


def get_ipv4_addresses(domain):
    try:
        addr_info = socket.getaddrinfo(domain, None)
        ipv4_addresses = [addr[4][0]
                          for addr in addr_info if addr[0] == socket.AF_INET]
        return ipv4_addresses
    except socket.gaierror:
        return []


domain = "api.onedrive.com"
ips = get_ipv4_addresses(domain)
for ip in ips:
    print(ip)
