#include <afxwin.h>
// �����
class CMyFrameWnd : public CFrameWnd {
	// �����麯�� ��д���ര�ڴ�����
	virtual LRESULT WindowProc(UINT msgID, WPARAM wParam, LPARAM IParam);
};


LRESULT CMyFrameWnd::WindowProc(UINT msgID, WPARAM wParam, LPARAM IParam) {
	switch (msgID) {
	case WM_CREATE:
		AfxMessageBox("WM CREATE��Ϣ������");
		break;
	case WM_PAINT:
	{
		PAINTSTRUCT ps = { 0 };
		HDC hdc = ::BeginPaint(this->m_hWnd, &ps);
		::TextOut(hdc, 100, 100, "hello", 5);
		::EndPaint(m_hWnd, &ps); // this ����ʡ��
		break;
	}
	}

	return CFrameWnd::WindowProc(msgID, wParam, IParam);
}


// Ӧ�ó�����
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