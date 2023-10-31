#include <iostream>
#include <curl/curl.h>

// 回调函数，用于处理接收到的数据
size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* output) {
    size_t total_size = size * nmemb;
    output->append((char*)contents, total_size);
    return total_size;
}

// 回调函数，用于处理响应头信息
size_t HeaderCallback(void* contents, size_t size, size_t nmemb, std::string* output) {
    size_t total_size = size * nmemb;
    output->append((char*)contents, total_size);
    return total_size;
}

int main2() {
    // 初始化 cURL
    CURL* curl = curl_easy_init();
    if (curl) {
        // 设置请求的 URL
        curl_easy_setopt(curl, CURLOPT_URL, "www.baidu.com");

        // 设置请求头，指定 Accept-Encoding 为 gzip
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/x-www-form-urlencoded;charset=UTF-8");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        // 设置数据接收回调函数
        std::string response_data;
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response_data);

        // 设置响应头回调函数
        std::string header_data;
        curl_easy_setopt(curl, CURLOPT_HEADERFUNCTION, HeaderCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEHEADER, &header_data);

        // 执行 HTTP GET 请求
        CURLcode res = curl_easy_perform(curl);

        // 检查请求是否成功
        if (res != CURLE_OK) {
            std::cerr << "cURL failed: " << curl_easy_strerror(res) << std::endl;
        }
        else {
            // 输出收到的数据
            std::cout << "Response: " << response_data << std::endl;

            // 输出响应头信息
            std::cout << "Headers: " << header_data << std::endl;

            // 从响应头中提取字符集信息
            size_t charset_pos = header_data.find("charset=");
            if (charset_pos != std::string::npos) {
                std::string charset = header_data.substr(charset_pos + 8);
                std::cout << "Charset: " << charset << std::endl;
            }
        }

        // 清理 cURL 资源
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }

    return 0;
}
