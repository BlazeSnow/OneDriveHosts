#include <QCoreApplication>
#include <QDnsLookup>

int main(int argc, char *argv[])
{
    QCoreApplication app(argc, argv);

    // 创建 QDnsLookup 对象
    QDnsLookup *lookup = new QDnsLookup();
    lookup->setNameserver("1.1.1.1");
    lookup->setHostName("api.onedrive.com");

    // 连接到 namedHost() 信号
    QObject::connect(lookup, &QDnsLookup::finished, [lookup]
                     {
        if (lookup->error() == QDnsLookup::NoError) {
            qDebug() << "IP addresses for" << lookup->hostName();
            foreach (const QHostAddress &address, lookup->addresses()) {
                qDebug() << address.toString();
            }
        } else {
            qDebug() << "DNS lookup failed:" << lookup->errorString();
        }
        lookup->deleteLater(); });

    // 开始查询
    lookup->exec();

    return app.exec();
}