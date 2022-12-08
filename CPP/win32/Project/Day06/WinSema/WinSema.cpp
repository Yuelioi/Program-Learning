#include <Windows.h>
#include<stdio.h>
#include <iostream>

HANDLE g_hSema = 0;

DWORD CALLBACK TestProc(LPVOID pParam) {
    while (1) {
        WaitForSingleObject(g_hSema, INFINITE);
        printf("---\n");
    }
}

int main()
{

    g_hSema = CreateSemaphore(NULL, 3, 10, NULL);
    DWORD nID = 0;
    HANDLE hThread = CreateThread(NULL, 0, TestProc, NULL,  0, &nID);
    getchar();
    ReleaseSemaphore(g_hSema,5,NULL);
    WaitForSingleObject(hThread,INFINITE);
    CloseHandle(g_hSema);
    return 0;
}
