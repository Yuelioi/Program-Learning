#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> vec = {1, 2, 3};
    cout << vec.size() << endl;  // 添加 endl 来换行

    vector<int>::iterator it = vec.begin();
    for (; it != vec.end(); ++it) {  // 修正这里的写法
        cout << *it << endl;         // count 修改为 cout
    }

    return 0;  // 添加 return 0;
}
