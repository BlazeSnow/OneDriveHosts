#include <asio.hpp>
#include <iostream>
#include <vector>
#include <string>
#include <system_error>
#include <cstdlib>

std::vector<asio::ip::tcp::endpoint> get_all_ips(const std::string &domain)
{
    asio::io_context io;
    asio::ip::tcp::resolver resolver(io);
    std::vector<asio::ip::tcp::endpoint> endpoints;
    try
    {
        // 先创建名称服务器的endpoint
        asio::ip::address name_server_addr = asio::ip::address::from_string("1.1.1.1");
        asio::ip::tcp::endpoint name_server(name_server_addr, 53);

        asio::ip::tcp::resolver::query query(domain, "");
        // 使用async_resolve并提供自定义的resolve_handler
        resolver.async_resolve(query, name_server,
                               [&endpoints](const std::error_code &ec, asio::ip::tcp::resolver::iterator it)
                               {
                                   if (!ec)
                                   {
                                       asio::ip::tcp::resolver::iterator end;
                                       while (it != end)
                                       {
                                           endpoints.push_back(*it);
                                           ++it;
                                       }
                                   }
                                   else
                                   {
                                       std::cerr << "Error resolving domain: " << ec.message() << std::endl;
                                   }
                               });
        io.run();
    }
    catch (const std::system_error &e)
    {
        std::cerr << "Error resolving domain: " << e.what() << std::endl;
    }
    return endpoints;
}

int main()
{
    std::string domain = "api.onedrive.com";
    std::vector<asio::ip::tcp::endpoint> endpoints = get_all_ips(domain);
    for (const auto &endpoint : endpoints)
    {
        std::cout << "IP: " << endpoint.address().to_string() << std::endl;
    }
    system("pause");
    return 0;
}