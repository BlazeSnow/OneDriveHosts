#include <QCoreApplication>
#include <QHostInfo>
#include <QDebug>
#include <QProcess>

int main(int argc, char *argv[])
{
    QCoreApplication app(argc, argv);

    // 保存原始DNS设置
    QStringList getDnsCommand = {"netsh", "interface", "ipv4", "show", "dns"};
    QProcess getDnsProcess;
    getDnsProcess.start(getDnsCommand.join(" "));
    getDnsProcess.waitForFinished();
    QString originalDnsSettings = getDnsProcess.readAllStandardOutput();

    // 设置DNS服务器地址（以管理员身份运行时生效）
    QString dnsServer = "1.1.1.1";
    QProcess::execute("netsh", QStringList() << "interface" << "ipv4" << "set" << "dns" << "name=\"Wi - Fi\"" << "static" << dnsServer);

    QHostInfo::lookupHost("api.onedrive.com", [originalDnsSettings](const QHostInfo &host)
                          {
        if (host.error()!= QHostInfo::NoError) {
            qDebug() << "DNS lookup failed:" << host.errorString();
            return;
        }
        qDebug() << "IP addresses for" << host.hostName();
        foreach (const QHostAddress& address, host.addresses()) {
            qDebug() << address.toString();
        }

        // 恢复原始DNS设置
        QProcess::execute("netsh", QStringList() << "interface" << "ipv4" << "set", QStringList() << "dns" << "name=\"Wi - Fi\"" << originalDnsSettings.split("\n").first().split(": ").last()); });

    return app.exec();
}