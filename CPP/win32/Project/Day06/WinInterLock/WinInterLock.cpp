#include <iostream>
#include<stdio.h>
#include<Windows.h>

long g_value = 0;

DWORD CALLBACK TestProc1(LPVOID lpParam)
{
	for (int i = 0; i < 100000; i++)
	{
		g_value++;
	}
	return 0;
}

DWORD CALLBACK TestProc2(LPVOID lpParam)
{
	for (int i = 0; i < 100000; i++)
	{
		g_value++;
	}
	return 0;
}

int main()
{
	DWORD nID = 0;
	HANDLE hThread[2];
	hThread[0] = CreateThread(NULL, 0, TestProc1, NULL, 0, &nID);
	hThread[1] = CreateThread(NULL, 0, TestProc2, NULL, 0, &nID);

	WaitForMultipleObjects(2, hThread, TRUE, INFINITE);

	printf("%d\n", g_value);

}

