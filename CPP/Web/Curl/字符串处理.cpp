#include <string.h>


#include <iostream>


char urlAddr[256];
char urlPath[256];



void analysAddr(char* beginUrl);


int main_string() {
    wchar_t url[256] = {0};
    // printf("����������: ");
    // ת��Ϊ���ַ���
    mbstowcs_s(NULL, url, "https://www.bilibili.com/video/BV1NA411n7Gs/?p=1",
               _TRUNCATE);
  

    printf("%s", "�������");
    return 0;
}

void analysAddr(char* beginUrl) {
    memset(urlAddr, 0, 256);
    memset(urlPath, 0, 256);

    char* p = strstr(beginUrl, "http://");
    if (p == NULL) return;
    p += 7;

    sscanf_s(p, "%[^/]/%s", urlAddr, 256, urlPath, 256);
}

