#include <array>
#include <iostream>

// https://zh.cppreference.com/w/cpp/container/array

using namespace std;
int main()
{
    array<int, 5> arr1 = {1, 2, 3, 4, 5};
    // arr1.fill(11);
    arr1[2] = 12;

    array<int, 5>::iterator it = arr1.begin();

    for (; it != arr1.end(); it++) {
        cout << *it << endl;
    }

    for (int ele : arr1) {
        cout << ele << endl;
    }

    return 0;
}