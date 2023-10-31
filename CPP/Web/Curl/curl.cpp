#include <iostream>
#include <curl/curl.h>

// �ص����������ڴ�����յ�������
size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* output) {
    size_t total_size = size * nmemb;
    output->append((char*)contents, total_size);
    return total_size;
}

// �ص����������ڴ�����Ӧͷ��Ϣ
size_t HeaderCallback(void* contents, size_t size, size_t nmemb, std::string* output) {
    size_t total_size = size * nmemb;
    output->append((char*)contents, total_size);
    return total_size;
}

int main2() {
    // ��ʼ�� cURL
    CURL* curl = curl_easy_init();
    if (curl) {
        // ��������� URL
        curl_easy_setopt(curl, CURLOPT_URL, "www.baidu.com");

        // ��������ͷ��ָ�� Accept-Encoding Ϊ gzip
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/x-www-form-urlencoded;charset=UTF-8");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        // �������ݽ��ջص�����
        std::string response_data;
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response_data);

        // ������Ӧͷ�ص�����
        std::string header_data;
        curl_easy_setopt(curl, CURLOPT_HEADERFUNCTION, HeaderCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEHEADER, &header_data);

        // ִ�� HTTP GET ����
        CURLcode res = curl_easy_perform(curl);

        // ��������Ƿ�ɹ�
        if (res != CURLE_OK) {
            std::cerr << "cURL failed: " << curl_easy_strerror(res) << std::endl;
        }
        else {
            // ����յ�������
            std::cout << "Response: " << response_data << std::endl;

            // �����Ӧͷ��Ϣ
            std::cout << "Headers: " << header_data << std::endl;

            // ����Ӧͷ����ȡ�ַ�����Ϣ
            size_t charset_pos = header_data.find("charset=");
            if (charset_pos != std::string::npos) {
                std::string charset = header_data.substr(charset_pos + 8);
                std::cout << "Charset: " << charset << std::endl;
            }
        }

        // ���� cURL ��Դ
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }

    return 0;
}
