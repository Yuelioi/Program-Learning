#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<int> vec = {1, 2, 3};
    cout << vec.size() << endl; // 添加 endl 来换行

    // 迭代器支持 +好几个
    for (vector<int>::iterator it = vec.begin(); it != vec.end(); ++it) {
        cout << *it << endl; // count 修改为 cout
    }

    return 0; // 添加 return 0;
}
