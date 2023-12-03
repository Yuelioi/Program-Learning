#include <iostream>
#include <list>
using namespace std;

// https://zh.cppreference.com/w/cpp/container/list

int main()
{
    // 初始化
    // std::list<int> myList;       // 默认构造函数
    // std::list<int> myList;       // 默认构造函数
    std::list<int> myList = {1, 3, 4, 5};
    std::list<int> list1(3, 0); // 使用大小和值初始化
    std::list<int> list2;

    // myList.assign(5, 10); // 用 5 个值为 42 的元素赋值
    list2 = list1; // 使用赋值运算符进行赋值

    auto iterator = myList.begin();
    myList.push_back(6);          // 在尾部插入元素
    myList.push_front(0);         // 在头部插入元素
    myList.insert(++iterator, 2); // 在指定位置插入元素

    // 删
    // myList.pop_back(); // 删除尾部元素
    // myList.pop_front();     // 删除头部元素
    // myList.erase(iterator); // 删除指定位置的元素
    // myList.remove(1);       // 删除等于指定值的所有元素

    cout << *iterator << endl;

    // 改
    myList.front() = 10; // 修改头部元素的值
    *iterator = 7;       // 修改指定位置的元素的值
    // 在 list1 的头部插入 list2 中的全部元素 list2变为空
    list1.splice(list1.begin(), list2);

    // for (auto it = myList.begin(); it != myList.end(); ++it) {
    //     cout << *it << endl;
    // }
}