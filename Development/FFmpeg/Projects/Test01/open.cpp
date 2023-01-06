

#include <iostream>
#include<stdio.h>


extern "C"
{
#include<libavcodec\avcodec.h>
#include<libavformat/avformat.h>
#include<libavutil/opt.h>
}
#pragma comment(lib,"avcodec.lib")
#pragma comment(lib,"avformat.lib")
#pragma comment(lib,"avutil.lib")


int main1()
{
	printf("%s\n", avcodec_configuration());

	//av_register_all(); 4.0版本后不需要调用

	AVFormatContext* pFormat = NULL;

	// 本地文件
	//const char* path = "1.mp4";

	// 网络文件
	avformat_network_init();
	const char* path = "https://cn-cq-ct-01-05.bilivideo.com/live-bvc/273978/live_606402811_31701497/index.m3u8"; // B站
	AVDictionary* options = NULL;
	av_dict_set(&options, "buffer_size", "102400", 0); //设置缓存大小，1080p可将值调大
	av_dict_set(&options, "rtsp_transport", "tcp", 0); //以udp方式打开，如果以tcp方式打开将udp替换为tcp
	av_dict_set(&options, "stimeout", "2000000", 0); //设置超时断开连接时间，单位微秒
	av_dict_set(&options, "max_delay", "500000", 0); //设置最大时延


	if (avformat_open_input(&pFormat, path, NULL, NULL) != 0) {
		printf("avformat open failed\n");
		return -1;
	}
	printf("avformat open successed\n");

	// 网络文件忽略这段
	if (avformat_find_stream_info(pFormat, NULL) < 0) {
		printf("avformat_find_stream failed\n");
		return -1;
	}
	printf("avformat_find_stream successed\n");


	int time = pFormat->duration;
	int mbittime = time / 1000000 / 60;
	int mmintime = time / 1000000 % 60;
	printf("%d分%d秒\n", mbittime, mmintime);

	//查看文件信息
	av_dump_format(pFormat, NULL, path, 0);

	return 0;
}
