package main

import "fmt"

func test() {
	/*
		数组不能扩容
		子切片共用底层数组, 不会导致扩容, 但是使用append可能会扩容
		但是每个切片独立保存指针 cap 和 len
		切片一旦扩容, 就和原来的序列分道扬镳了, 会把数据搬到新的内存空间


	*/
	a1 := [8]int{1, 2, 3, 4, 5}

	fmt.Printf("%d\n", cap(a1[:]))
	// a2 := a1[:]
}
