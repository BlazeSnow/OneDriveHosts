cmake_minimum_required(VERSION 3.29)

project(OneDriveHosts)

find_package(Qt6 REQUIRED COMPONENTS Core Network)

add_executable(OneDriveHosts main.cpp)

target_link_libraries(OneDriveHosts PRIVATE Qt6::Core Qt6::Network)