#include <iostream>
#include <string>
#include <string_view>
using namespace std;

void prints(string x) { cout << (uintptr_t)x.data() << endl; }
void printsv(string_view x) { cout << (uintptr_t)x.data() << endl; }

int main()
{
    string x = "hello";
    string_view sv = x;

    // 使用& 地址一样
    // 不使用& 则会重新构建一个新地址
    prints(x);

    // 使用string_view 是一致的, 这样就可以接受指针或者字符串了
    // cout << (uintptr_t)s << endl;
    cout << (uintptr_t)x.data() << endl;
    cout << (uintptr_t)sv.data() << endl;
    printsv(sv);

    return 0;
}