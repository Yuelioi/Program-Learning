package main

import (
	"fmt"
	"math/rand"
)

func branch() {
	// if switch 都可以在判断前加一个语句
	if score, line := 99, 90; score > line {
		fmt.Println(score)
	}

	// switch 后面是什么 就是什么类型 默认是布尔main
	a := 20
	switch {
	case a > 0:
		fmt.Printf("%d 大于0\n", a)
	default:
		fmt.Println("小于0")
	}

	// 作用域为switch之内
	switch a2 := 20; a2 {
	case 20, 21, 22: // 不可以使用字符串什么的
		fmt.Printf("%d 大于0\n", a)
		fallthrough // 默认不穿透, 使用fallthrough进行穿透
	default:
		fmt.Println("小于0")
	}
}

func loop() {
	for i, v := range "xyz测试" {
		// 英文字母是 Ascii 1个字节
		// 汉字是utf-8 3个字节
		fmt.Println(i, v)
		fmt.Printf("%T %[1]v %[1]c\n", v)
	}
}

func rd() {
	// 创建种子值并取固定随机数
	// rand.Seed(1)
	fmt.Println(rand.Intn(10))
}

func scan() {

	var a string
	n, err := fmt.Scan(&a)
	if err == nil {
		fmt.Println(n, a)
	}

}

func main() {
	scan()
}
