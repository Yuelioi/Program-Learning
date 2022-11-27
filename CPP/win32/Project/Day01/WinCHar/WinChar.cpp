#define UNICODE // Ҫ����windowhǰ ��Ϊ���߰��������Ǹ���ʾ��
#include <Windows.h>
#include <stdio.h>
void C_char() {
	const char* pszText = "hello";
	printf("%s\n", pszText);
}

void W_char() {
	const wchar_t* pszText = L"HELLO ���";
	int len = wcslen(pszText); // �ַ����� 5 , �ڴ� 10
	wprintf(L"%s %d\n", pszText, len);


	HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
	WriteConsole(
		hOut,// ��׼������, ��ʾ��
		pszText,
		wcslen(pszText),
		NULL,
		NULL);
}


void T_char()
{
	const TCHAR* pszText = __TEXT("hello");
	// �����������˫ û������ߵ�
#ifdef UNICODE
	wprintf(L"%s\n", pszText);
#else
	printf("��:%s\n", pszText);
#endif
}

int main() {
	//C_char();
	W_char();
	//T_char();
	getchar();


	return 0;
}

/*
* ��������UNICODE�� �ͼ�L û���������char
*
* ifdef UNICODE
* typedef wchar_t TCHAR;
*  #define __TEXT(quote) L##quote
* #else
*  typedef char TCHAR;
*  #define __TEXT(quote) quote
* #endif


*/