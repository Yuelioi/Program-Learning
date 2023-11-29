/***********************************************************
 * HTML 取得（テキストファイル保存）
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
 * split関数
 * @param string str 分割したい文字列
 * @param string delim デリミタ
 * @return list<string> 分割された文字列
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
 * CURL コールバック関数
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
    // CURLOPT_URL に URL を指定
    curl_easy_setopt(curl, CURLOPT_URL, URL);
    // CURLOPT_WRITEFUNCTION にコールバック関数を指定
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, callBackFunc);
    // CURLOPT_WRITEDATA
    // にコールバック関数にて処理されたあとのデータ格納ポインタを指定
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

        // cURL リクエスト実行
        res = curl_easy_perform(curl);
        if (res == CURLE_OK) {  // リクエスト処理 OK 時
            // [ 丸ごと ] の場合はこれで OK
            // cout << chunk << endl;
            // ofs  << chunk << endl;

            // [ １行ずつ ]
            // split の実行
            list<string> strList = split(chunk, "\n");
            // イテレータの取得
            list<string>::iterator iter = strList.begin();
            // コンソール出力
            while (iter != strList.end()) {  // 最後まで
                strIter = *iter;
                cout << strIter << endl;
                ofs << strIter << endl;
                ++iter;
            }
        } else {  // リクエスト処理 NG 時
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