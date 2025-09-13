const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 更新时间
const LastUpdated = '2025年2月23日12点24分';

// 默认IP地址
const DEFAULT_IP = '13.107.43.12';

// 读取域名列表
function loadDomains() {
    try {
        const domainsPath = path.join(__dirname, 'domains.json');
        const data = fs.readFileSync(domainsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取domains.json文件失败:', error);
        return [];
    }
}

// 生成hosts内容
function generate(IP) {
    const domains = loadDomains();

    const Head = [
        '# ------以下是BlazeSnow/OneDriveHosts的内容------',
        '',
        '# 来源：https://github.com/BlazeSnow/OneDriveHosts',
        '# 镜像：https://gitee.com/blazesnow/OneDriveHosts',
        `# 更新时间：${LastUpdated}`,
        `# 使用IP地址：${IP}`,
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
    ]

    return [...Head, ...GeneralDomain, ...Notes, ...SpecificDomain, ...Foot].join('\n');
}

// 首页路由
app.get('/', (req, res) => {
    // 获取IP地址
    const inputIP = req.query.ip;
    const useIP = inputIP && inputIP ? inputIP : DEFAULT_IP;

    // 生成修改后的hosts内容
    const HostsContent = generate(useIP);

    // 设置响应头
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    // 输出hosts内容
    res.send(HostsContent);
});

// 启动服务器
app.listen(port, () => {
    console.log(`OneDriveHosts已启动`);
    console.log(`访问地址: http://localhost:${port}/?ip=0.0.0.0`);
    console.log(`默认IP地址: ${DEFAULT_IP}`);
});
