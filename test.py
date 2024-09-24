import requests
import json


def resolve_domain_via_doh(domain):
    url = "https://dns.google/resolve?name={}&type=A".format(domain)
    response = requests.get(url, headers={"accept": "application/dns-json"})
    if response.status_code == 200:
        data = json.loads(response.content)
        answers = data.get('Answer', [])
        ips = []
        for answer in answers:
            if answer['type'] == 1:
                ips.append(answer['data'])
        return ips
    else:
        return None


domains = ['api.onedrive.com',
           'chi01pap001.storage.live.com', 'd.docs.live.net']
for domain in domains:
    ips = resolve_domain_via_doh(domain)
    if ips:
        print(f"域名 {domain} 的 IP 地址为：{ips}")
    else:
        print(f"无法获取域名 {domain} 的 IP 地址。")
