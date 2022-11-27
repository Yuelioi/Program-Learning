#include <stdio.h>
#include <windows.h>
#include "resource.h"

HANDLE g_hOutput;  // ��� ����̨�����

// ���ڴ�����(�Զ��� ������Ϣ)
LRESULT CALLBACK WndProd(HWND hWnd, UINT msgID, WPARAM wParam, LPARAM IParam) {
    switch (msgID) {
    case WM_SETCURSOR:
    {
        HCURSOR hCUr = LoadCursor(GetModuleHandle(NULL),(char*)IDC_CURSOR2);
        if (LOWORD(IParam) == HTCLIENT) {
            SetCursor(hCUr);
        }
        else if (LOWORD(IParam) == HTCAPTION) {
            SetCursor(hCUr);
        }
        return 0; // �ǵ÷���, ��Ȼ����Ĭ�ϴ���
    }
    break;
    case WM_DESTROY:
        PostQuitMessage(0);
        break;
    }

    return DefWindowProc(hWnd, msgID, wParam, IParam);
}

// ��ں���
int CALLBACK WinMain(HINSTANCE hIns, HINSTANCE hPreIns, LPSTR IpCmdLine,
    int nCmdShow) {
    // ������ʾ����̨
    AllocConsole();
    g_hOutput = GetStdHandle(STD_OUTPUT_HANDLE);

    // ע�ᴰ����
    WNDCLASS wc = { 0 };
    wc.cbClsExtra = 0;
    wc.cbWndExtra = 0;
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
    wc.hCursor = NULL;  // Ĭ�������ʽ
    wc.hIcon = LoadIcon(hIns,(char*)IDI_ICON1);    // Icon
    wc.hInstance = hIns;
    wc.lpfnWndProc = WndProd;  //����������
    wc.lpszClassName = "Main";
    wc.lpszMenuName = NULL;              // ��Ҫ�˵�
    wc.style = CS_HREDRAW | CS_VREDRAW;  // ����ˮƽ/��ֱ�仯ʱ �ػ洰��
    RegisterClass(&wc);                  // �����ϸ�ֵд�����ϵͳ

    // ���ڴ��д�������
    HWND hWnd = CreateWindow(  // ���ؾ��
        "Main", "window",
        WS_OVERLAPPEDWINDOW,  // ���
        100, 100, 500, 500,
        NULL,  // ������
        NULL,  // �˵�
        hIns, NULL);

    // ��ʾ����
    ShowWindow(hWnd, SW_SHOW);
    UpdateWindow(hWnd);

    // ��Ϣѭ��
    MSG nMsg = {};
    while (GetMessage(&nMsg, NULL, 0, 0)) {
        TranslateMessage(&nMsg);  // ������Ϣ
        DispatchMessage(&nMsg);  // �ɷ���Ϣ(˭������Ϣ ���ɷ���˭ -> ���ڴ�����)
    }
    return 0;
}