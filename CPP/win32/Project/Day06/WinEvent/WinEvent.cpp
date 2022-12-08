// WinEvent.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include <iostream>
#include<Windows.h>
#include<stdio.h>

HANDLE g_hEvent;


DWORD CALLBACK PrintProc(LPVOID pParam) {
    while (1) {
        WaitForSingleObject(g_hEvent, INFINITE);
        ResetEvent(g_hEvent); // 也可以初始化时 改成自动复位,WaitFor后 自动reset
        printf("------\n");
        
    }
    return 0;
}

DWORD CALLBACK CtrlProc(LPVOID pParam) {
    while (1){
        Sleep(1000);
        SetEvent(g_hEvent);
    }
    return 0;
}

int main()
{
    g_hEvent = CreateEvent(NULL,TRUE,FALSE,NULL);
    DWORD nID = 0;
    HANDLE hThread[2] = {};
    hThread[0] = CreateThread(NULL, 0, PrintProc, NULL, 0, &nID);
    hThread[1] = CreateThread(NULL, 0, CtrlProc, NULL, 0, &nID);

    WaitForMultipleObjects(2, hThread, TRUE, INFINITE);
    CloseHandle(g_hEvent);

    std::cout << "Hello World!\n";
}

// 运行程序: Ctrl + F5 或调试 >“开始执行(不调试)”菜单
// 调试程序: F5 或调试 >“开始调试”菜单

// 入门使用技巧: 
//   1. 使用解决方案资源管理器窗口添加/管理文件
//   2. 使用团队资源管理器窗口连接到源代码管理
//   3. 使用输出窗口查看生成输出和其他消息
//   4. 使用错误列表窗口查看错误
//   5. 转到“项目”>“添加新项”以创建新的代码文件，或转到“项目”>“添加现有项”以将现有代码文件添加到项目
//   6. 将来，若要再次打开此项目，请转到“文件”>“打开”>“项目”并选择 .sln 文件
