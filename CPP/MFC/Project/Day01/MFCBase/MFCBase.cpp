#include<afxwin.h>
//#define _AFXDLL
// �����
class CMyFrameWnd : public CFrameWnd{

};

// Ӧ�ó�����
class CMyWinApp : public CWinApp {
public:
	CMyWinApp() {

	}
	// ��д���� �麯��
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