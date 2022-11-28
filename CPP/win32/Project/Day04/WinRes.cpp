#include <stdio.h>
#include <windows.h>
#include "resource.h"

HANDLE g_hOutput;  // 句柄 控制台输出用

void OnCommand(HWND hWnd, WPARAM wParam) {
    switch (LOWORD(wParam)){
    case ID_NEW:
        MessageBox(hWnd, "新建", "信息", MB_OK);
        break;
}

}

// 窗口处理函数(自定义 处理消息)
LRESULT CALLBACK WndProd(HWND hWnd, UINT msgID, WPARAM wParam, LPARAM lParam) {
    switch (msgID) {
    case WM_SETCURSOR:
    {
        HCURSOR hCUr = LoadCursor(GetModuleHandle(NULL),(char*)IDC_CURSOR2);
        if (LOWORD(lParam) == HTCLIENT) {
            SetCursor(hCUr);
        }
        else if (LOWORD(lParam) == HTCAPTION) {
            SetCursor(hCUr);
        }
        return 0; // 记得返回, 不然还会默认处理
    }
    break;
    case WM_COMMAND:
        OnCommand(hWnd,wParam);
        break;
    case WM_DESTROY:
        PostQuitMessage(0);
        break;
    }

    return DefWindowProc(hWnd, msgID, wParam, lParam);
}

// 入口函数
int CALLBACK WinMain(HINSTANCE hIns, HINSTANCE hPreIns, LPSTR IpCmdLine,
    int nCmdShow) {
    // 允许显示控制台
    AllocConsole();
    g_hOutput = GetStdHandle(STD_OUTPUT_HANDLE);

    // 注册窗口类
    WNDCLASS wc = { 0 };
    wc.cbClsExtra = 0;
    wc.cbWndExtra = 0;
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
    wc.hCursor = NULL;  // 默认鼠标样式
    wc.hIcon = LoadIcon(hIns,(char*)IDI_ICON1);    // Icon
    wc.hInstance = hIns;
    wc.lpfnWndProc = WndProd;  //处理函数名称
    wc.lpszClassName = "Main";
    wc.lpszMenuName = (char*)IDR_MENU1;              // 不要菜单
    wc.style = CS_HREDRAW | CS_VREDRAW;  // 窗口水平/垂直变化时 重绘窗口
    RegisterClass(&wc); 
    
    // 将以上赋值写入操作系统

    char szTitle[256] = { 0 };
    LoadString(hIns,IDS_WND,szTitle,256);

    // 在内存中创建窗口
    HWND hWnd = CreateWindow(  // 返回句柄
        "Main", szTitle,
        WS_OVERLAPPEDWINDOW,  // 风格
        100, 100, 500, 500,
        NULL,  // 父窗口
        NULL,  // 菜单
        hIns, NULL);

    // 显示窗口
    ShowWindow(hWnd, SW_SHOW);
    UpdateWindow(hWnd);

    // 消息循环
    MSG nMsg = {};
    HACCEL hAccel = LoadAccelerators(hIns, (char*)IDR_ACCELERATOR1);
    while (GetMessage(&nMsg, NULL, 0, 0)) {
        if (!TranslateAccelerator(hWnd, hAccel, &nMsg)) {
            TranslateMessage(&nMsg);  // 翻译消息
            DispatchMessage(&nMsg);  // 派发消息(谁处理消息 就派发给谁 -> 窗口处理函数)
        }
    }
    return 0;
}