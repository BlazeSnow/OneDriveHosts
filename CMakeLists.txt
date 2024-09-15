cmake_minimum_required(VERSION 3.29)

project(OneDriveHosts)

set(asio_DIR "D:/vcpkg/packages/asio_x64-windows/share/asio")

find_package(asio CONFIG REQUIRED)

add_executable(OneDriveHosts main.cpp)

target_link_libraries(OneDriveHosts PRIVATE asio::asio)