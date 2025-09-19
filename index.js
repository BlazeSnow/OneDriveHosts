import express from 'express';
import cors from 'cors';
import { domains } from './domains.js';
const PORT = 3000;
const app = express();
app.use(cors());

// 更新时间
const LastUpdated = '2025-02-23 12:24:00';

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
        `# 更新时间: ${LastUpdated} (UTC+8)`,
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

app.get('/', (req, res) => {

    const inputIP = req.query.ip;
    const useIP = inputIP || DEFAULT_IP;

    const hostsContent = generate(useIP);
    res.set('Content-Type', 'text/plain; charset=utf-8');

    res.send(hostsContent);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
