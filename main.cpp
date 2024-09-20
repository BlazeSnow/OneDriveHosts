#include <QCoreApplication>
#include <QDebug>
#include <QHostInfo>

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);
    QString url = "example.com"; // 这里替换为实际的网址
    QHostInfo info = QHostInfo::fromName(url);
    QList<QHostAddress> addrs = info.addresses();
    qDebug() << "All IP addresses for " << url << ":";
    for (int i = 0; i < addrs.size(); ++i)
    {
        qDebug() << addrs.at(i).toString();
    }
    // 假设这里有用户输入要排除的IP地址列表，为了简单演示，这里直接写死要排除的IP
    QStringList excludeList;
    excludeList << "192.168.1.1";
    qDebug() << "IP addresses after exclusion:";
    for (int i = 0; i < addrs.size(); ++i)
    {
        QString ip = addrs.at(i).toString();
        if (!excludeList.contains(ip))
        {
            qDebug() << ip;
        }
    }
    return a.exec();
}