import { domains } from './domains.js';

// 更新时间
const LastUpdated = '2025年2月23日12点24分';

// 默认IP地址
const DEFAULT_IP = '13.107.43.12';

// 生成hosts内容
function generate(IP) {
    const Head = [
        '# ------以下是BlazeSnow/OneDriveHosts的内容------',
        '',
        '# 来源: https://github.com/BlazeSnow/OneDriveHosts/',
        '# 镜像: https://gitee.com/blazesnow/OneDriveHosts/',
        '# 使用说明: https://www.blazesnow.com/OneDriveHosts/',
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

async function handleRequest(request) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // 设置CORS头
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 处理OPTIONS请求
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: corsHeaders
        });
    }

    // 获取IP参数
    const inputIP = searchParams.get('ip');
    let useIP;
    if (inputIP) {
        useIP = inputIP;
    } else {
        useIP = DEFAULT_IP;
    }

    // 生成hosts内容
    const hostsContent = generate(useIP);

    return new Response(hostsContent, {
        status: 200,
        headers: {
            ...corsHeaders,
            'Content-Type': 'text/plain; charset=utf-8'
        }
    });
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

export default {
    async fetch(request, env, ctx) {
        return handleRequest(request);
    }
};
