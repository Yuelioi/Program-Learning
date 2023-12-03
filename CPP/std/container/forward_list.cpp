#include <algorithm>
#include <forward_list>
#include <iostream>
using namespace std;
int main()
{
    // 构造
    forward_list<int> myForwardList = {1, 2, 3, 4, 5};

    // 访问
    // myForwardList.front();

    auto it = myForwardList.begin();

    // 增

    myForwardList.insert_after(it, 5);
    myForwardList.push_front(0);

    // fl1.merge(fl2) // 合并2个有序链表, 合并后f2为空

    // 删
    // myForwardList.clear()
    // myForwardList.pop_front();
    // myForwardList.erase_after(it);
    myForwardList.remove(2);
    myForwardList.remove_if([](int num) -> bool { return num % 2 == 0; });

    // 改
    // fl1.swap(fl2) // 直接交换2个fl内容
    myForwardList.reverse();
    myForwardList.unique();             // 删除连续重复的
    myForwardList.sort(greater<int>()); // 降序

    // myForwardList.front() = 10; // 头部
    // auto it = std::find(myForwardList.begin(), myForwardList.end(), 3);
    // if (it != myForwardList.end())
    //     *std::next(it) = 7;

    // 查
    // myForwardList.empty();
    // myForwardList.max_size();

    // 循环. 迭代器不能+好几个, 只能自增自减
    // for (auto it = myForwardList.begin(); it != myForwardList.end(); it++) {
    //     cout << *it << endl;
    // }

    for (const auto &element : myForwardList) {
        std::cout << element << " ";
    }
}