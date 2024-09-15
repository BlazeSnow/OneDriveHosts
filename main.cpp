#include <asio.hpp>
#include <iostream>
#include <vector>
#include <string>
#include <system_error>
#include <cstdlib>

using namespace std;

int main()
{
    string domain = "api.onedrive.com";
    vector<asio::ip::tcp::endpoint> endpoints = get_ips(domain);
    for (const auto &endpoint : endpoints)
    {
        cout << endpoint.address().to_string() << "\t" << domain << endl;
    }
    system("pause");
    return 0;
}