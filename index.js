import { domains } from './domains.js';
import version from './VERSION';

const DEFAULT_IPS = ['150.171.23.11', '150.171.22.11'];

const IPV4_PATTERN = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

function parseIPs(input) {
    const ips = (input || '').split(/[,\s]+/).filter(ip => IPV4_PATTERN.test(ip));
    return ips.length > 0 ? ips : DEFAULT_IPS;
}

function generate(ips, custom = false) {
    const Head = [
        '# ------以下是BlazeSnow/OneDriveHosts的内容------',
        '',
        '# 来源: https://github.com/BlazeSnow/OneDriveHosts/',
        '# 镜像: https://gitee.com/blazesnow/OneDriveHosts/',
        '# 使用说明: https://www.blazesnow.com/onedrivehosts/',
        `# 版本: ${version}`,
        '',
        '# ------------------------------------------------',
        ''
    ];

    if (custom) {
        Head.push(
            '#             !!!!!!   警告   !!!!!!',
            '',
            '# 在未进行相关配置的情况下, ',
            '# 如果下方显示的IP地址不一致, 请勿使用此项目!',
            '',
            `# 默认IP地址: ${DEFAULT_IPS.join(', ')}`,
            `# 当前IP地址: ${ips.join(', ')}`,
            '',
            '# ------------------------------------------------',
            ''
        );
    }

    const GeneralDomain = domains.GeneralDomain.flatMap(domain => ips.map(ip => `${ip} ${domain}`));

    const Notes = [
        '',
        '# 以下内容来自UsbEAm Hosts Editor的规则',
        '# 来源：https://www.dogfight360.com/blog/18627/',
        ''
    ];

    const SpecificDomain = domains.SpecificDomain.flatMap(domain => ips.map(ip => `${ip} ${domain}`));

    const Foot = [
        '',
        '# ------以上是BlazeSnow/OneDriveHosts的内容------',
    ];

    return [...Head, ...GeneralDomain, ...Notes, ...SpecificDomain, ...Foot].join('\n');
}

export { generate };

export default {
    async fetch(request, env, ctx) {
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            });
        }

        const url = new URL(request.url);
        const useIPs = parseIPs(url.searchParams.get('ip'));
        const custom = useIPs.join(',') !== DEFAULT_IPS.join(',');

        const hostsContent = generate(useIPs, custom);

        return new Response(hostsContent, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
            }
        });
    }
};
