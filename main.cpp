#include <asio.hpp>
#include <iostream>
#include <vector>
#include <string>
#include <system_error>
#include <cstdlib>

using namespace std;

int main()
{
    asio::io_service ioservice;
    asio::io_service my_io_service;
    asio::ip::tcp::resolver resolver(my_io_service);
    asio::ip::tcp::resolver::query query("api.onedrive.com", "http");
    asio::ip::tcp::resolver::iterator iter = resolver.resolve(query);
    asio::ip::tcp::resolver::iterator end; // End marker.
    while (iter != end)
    {
        asio::ip::tcp::endpoint endpoint = *iter++;
        std::cout << endpoint << std::endl;
    }
    system("pause");
    return 0;
}