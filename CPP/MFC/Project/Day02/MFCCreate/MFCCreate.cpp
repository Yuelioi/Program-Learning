#include <afxwin.h>
// 框架类
class CMyFrameWnd : public CFrameWnd {
	// 创建虚函数 重写父类窗口处理函数
	virtual LRESULT WindowProc(UINT msgID, WPARAM wParam, LPARAM IParam);
};


LRESULT CMyFrameWnd::WindowProc(UINT msgID, WPARAM wParam, LPARAM IParam) {
	switch (msgID) {
	case WM_CREATE:
		AfxMessageBox("WM CREATE消息被处理");
		break;
	case WM_PAINT:
	{
		PAINTSTRUCT ps = { 0 };
		HDC hdc = ::BeginPaint(this->m_hWnd, &ps);
		::TextOut(hdc, 100, 100, "hello", 5);
		::EndPaint(m_hWnd, &ps); // this 可以省略
		break;
	}
	}

	return CFrameWnd::WindowProc(msgID, wParam, IParam);
}


// 应用程序类
class CMyWinApp : public CWinApp {
public:
	CMyWinApp() {

	}
	virtual BOOL InitInstance();

};

CMyWinApp theApp;



BOOL CMyWinApp::InitInstance() {
	CMyFrameWnd* pFrame = new CMyFrameWnd;
	pFrame->Create(NULL, "MFCBase");
	m_pMainWnd = pFrame;
	pFrame->ShowWindow(SW_SHOW);
	pFrame->UpdateWindow();
	return TRUE;
}