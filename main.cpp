#include <iostream>
#include <string>
#include <vector>
#include <cstring>
#include <cstdlib>     // 包含 system 函数
#include <netdb.h>     // getaddrinfo, freeaddrinfo, struct addrinfo
#include <arpa/inet.h> // inet_ntop

// 获取用户输入需要排除的IP地址
std::vector<std::string> getExcludedIPs()
{
    std::vector<std::string> excludedIPs;
    std::string input;

    std::cout << "输入需要排除的IP地址，输入'q'完成输入：" << std::endl;
    while (true)
    {
        std::cout << "排除的IP: ";
        std::getline(std::cin, input);
        if (input == "q")
        {
            break;
        }
        excludedIPs.push_back(input);
    }
    return excludedIPs;
}

int main()
{
    // 设置终端编码为UTF-8
    system("chcp 65001");

    std::string hostname;

    // 询问用户输入网址
    std::cout << "请输入网址: ";
    std::getline(std::cin, hostname);

    // 解析域名，获取IP地址
    struct addrinfo hints, *res, *p;
    memset(&hints, 0, sizeof hints);
    hints.ai_family = AF_UNSPEC; // IPv4 或 IPv6
    hints.ai_socktype = SOCK_STREAM;

    int status;
    if ((status = getaddrinfo(hostname.c_str(), NULL, &hints, &res)) != 0)
    {
        std::cerr << "无法解析主机名: " << gai_strerror(status) << std::endl;
        system("pause");
        return -1;
    }

    // 获取用户输入的排除IP地址
    std::vector<std::string> excludedIPs = getExcludedIPs();

    // 输出所有不在排除列表中的IP地址
    std::cout << "IP地址列表:" << std::endl;
    for (p = res; p != NULL; p = p->ai_next)
    {
        void *addr;
        char ipstr[INET6_ADDRSTRLEN];

        // 获取该条记录中的IP地址
        if (p->ai_family == AF_INET)
        { // IPv4
            struct sockaddr_in *ipv4 = (struct sockaddr_in *)p->ai_addr;
            addr = &(ipv4->sin_addr);
        }
        else
        { // IPv6
            struct sockaddr_in6 *ipv6 = (struct sockaddr_in6 *)p->ai_addr;
            addr = &(ipv6->sin6_addr);
        }

        // 将IP地址转换为可读字符串
        inet_ntop(p->ai_family, addr, ipstr, sizeof ipstr);

        // 检查该IP是否在排除列表中
        if (std::find(excludedIPs.begin(), excludedIPs.end(), ipstr) == excludedIPs.end())
        {
            std::cout << ipstr << std::endl;
        }
    }

    freeaddrinfo(res); // 释放结果内存

    // 暂停程序，以防终端窗口立即关闭
    system("pause");
    return 0;
}
