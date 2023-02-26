![[../../../_Config/Attatchment/Pasted image 20220514171707.png]]

https://www.bilibili.com/video/av547086864?p=15

1. webpack 默认只能打包处理 js 结尾的文件，处理不了其它后缀的文件
2. 由于代码中包含了 index.css 这个文件，因此 webpack 默认处理不了
3. 当 webpack 发现某个文件处理不了的时候，会查找 webpack..config.js 这个配置文件，看 module，rules 数组中，是否配置了对应的 loader 加载器。
4. webpack把index.css这个文件，先转交给最后一个loader进行处理（先转交给css-loader）
5. 当css-loader处理完毕之后，会把处理的结果，转交给下一个loader（转交给style-loader）
6. 当style-loader处理完毕之后，发现没有下一个loader了，于是就把处理的结果，转交给了webpack
7. webpack把style-loader处理的结果，合并到/dist/bundle.js中，最终生成打包好的文件。

