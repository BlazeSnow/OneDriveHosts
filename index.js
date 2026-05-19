import { domains } from './domains.js';

const LastUpdated = '2025-02-23T12:24:00+08:00';

const DEFAULT_IP = '13.107.43.12';

function generate(IP) {
    const Head = [
        '# ------以下是BlazeSnow/OneDriveHosts的内容------',
        '',
        '# 来源: https://github.com/BlazeSnow/OneDriveHosts/',
        '# 镜像: https://gitee.com/blazesnow/OneDriveHosts/',
        '# 使用说明: https://www.blazesnow.com/onedrivehosts/',
        `# 更新时间: ${LastUpdated}`,
        '',
        '# ------------------------------------------------',
        '',
        '#             !!!!!!   警告   !!!!!!',
        '',
        '# 在未进行相关配置的情况下, ',
        '# 如果下方显示的IP地址不一致, 请勿使用此项目!',
        '',
        `# 默认IP地址: ${DEFAULT_IP}`,
        `# 当前IP地址: ${IP}`,
        '',
        '# ------------------------------------------------',
        ''
    ];

    const GeneralDomain = domains.GeneralDomain.map(domain => `${IP} ${domain}`);

    const Notes = [
        '',
        '# 以下内容来自UsbEAm Hosts Editor的规则',
        '# 来源：https://www.dogfight360.com/blog/18627/',
        ''
    ];

    const SpecificDomain = domains.SpecificDomain.map(domain => `${IP} ${domain}`);

    const Foot = [
        '',
        '# ------以上是BlazeSnow/OneDriveHosts的内容------',
    ];

    return [...Head, ...GeneralDomain, ...Notes, ...SpecificDomain, ...Foot].join('\n');
}

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
        const inputIP = url.searchParams.get('ip');
        const useIP = inputIP || DEFAULT_IP;

        const hostsContent = generate(useIP);

        return new Response(hostsContent, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
            }
        });
    }
};
