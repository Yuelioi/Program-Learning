/*
 * @lc app=leetcode.cn id=1748 lang=cpp
 *
 * [1748] 唯一元素的和
 */
#include <iostream>
#include <map>
#include <vector>
using namespace std;
// @lc code=start
class Solution {
 public:
  int sumOfUnique(vector<int>& nums) {
    map<int, int> mymap;
    for (int i = 0; i < nums.size(); i++) {
      mymap.insert(pair<int, int>(i,1));
      std::cout<<mymap[i]<<endl;
    }

    int sum = 0;

    for (auto i = mymap.begin(); i != mymap.end(); ++i) {
      std::cout<<i->first<<endl;
    }
    return sum;
  }
};

int main() {
  vector<int> nums = {1, 2, 3, 2};
  Solution s;
  s.sumOfUnique(nums);
  return 0;
}
// @lc code=end
