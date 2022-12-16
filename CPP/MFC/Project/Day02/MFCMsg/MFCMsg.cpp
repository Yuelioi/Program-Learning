#include <afxwin.h>
// 框架类
class CMyFrameWnd : public CFrameWnd {
	DECLARE_MESSAGE_MAP();
public:
	LRESULT OnCreate(WPARAM wParam, LPARAM lParam);

};
BEGIN_MESSAGE_MAP(CMyFrameWnd, CFrameWnd)

	ON_MESSAGE(WM_CREATE, OnCreate)
END_MESSAGE_MAP()

LRESULT CMyFrameWnd::OnCreate(WPARAM wParam, LPARAM lParam) {
	AfxMessageBox("OnCreate");
	return 0;
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