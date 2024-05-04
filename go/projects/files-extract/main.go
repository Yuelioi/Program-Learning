package main

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strconv"
)

func main() {
	// 输入文件夹路径
	fmt.Println("请输入文件夹路径：")
	var folderPath string
	fmt.Scanln(&folderPath)

	// 检查输入的路径是否有效
	_, err := os.Stat(folderPath)
	if err != nil {
		fmt.Println("错误：", err)
		return
	}

	// 创建output文件夹
	outputFolderPath := filepath.Join(filepath.Dir(folderPath), "output")
	err = os.MkdirAll(outputFolderPath, 0755)
	if err != nil {
		fmt.Println("创建输出文件夹失败：", err)
		return
	}

	// 重名文件计数器
	nameCounter := make(map[string]int)

	// 遍历文件夹中的所有文件
	err = filepath.Walk(folderPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			// 打开原始文件
			originalFile, err := os.Open(path)
			if err != nil {
				return err
			}
			defer originalFile.Close()
			outputPath := filepath.Join(outputFolderPath, info.Name())

			if _, err := os.Stat(outputPath); err == nil {
				// 如果存在相同名称的文件，则在文件名后添加一个数字后缀
				nameCounter[info.Name()]++
				baseName := info.Name()[:len(info.Name())-len(filepath.Ext(info.Name()))]
				outputPath = filepath.Join(outputFolderPath, baseName+"_"+strconv.Itoa(nameCounter[info.Name()])+filepath.Ext(info.Name()))
			}

			// 创建目标文件
			outputFile, err := os.Create(outputPath)
			if err != nil {
				return err
			}
			defer outputFile.Close()

			// 复制文件内容
			_, err = io.Copy(outputFile, originalFile)
			if err != nil {
				return err
			}
			fmt.Println("已复制文件:", info.Name())
		}
		return nil
	})

	if err != nil {
		fmt.Println("遍历文件夹时出错:", err)
		return
	}

	fmt.Println("文件复制完成，输出到:", outputFolderPath)
	fmt.Println("按下回车键继续...")
	fmt.Scanln()
}
