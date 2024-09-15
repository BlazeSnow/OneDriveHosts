#include <asio.hpp>
#include <iostream>
#include <vector>
#include <string>
#include <system_error>

std::vector<asio::ip::tcp::endpoint> get_all_ips(const std::string &domain)
{
    asio::io_context io;
    asio::ip::tcp::resolver resolver(io);
    std::vector<asio::ip::tcp::endpoint> endpoints;
    try
    {
        asio::ip::tcp::resolver::query query(domain, "");
        asio::ip::tcp::resolver::iterator it = resolver.resolve(query);
        asio::ip::tcp::resolver::iterator end;
        while (it != end)
        {
            endpoints.push_back(*it);
            ++it;
        }
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