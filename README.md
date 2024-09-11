# OneDriveHosts

## 程序目的

通过指定OneDrive的网站的hosts，实现在封锁OneDrive的ip地址的区域使用OneDrive

## 程序来源

![ban](/image/ban.png)

如上图所示，部分地区封锁了OneDrive的网站的ip，导致OneDrive无法正常使用，需要通过指定ip的方法使用OneDrive的其他ip

## 被封锁链接及ip

- api.onedrive.com
- chi01pap001.storage.live.com
- **13.107.42.12**

## 程序实现

在hosts文件内添加此文件内容：[点击跳转](/hosts)

若使用SwitchHosts工具：https://raw.githubusercontent.com/BlazeSnow/OneDriveHosts/main/hosts

SwitchHosts：https://github.com/oldj/SwitchHosts