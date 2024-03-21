/*
值类型

	函数传参会复制(都是完全复制)
	return 也是复制
	给其他标识符赋值, 也是复制
*/
package main

import "fmt"

func pt(arr [3]int) [3]int {
	fmt.Printf("arr\t%p %v\n", &arr, arr)
	return arr
}

func main() {

	a0 := [3]int{1, 2, 3}
	fmt.Printf("a0\t%p %v\n", &a0, a0)

	a1 := a0
	a2 := pt(a1)

	fmt.Printf("a2\t%p %v\n", &a2, a2)

	pt(a2)

}
