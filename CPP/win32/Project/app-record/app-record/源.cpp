//#include "app-record.h"
//
//#pragma comment(lib, "comctl32.lib")
//
//HWND g_hwnd;
//HWND g_runButton;
//HWND g_hListView;
//bool g_isRecording = false;
//std::unordered_map<std::wstring, std::chrono::steady_clock::duration>
//g_appUsage;
//
//LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
//std::wstring GetWindowProcessName(HWND hWnd);
//
//int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
//    PWSTR pCmdLine, int nCmdShow) {
//    // ��������
//    const wchar_t CLASS_NAME[] = L"ActivityMonitor";
//    WNDCLASS wc = {};
//
//    wc.lpfnWndProc = WndProc;
//    wc.hInstance = hInstance;
//    wc.lpszClassName = CLASS_NAME;
//    wc.hbrBackground = (HBRUSH)GetStockObject(WHITE_BRUSH);  // ���ñ�����ˢΪ��ɫ
//    wc.hIcon = LoadIcon(hInstance, MAKEINTRESOURCE(IDI_APPICON));  // ����ͼ����Դ
//
//    RegisterClass(&wc);
//
//    // ��ȡ��Ļ��Ⱥ͸߶�
//    int screenWidth = GetSystemMetrics(SM_CXSCREEN);
//    int screenHeight = GetSystemMetrics(SM_CYSCREEN);
//
//    // ���㴰�����Ͻ�λ��ʹ��λ����Ļ����
//    int windowX = (screenWidth - WINDOW_WIDTH) / 2;
//    int windowY = (screenHeight - 300) / 2;
//
//    HWND hWnd = CreateWindowEx(
//        0, CLASS_NAME, L"Ӧ��ʱ����¼", WS_OVERLAPPEDWINDOW, windowX, windowY, WINDOW_WIDTH, 300, nullptr, nullptr, hInstance, nullptr);
//
//    if (hWnd == nullptr) {
//        return 0;
//    }
//
//    g_hwnd = hWnd;
//
//    // ������ť
//    g_runButton =
//        CreateWindow(L"BUTTON", L"��ʼ��¼",
//            WS_TABSTOP | WS_VISIBLE | WS_CHILD | BS_PUSHBUTTON, 10,
//            10, 100, 30, hWnd, (HMENU)RUN_BUTTON, hInstance, nullptr);
//
//    // �����б���ͼ
//    INITCOMMONCONTROLSEX icex;
//    icex.dwSize = sizeof(INITCOMMONCONTROLSEX);
//    icex.dwICC = ICC_LISTVIEW_CLASSES;
//    InitCommonControlsEx(&icex);
//
//    g_hListView = CreateWindowEx(
//        0, WC_LISTVIEW, L"", WS_CHILD | WS_VISIBLE | LVS_REPORT | LVS_EDITLABELS,
//        10, 50, 460, 200, hWnd, (HMENU)ID_LISTVIEW, hInstance, nullptr);
//
//    // �����
//    LVCOLUMN lvc;
//    lvc.mask = LVCF_TEXT | LVCF_WIDTH;
//
//    wchar_t APP_NAME[] = L"Ӧ��";
//    wchar_t TIME_NAME[] = L"����ʱ��";
//
//    lvc.pszText = APP_NAME;
//    lvc.cx = 300;
//    ListView_InsertColumn(g_hListView, 0, &lvc);
//
//    lvc.mask = LVCF_TEXT | LVCF_WIDTH;
//    lvc.pszText = TIME_NAME;
//    lvc.cx = 150;
//    ListView_InsertColumn(g_hListView, 1, &lvc);
//
//    // ���ö�ʱ����ÿ��1�봥��һ��WM_TIMER��Ϣ
//    SetTimer(hWnd, 1, 1000, nullptr);
//
//    ShowWindow(hWnd, nCmdShow);
//    UpdateWindow(hWnd);
//
//    // ��Ϣѭ��
//    MSG msg = {};
//    while (true) {
//        // ��ȡ��Ϣ
//        if (PeekMessage(&msg, nullptr, 0, 0, PM_REMOVE)) {
//            // ������Ϣ
//            if (msg.message == WM_QUIT) break;
//
//            TranslateMessage(&msg);
//            DispatchMessage(&msg);
//        }
//        else {
//            // �����ػ����������
//            // ...
//        }
//    }
//
//    return 0;
//}
//
//LRESULT CALLBACK WndProc(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam) {
//    switch (msg) {
//    case WM_COMMAND: {
//        if (LOWORD(wParam) == RUN_BUTTON) {
//            if (!g_isRecording) {
//                StartRecording();
//                SetWindowText(g_runButton, L"ֹͣ��¼");
//            }
//            else {
//                StopRecording();
//                SetWindowText(g_runButton, L"��ʼ��¼");
//            }
//        }
//        break;
//    }
//
//    case WM_TIMER: {
//        if (g_isRecording) {
//            std::wstring appName = GetWindowProcessName(GetForegroundWindow());
//            if (!appName.empty()) {
//                g_appUsage[appName] += std::chrono::seconds(1);
//                UpdateListView();
//            }
//        }
//        break;
//    }
//
//    case WM_DESTROY: {
//        PostQuitMessage(0);
//        break;
//    }
//
//    case WM_NCHITTEST: {
//        LRESULT hitTestResult = DefWindowProc(hWnd, msg, wParam, lParam);
//
//        // ������صĽ���ǵ������ұ߿� (HTLEFT �� HTRIGHT)�������滻Ϊ���±߿�
//        // (HTTOP �� HTBOTTOM)
//        if (hitTestResult == HTLEFT || hitTestResult == HTRIGHT)
//            hitTestResult = HTTOP;
//
//        return hitTestResult;
//    }
//    }
//
//    return DefWindowProc(hWnd, msg, wParam, lParam);
//}
//
//std::wstring GetWindowProcessName(HWND hWnd) {
//    DWORD processId;
//    GetWindowThreadProcessId(hWnd, &processId);
//
//    HANDLE hProcess = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ,
//        FALSE, processId);
//    if (hProcess != nullptr) {
//        wchar_t exePath[MAX_PATH];
//        if (GetModuleFileNameEx(hProcess, nullptr, exePath, MAX_PATH) > 0) {
//            std::wstring processName = exePath;
//            size_t pos = processName.find_last_of(L"\\");
//            if (pos != std::wstring::npos) {
//                processName = processName.substr(pos + 1);
//            }
//            CloseHandle(hProcess);
//            return processName;
//        }
//
//        CloseHandle(hProcess);
//    }
//
//    return L"";
//}
//
//void StartRecording() {
//    g_isRecording = true;
//    // g_appUsage.clear();
//    ListView_DeleteAllItems(g_hListView);
//}
//
//void StopRecording() { g_isRecording = false; }
//
//void UpdateListView() {
//    ListView_DeleteAllItems(g_hListView);
//
//    LVITEM lvItem = {};
//    lvItem.mask = LVIF_TEXT;
//
//    for (const auto& pair : g_appUsage) {
//        std::wstring appName = pair.first;
//        std::chrono::steady_clock::duration duration = pair.second;
//
//        LVITEM lvItem = {};
//        lvItem.mask = LVIF_TEXT;
//
//        // ����Ӧ������
//        lvItem.pszText = const_cast<wchar_t*>(appName.c_str());
//        int index = ListView_InsertItem(g_hListView, &lvItem);
//
//        // �������ʱ���Сʱ�����Ӻ���
//        std::chrono::seconds durationInSeconds =
//            std::chrono::duration_cast<std::chrono::seconds>(duration);
//        int hours = durationInSeconds.count() / 3600;
//        int minutes = (durationInSeconds.count() % 3600) / 60;
//        int seconds = durationInSeconds.count() % 60;
//
//        // ��ʽ������ʱ���ַ���
//        std::wstring durationText = std::to_wstring(hours) + L":" +
//            std::to_wstring(minutes) + L":" +
//            std::to_wstring(seconds);
//
//        // ���ó���ʱ��
//        lvItem.iSubItem = 1;
//        lvItem.pszText = const_cast<wchar_t*>(durationText.c_str());
//        ListView_SetItem(g_hListView, &lvItem);
//    }
//}
