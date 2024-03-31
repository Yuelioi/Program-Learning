package main

// 单返回值不用加括号
func T1(a int, b string) int {
	return a
}

func T2(a int, b string) (int, string) {
	return a, b
}

// 默认return返回 <返回参数列表>的变量
// 返回参数列表的变量算定义了 所以不用:=
func T3(x int, y string) (a int, b string) {
	a = x
	b = y
	return
}

// 任意数量
func T4(nums ...int) int {
	total := 0
	for _, num := range nums {
		total += num
	}
	return total
}
