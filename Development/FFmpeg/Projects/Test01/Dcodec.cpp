

#include <iostream>
#include<stdio.h>


extern "C"
{
#include<libavcodec\avcodec.h>
#include<libavformat/avformat.h>
#include<libavutil/opt.h>
#include <libavutil/imgutils.h>
}
#pragma comment(lib,"avcodec.lib")
#pragma comment(lib,"avformat.lib")
#pragma comment(lib,"avutil.lib")


int main()
{
	printf("%s\n", avcodec_configuration());

	//av_register_all(); 4.0版本后不需要调用

	AVFormatContext* pFormat = NULL;

	// 本地文件
	const char* path = "1.mp4";




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

	// 寻找流
	int VideoStream = -1, AudioStream = -1;
	VideoStream = av_find_best_stream(pFormat, AVMEDIA_TYPE_VIDEO, -1, -1, NULL, NULL);
	//AudioStream = av_find_best_stream(pFormat, AVMEDIA_TYPE_AUDIO, -1, -1, NULL, NULL);

	const AVCodec* vCodec = avcodec_find_decoder(pFormat->streams[VideoStream]->codecpar->codec_id);
	if (!vCodec) {
		printf("AVCodec failed\n");
		return -1;
	}
	printf("AVCodec successed\n");


	AVCodecContext* vc = avcodec_alloc_context3(vCodec);


	if (avcodec_open2(vc, vCodec, NULL)) {
		printf("avcodec_open failed\n");
		return -1;
	}
	printf("avcodec_open successed\n");

	// 申请原始空间 => 创建帧空间
	AVFrame* frame = av_frame_alloc();
	AVFrame* frameYUV = av_frame_alloc();
	int width = vc->width;
	int height = vc->height;

	// 分配空间 进行图像转换
	int nSize = av_image_get_buffer_size(AV_PIX_FMT_YUV420P, width, height, 1);

	uint8_t* buff = NULL;
	buff = (uint8_t*)av_malloc(nSize);

	// 一帧图像
	av_image_fill_arrays(frameYUV->data, frameYUV->linesize, buff, AV_PIX_FMT_YUV420P, width, height, 1);



	return 0;
}
