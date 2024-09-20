#include <QCoreApplication>
#include <QHostInfo>
#include <QHostAddress>
#include <QList>
#include <QTextStream>
#include <iostream>

// 获取用户输入需要排除的IP地址
QList<QHostAddress> getExcludedIPs()
{
    QList<QHostAddress> excludedIPs;
    QTextStream qin(stdin);
    QString input;

    std::cout << "输入需要排除的IP地址，输入'q'完成输入：" << std::endl;
    while (true)
    {
        std::cout << "排除的IP: ";
        input = qin.readLine().trimmed();
        if (input == "q")
        {
            break;
        }
        QHostAddress address(input);
        if (!address.isNull())
        {
            excludedIPs.append(address);
        }
        else
        {
            std::cout << "无效的IP地址，请重试。" << std::endl;
        }
    }
    return excludedIPs;
}

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    QTextStream qin(stdin);
    QString hostname;

    // 询问用户输入网址
    std::cout << "请输入网址: ";
    hostname = qin.readLine().trimmed();

    // 获取所有IP地址
    QHostInfo hostInfo = QHostInfo::fromName(hostname);

    if (hostInfo.error() != QHostInfo::NoError)
    {
        std::cerr << "无法解析主机名: " << hostInfo.errorString().toStdString() << std::endl;
        return -1;
    }

    QList<QHostAddress> excludedIPs = getExcludedIPs();

    // 输出所有不在排除列表中的IP地址
    std::cout << "IP地址列表:" << std::endl;
    for (const QHostAddress &address : hostInfo.addresses())
    {
        if (!excludedIPs.contains(address))
        {
            std::cout << address.toString().toStdString() << std::endl;
        }
    }

    return 0;
}
