

#define _CRT_SECURE_NO_WARNINGS

#include <iostream>
#include<stdio.h>
#include<malloc.h>

extern "C"
{
#include<libavcodec\avcodec.h>
}
#pragma comment(lib,"avcodec.lib")


void yuv420(const char* path, int width, int height) {
	FILE* fp = fopen(path, "rb+");
	FILE* f1 = fopen("yuv_420_y.y", "wb+");
	FILE* f2 = fopen("yuv_420_u.y", "wb+");
	FILE* f3 = fopen("yuv_420_v.y", "wb+");


	// yuv rgb 像素方式和图片一样 w*h
	// 1.float  char double
	// 2.mat
	// 3.vec3 vec4
	unsigned char* p = (unsigned char*)malloc(width * height * 3 / 2); // yuv 是2比1
	int i = 0;
	while (i < 1) {

		fread(p, 1, width * height * 3 / 2, fp);
		// y/u/v
		fwrite(p, 1, width * height, f1);
		fwrite(p + width * height, 1, width * height / 4, f2);
		fwrite(p + width * height * (1 + 1 / 4), 1, width * height / 4, f3);
		i++;
	}
	free(p), p = NULL;
	fclose(fp);
	fclose(f1);
	fclose(f2);
	fclose(f3);
}

//int main()
//{
//	yuv420("11.yuv", 720, 480);
//	printf("%s\n", avcodec_configuration());
//	return 0;
//}
