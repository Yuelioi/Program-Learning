#include <iostream>
#include <string>
using namespace std;

// https://zh.cppreference.com/w/cpp/string/basic_string

int main()
{
    // 构造
    string foo = "hello";
    string str2 = "Hello 中国";
    string str3("Hello");
    string str5(str2);       // 拷贝构造
    string str6(str2, 2, 3); // 范围构造, 从[A,A+B]范围 => llo

    // 拼接
    // str6 + "xx";

    // 访问
    // [] 不进行范围检查
    // at() 进行范围检查,越界报错
    // front() back() 第一个/最后一个字符
    // c_str() data()

    // 判断
    // empty() 是否为空
    // size() length() 字节数
    // capacity() 已分配的容量

    // reserve() 提前分配
    // shirink_fo_fit() 释放多余空间
    // resize(str,number) 重置字符容量, 多余的用0值/指定字符填充,少的就截断
    // cout << str6 << endl;

    /* 迭代器
    for (int i =0; i<str2.size();i++){
        cout << str2.at(i) << endl;
    }
    for (auto &c : str2){
        cout << c<< endl;
    }
    for (string::iterator it = str2.begin(); it != str2.end(); ++it) {
        cout << *it << endl;
    }
    */

    // 比较 starts_with
    if (foo.ends_with("11")) {
        // do something
    }

    cout << str2.compare(str3) << endl;

    /*
    append()
    insert()
    push_back()
    pop_back()
    clear()
    erase() // 清除指定的
    */

    // 替换/提取
    str2.replace(6, 6, "siri");
    str2.substr(3);
    cout << str2;

    /*
    find:找不到就返回 string::npos(-1)
    rfind

    find_first_of(给定多个字符 只有有任一匹配就算成功)
    find_first_not_of
    find_first_last_of
    find_first_last_not_of

    */

    if (string::npos == str2.find("he")) {
        // 没找到
    }

    // 类型转换...
    to_string(12);
    stoi("1234A");
    stof("1.234A");

    return 0;
}