#include <iostream>
#include <set>
#include <vector>
using namespace std;
int main()
{
    vector<int> v{1, 2, 3, 4, 4, 4};
    set<int> st1{};
    set<int> st2(v.begin(), v.end());

    auto extractedNode = st2.extract(2);
    extractedNode.value() = 5;
    st2.insert(move(extractedNode));

    // 打印
    for (const auto &ele : st2) {
        std::cout << ele << std::endl;
    }
}