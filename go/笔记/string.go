package main

import "fmt"

/*
string(一个整数) 直接查Unicode表, 也就是单个字符串
string(整数序列) 转为整数序列, 也就是字符串


*/

func Test_string() {
	// 默认字符串是utf8(多字节,可变字节) 字符是rune int32 占4个字节
	// byte 是uint8
	s1 := "abc测试"

	// 遍历字节9个
	for i := 0; i < len(s1); i++ {
		fmt.Printf("%d %[2]T %[2]v\n", i, s1[i])
	}
	// 高级遍历, 按字符计算5个
	for i, v := range s1 {
		fmt.Printf("%d %[2]T  %[2]v\n", i, v, s1[i])
	}

	// 0 uint8 97
	// 1 uint8 98
	// 2 uint8 99
	// 3 uint8 230
	// 4 uint8 181
	// 5 uint8 139
	// 6 uint8 232
	// 7 uint8 175
	// 8 uint8 149
	// 0 int32  97
	// 1 int32  98
	// 2 int32  99
	// 3 int32  27979
	// 6 int32  35797

}
