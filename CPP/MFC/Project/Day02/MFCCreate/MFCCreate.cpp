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