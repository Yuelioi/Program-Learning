

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

	//av_register_all(); 4.0�汾����Ҫ����

	AVFormatContext* pFormat = NULL;

	// �����ļ�
	const char* path = "1.mp4";




	if (avformat_open_input(&pFormat, path, NULL, NULL) != 0) {
		printf("avformat open failed\n");
		return -1;
	}
	printf("avformat open successed\n");

	// �����ļ��������
	if (avformat_find_stream_info(pFormat, NULL) < 0) {
		printf("avformat_find_stream failed\n");
		return -1;
	}
	printf("avformat_find_stream successed\n");


	int time = pFormat->duration;
	int mbittime = time / 1000000 / 60;
	int mmintime = time / 1000000 % 60;
	printf("%d��%d��\n", mbittime, mmintime);

	//�鿴�ļ���Ϣ
	av_dump_format(pFormat, NULL, path, 0);

	// Ѱ����
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

	// ����ԭʼ�ռ� => ����֡�ռ�
	AVFrame* frame = av_frame_alloc();
	AVFrame* frameYUV = av_frame_alloc();
	int width = vc->width;
	int height = vc->height;

	// ����ռ� ����ͼ��ת��
	int nSize = av_image_get_buffer_size(AV_PIX_FMT_YUV420P, width, height, 1);

	uint8_t* buff = NULL;
	buff = (uint8_t*)av_malloc(nSize);

	// һ֡ͼ��
	av_image_fill_arrays(frameYUV->data, frameYUV->linesize, buff, AV_PIX_FMT_YUV420P, width, height, 1);



	return 0;
}
