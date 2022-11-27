#include <windows.h>
#include <stdio.h>
#include"resource.h"

HANDLE g_hOutput; // 句柄 控制台输出用

void OnCommand(HWND hWnd, WPARAM wParam) {
	switch (LOWORD(wParam)) {
	case ID_NEW:
		MessageBox(hWnd,"新建","命令窗口",MB_OK);
		break;
	} 
}
void OnRButtonUp(HWND hWnd, LPARAM lParam) {
	HMENU hMain = LoadMenu(GetModuleHandle(NULL), (char*)IDR_MENU1);  // 获取菜单句柄
	HMENU hPopup = GetSubMenu(hMain,0); // 获取第一个子菜单
	
	// 获取屏幕坐标
	POINT pt;
	pt.x = LOWORD(lParam);
	pt.y = HIWORD(lParam);
	ClientToScreen(hWnd, &pt);

	// 构建菜单
	TrackPopupMenu(
		hPopup,
		TPM_LEFTALIGN | TPM_TOPALIGN,
		pt.x, pt.y,
		0,
		hWnd,
		NULL
	);
}

// 窗口处理函数(自定义 处理消息)
LRESULT CALLBACK WndProd(HWND hWnd, UINT msgID, WPARAM wParam, LPARAM lParam) {
	switch (msgID) {

	case WM_RBUTTONUP:
		OnRButtonUp(hWnd,lParam);
		break;

	case WM_DESTROY:
		PostQuitMessage(0);
		break;


	case WM_CREATE:
	{HMENU hMenu = LoadMenu(GetModuleHandle(NULL), (char*)IDR_MENU1);  // 获取菜单句柄
		SetMenu(hWnd, hMenu);
		break; }

	case WM_COMMAND:
		OnCommand(hWnd, wParam);
		break;

	};

	return DefWindowProc(hWnd, msgID, wParam, lParam);
}

// 入口函数
int CALLBACK WinMain(HINSTANCE hIns, HINSTANCE hPreIns, LPSTR IpCmdLine, int nCmdShow) {

	// 允许显示控制台
	AllocConsole();
	g_hOutput = GetStdHandle(STD_OUTPUT_HANDLE);

	// 注册窗口类
	WNDCLASS wc = { 0 };
	wc.cbClsExtra = 0;
	wc.cbWndExtra = 0;
	wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
	wc.hCursor = NULL;// 默认鼠标样式
	wc.hIcon = NULL;// Icon
	wc.hInstance = hIns;
	wc.lpfnWndProc = WndProd; //处理函数名称
	wc.lpszClassName = "Main";
	wc.lpszMenuName = NULL; // 不要菜单
	wc.style = CS_HREDRAW | CS_VREDRAW; // 窗口水平/垂直变化时 重绘窗口
	RegisterClass(&wc); // 将以上赋值写入操作系统

	// 在内存中创建窗口
	HWND hWnd = CreateWindow( // 返回句柄
		"Main",
		"window",
		WS_OVERLAPPEDWINDOW, // 风格
		100, 100, 500, 500,
		NULL, // 父窗口
		NULL, // 菜单
		hIns,
		NULL
	);

	// 显示窗口
	ShowWindow(hWnd, SW_SHOW);
	UpdateWindow(hWnd);

	// 消息循环
	MSG nMsg = {};
	while (GetMessage(&nMsg, NULL, 0, 0)) {
		TranslateMessage(&nMsg); // 翻译消息
		DispatchMessage(&nMsg); // 派发消息(谁处理消息 就派发给谁 -> 窗口处理函数)
	}
	return 0;
}