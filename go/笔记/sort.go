package main

import (
	"fmt"
	"sort"
)

func Test_sort() {

	s := []string{"abc", "123", "xyz"}
	sort.Strings(s)
	sort.Sort(sort.Reverse(sort.StringSlice(s)))
	fmt.Println(s)

	// sort.Reverse(sort.Strings(s))
}
