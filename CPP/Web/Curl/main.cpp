/***********************************************************
 * HTML ȡ�ã��ƥ����ȥե����뱣�棩
 **********************************************************/
#include <curl/curl.h>  // Require `libcurl4-openssl-dev`
#include <stdio.h>      // for fopen
#include <string.h>     // for strlen

#include <fstream>   // for ofstream
#include <iostream>  // for cout, endl
#include <list>      // list

#define URL "https://www.google.com.hk/"
#define FILE_O "test.html"  // Out-file

using namespace std;

/**
 * split�v��
 * @param string str �ָ����������
 * @param string delim �ǥ�ߥ�
 * @return list<string> �ָ�줿������
 */
list<string> split(string str, string delim) {
    list<string> result;
    int cutAt;
    while ((cutAt = str.find_first_of(delim)) != str.npos) {
        if (cutAt > 0) {
            result.push_back(str.substr(0, cutAt));
        }
        str = str.substr(cutAt + 1);
    }
    if (str.length() > 0) {
        result.push_back(str);
    }
    return result;
}

/*
 * CURL ���`��Хå��v��
 */
size_t callBackFunc(char* ptr, size_t size, size_t nmemb, string* stream) {
    int realsize = size * nmemb;
    stream->append(ptr, realsize);
    return realsize;
}

/*
 * [CLASS] Process
 */
class Proc {
    // Declaration
    ofstream ofs;
    CURL* curl;
    CURLcode res;
    string chunk, strIter;

   public:
    Proc();          // Constructor
    ~Proc();         // Destructor
    int execMain();  // Main Process
};

/*
 * Constructor
 */
Proc::Proc() {
    // CURL Initial
    curl = curl_easy_init();
    // CURLOPT_URL �� URL ��ָ��
    curl_easy_setopt(curl, CURLOPT_URL, URL);
    // CURLOPT_WRITEFUNCTION �˥��`��Хå��v����ָ��
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, callBackFunc);
    // CURLOPT_WRITEDATA
    // �˥��`��Хå��v���ˤƄI���줿���ȤΥǩ`����{�ݥ��󥿤�ָ��
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, (string*)&chunk);
}

/*
 * Destructor
 */
Proc::~Proc() {
    // Clean up
    curl_easy_cleanup(curl);
}

/*
 * Main Process
 */
int Proc::execMain() {
    try {
        // Open Out-file
        ofs.open(FILE_O);
        if (ofs.fail()) {
            cerr << "[ERROR] Could not open " << FILE_O << endl;
            return 1;
        }

        // cURL �ꥯ�����Ȍg��
        res = curl_easy_perform(curl);
        if (res == CURLE_OK) {  // �ꥯ�����ȄI�� OK �r
            // [ �褴�� ] �Έ��ϤϤ���� OK
            // cout << chunk << endl;
            // ofs  << chunk << endl;

            // [ ���Ф��� ]
            // split �Όg��
            list<string> strList = split(chunk, "\n");
            // ���ƥ�`����ȡ��
            list<string>::iterator iter = strList.begin();
            // ���󥽩`�����
            while (iter != strList.end()) {  // ����ޤ�
                strIter = *iter;
                cout << strIter << endl;
                ofs << strIter << endl;
                ++iter;
            }
        } else {  // �ꥯ�����ȄI�� NG �r
            cerr << "#### curl_easy_perform() failed: "
                 << curl_easy_strerror(res) << endl;
            return 1;
        }
    } catch (char* e) {
        cout << "EXCEPTION : " << e << endl;
        return 1;
    }
    return 0;
}

/*
 * Execution
 */
int main() {
    try {
        Proc objMain;
        int iRetCode = objMain.execMain();
        if (iRetCode == 0) {
            cout << "SUCCESS!" << endl;
        } else {
            cout << "FAILED!" << endl;
        }
    } catch (char* e) {
        cout << "EXCEPTION : " << e << endl;
        return 1;
    }
    return 0;
}