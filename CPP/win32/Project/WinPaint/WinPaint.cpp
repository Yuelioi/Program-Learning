#include <stdio.h>
#include <windows.h>

HANDLE g_hOutput;  // ��� ����̨�����
void OnPaint(HWND hWnd) {
	PAINTSTRUCT ps = { 0 };

	HDC hdc = BeginPaint(hWnd, &ps);

	HPEN hPen = CreatePen(PS_SOLID, 3, RGB(255, 0, 0));
	HGDIOBJ nOldPen = SelectObject(hdc, hPen);

	HBRUSH hBrush = CreateSolidBrush(RGB(255, 255, 0));
	HGDIOBJ nOldBrush = SelectObject(hdc, hBrush);


	Ellipse(hdc, 100, 100, 300, 300);
	DeleteObject(hPen);
	SelectObject(hdc, nOldPen);



	EndPaint(hWnd, &ps);

}

// ���ڴ�����(�Զ��� ������Ϣ)
LRESULT CALLBACK WndProd(HWND hWnd, UINT msgID, WPARAM wParam, LPARAM IParam) {
	switch (msgID) {
	case WM_DESTROY:
		PostQuitMessage(0);
		break;
	case WM_PAINT:
		OnPaint(hWnd);
		break;
	}

	return DefWindowProc(hWnd, msgID, wParam, IParam);
}

// ��ں���
int CALLBACK WinMain(HINSTANCE hIns, HINSTANCE hPreIns, LPSTR IpCmdLine,
	int nCmdShow) {
	// ������ʾ����̨
	//AllocConsole();
	//g_hOutput = GetStdHandle(STD_OUTPUT_HANDLE);

	// ע�ᴰ����
	WNDCLASS wc = { 0 };
	wc.cbClsExtra = 0;
	wc.cbWndExtra = 0;
	wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
	wc.hCursor = NULL;  // Ĭ�������ʽ
	wc.hIcon = NULL;    // Icon
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