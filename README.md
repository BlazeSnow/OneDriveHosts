# OneDriveHosts

## 程序目的

通过指定OneDrive的网站的hosts，实现在封锁OneDrive的ip地址的区域使用OneDrive

## 程序来源

<img src="./image/api.onedrive.com.png" width=390px height=350px/>

|             网站             | 被封锁的ip地址 |
| :--------------------------: | :------------: |
|       api.onedrive.com       |  13.107.42.12  |
| chi01pap001.storage.live.com |  13.107.42.12  |

## 程序实现

在hosts文件内添加：

```txt
13.107.43.12    api.onedrive.com
13.105.28.16    chi01pap001.storage.live.com
```