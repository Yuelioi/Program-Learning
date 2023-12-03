#include <iostream>
#include <map>
#include <string>

using namespace std;

int main()
{

    map<string, int> mp = {{"张三", 120}, {"李四", 130}};

    // 访问与赋值
    mp.at("张三") = 100; // 访问与赋值,越界报错
    mp["张四"] = 50;     // 访问与赋值,越界追加

    // 插入
    mp.insert(pair<string, int>("李四", 170)); // 已有则不变(不会更改原值) 返回bool(是否插入成功)
    mp.try_emplace("李四", 170);               // 已有则不变(不会更改原值) 返回迭代器
    mp.insert_or_assign("张四", 170);          // 已有则覆盖

    // 循环
    for (auto &m : mp) {
        cout << m.first << m.second << endl;
    }

    for (auto it = mp.begin(); it != mp.end(); it++) {
        cout << it->first << it->second << endl;
    }
}