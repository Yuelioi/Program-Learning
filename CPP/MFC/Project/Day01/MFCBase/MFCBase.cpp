#include<afxwin.h>
//#define _AFXDLL
// 框架类
class CMyFrameWnd : public CFrameWnd{

};

// 应用程序类
class CMyWinApp : public CWinApp {
public:
	CMyWinApp() {

	}
	// 重写父类 虚函数
	virtual BOOL InitInstance() {
		CMyFrameWnd* pFrame = new CMyFrameWnd;
		pFrame->Create(NULL, "MFCBase");
		m_pMainWnd = pFrame; 
		pFrame->ShowWindow(SW_SHOW); 
		pFrame->UpdateWindow();
		return TRUE;
	}

};

CMyWinApp theApp;