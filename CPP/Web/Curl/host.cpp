#include <winsock2.h>
#include <ws2tcpip.h>

#include <iostream>

#pragma comment(lib, "ws2_32.lib")  // 链接到Winsock库

int main() {
    // 初始化Winsock
    WSADATA wsaData;
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        std::cerr << "Failed to initialize Winsock." << std::endl;
        return 1;
    }

    const char* hostname = "www.yuelili.com";
    struct addrinfo* result = nullptr;

    // 使用getaddrinfo获取地址信息
    int status = getaddrinfo(hostname, nullptr, nullptr, &result);
    if (status != 0) {
        std::cerr << "getaddrinfo failed: " << gai_strerror(status)
                  << std::endl;
        WSACleanup();
        return 1;
    }

    // 遍历结果并输出IP地址
    for (struct addrinfo* p = result; p != nullptr; p = p->ai_next) {
        char ip[INET6_ADDRSTRLEN];
        void* addr;
        if (p->ai_family == AF_INET) {
            struct sockaddr_in* ipv4 = (struct sockaddr_in*)p->ai_addr;
            addr = &(ipv4->sin_addr);
        } else {
            struct sockaddr_in6* ipv6 = (struct sockaddr_in6*)p->ai_addr;
            addr = &(ipv6->sin6_addr);
        }

        // 将IP地址转换为字符串形式
        inet_ntop(p->ai_family, addr, ip, sizeof(ip));
        std::cout << "IP Address: " << ip << std::endl;
    }

    // 释放地址信息
    freeaddrinfo(result);

    // 关闭Winsock
    WSACleanup();

    return 0;
}
