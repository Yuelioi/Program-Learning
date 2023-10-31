1. curl下载地址:https://curl.se/download.html
2. 打开visual studio cmd工具
3. 进入winbuild文件夹  `cd /d .../curl-8.4.0\winbuild`
4. 执行 `nmake /f Makefile.vc mode=static VC=17 MACHINE=x64 DEBUG=no`
5. 项目设置>属性>C/C++>常规>附加包含目录 `curl-8.4.0\builds\libcurl-vc17-x64-release-static-ipv6-sspi-schannel\include\curl`
6. VC++目录>包含目录 `curl-8.4.0\builds\libcurl-vc17-x64-release-static-ipv6-sspi-schannel\include`
7. VC++目录>lib目录 `curl-8.4.0\builds\libcurl-vc17-x64-release-static-ipv6-sspi-schannel\lib`
8. 链接器-输入,添加:libcurl_a.lib
   Ws2_32.lib
   Wldap32.lib
   winmm.lib
   Crypt32.lib
   Normaliz.lib
9. C/C++ 预处理器添加:`CURL_STATICLIB`

## 参考

[【C++开源库】Windows 下编译 libcurl 库 - Koshkaaa](https://www.cnblogs.com/RioTian/p/17547527.html)

[Visual Studio(VS2017/VS2019)编译并配置C/C++-libcurl开发环境](https://blog.csdn.net/DaSo_CSDN/article/details/77587916/)
