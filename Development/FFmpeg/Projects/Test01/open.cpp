

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

	//av_register_all(); 4.0�汾����Ҫ����

	AVFormatContext* pFormat = NULL;

	// �����ļ�
	//const char* path = "1.mp4";

	// �����ļ�
	avformat_network_init();
	const char* path = "https://cn-cq-ct-01-05.bilivideo.com/live-bvc/273978/live_606402811_31701497/index.m3u8"; // Bվ
	AVDictionary* options = NULL;
	av_dict_set(&options, "buffer_size", "102400", 0); //���û����С��1080p�ɽ�ֵ����
	av_dict_set(&options, "rtsp_transport", "tcp", 0); //��udp��ʽ�򿪣������tcp��ʽ�򿪽�udp�滻Ϊtcp
	av_dict_set(&options, "stimeout", "2000000", 0); //���ó�ʱ�Ͽ�����ʱ�䣬��λ΢��
	av_dict_set(&options, "max_delay", "500000", 0); //�������ʱ��


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

	return 0;
}
