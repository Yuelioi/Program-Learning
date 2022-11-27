#include <windows.h>
#include <stdio.h>
#include"resource.h"

HANDLE g_hOutput; // ��� ����̨�����

void OnCommand(HWND hWnd, WPARAM wParam) {
	switch (LOWORD(wParam)) {
	case ID_NEW:
		MessageBox(hWnd,"�½�","�����",MB_OK);
		break;
	} 
}
void OnRButtonUp(HWND hWnd, LPARAM lParam) {
	HMENU hMain = LoadMenu(GetModuleHandle(NULL), (char*)IDR_MENU1);  // ��ȡ�˵����
	HMENU hPopup = GetSubMenu(hMain,0); // ��ȡ��һ���Ӳ˵�
	
	// ��ȡ��Ļ����
	POINT pt;
	pt.x = LOWORD(lParam);
	pt.y = HIWORD(lParam);
	ClientToScreen(hWnd, &pt);

	// �����˵�
	TrackPopupMenu(
		hPopup,
		TPM_LEFTALIGN | TPM_TOPALIGN,
		pt.x, pt.y,
		0,
		hWnd,
		NULL
	);
}

// ���ڴ�����(�Զ��� ������Ϣ)
LRESULT CALLBACK WndProd(HWND hWnd, UINT msgID, WPARAM wParam, LPARAM lParam) {
	switch (msgID) {

	case WM_RBUTTONUP:
		OnRButtonUp(hWnd,lParam);
		break;

	case WM_DESTROY:
		PostQuitMessage(0);
		break;


	case WM_CREATE:
	{HMENU hMenu = LoadMenu(GetModuleHandle(NULL), (char*)IDR_MENU1);  // ��ȡ�˵����
		SetMenu(hWnd, hMenu);
		break; }

	case WM_COMMAND:
		OnCommand(hWnd, wParam);
		break;

	};

	return DefWindowProc(hWnd, msgID, wParam, lParam);
}

// ��ں���
int CALLBACK WinMain(HINSTANCE hIns, HINSTANCE hPreIns, LPSTR IpCmdLine, int nCmdShow) {

	// ������ʾ����̨
	AllocConsole();
	g_hOutput = GetStdHandle(STD_OUTPUT_HANDLE);

	// ע�ᴰ����
	WNDCLASS wc = { 0 };
	wc.cbClsExtra = 0;
	wc.cbWndExtra = 0;
	wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
	wc.hCursor = NULL;// Ĭ�������ʽ
	wc.hIcon = NULL;// Icon
	wc.hInstance = hIns;
	wc.lpfnWndProc = WndProd; //����������
	wc.lpszClassName = "Main";
	wc.lpszMenuName = NULL; // ��Ҫ�˵�
	wc.style = CS_HREDRAW | CS_VREDRAW; // ����ˮƽ/��ֱ�仯ʱ �ػ洰��
	RegisterClass(&wc); // �����ϸ�ֵд�����ϵͳ

	// ���ڴ��д�������
	HWND hWnd = CreateWindow( // ���ؾ��
		"Main",
		"window",
		WS_OVERLAPPEDWINDOW, // ���
		100, 100, 500, 500,
		NULL, // ������
		NULL, // �˵�
		hIns,
		NULL
	);

	// ��ʾ����
	ShowWindow(hWnd, SW_SHOW);
	UpdateWindow(hWnd);

	// ��Ϣѭ��
	MSG nMsg = {};
	while (GetMessage(&nMsg, NULL, 0, 0)) {
		TranslateMessage(&nMsg); // ������Ϣ
		DispatchMessage(&nMsg); // �ɷ���Ϣ(˭������Ϣ ���ɷ���˭ -> ���ڴ�����)
	}
	return 0;
}