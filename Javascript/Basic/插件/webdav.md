```javascript
import { AuthType, createClient } from "webdav";

import fs from "fs";

const client = createClient(

    "https://drive.yuelili.com/dav",

    {

        username: "435826135@qq.com",

        password: "VqhY6VQNGLAg8tYitfebxrI02srnqrWr"

    }

);

  

// 获取文件夹信息

// const directoryItems = await client.getDirectoryContents("/");

// console.log(directoryItems);

  

// 复制文件 ×

// await client.copyFile(

//   "/test/1.txt",

//   "/test/2.txt"

// );

  

// 移动文件

// await client.moveFile("/test/1.txt", "/1.txt");

  

//  写入文件 buffer不会

// Write a buffer:

// await client.putFileContents("/1.png", 1.png, { overwrite: false });

// Write a text file:

// await client.putFileContents("/1.txt", "hhhhh哈哈哈");

  

// 创建文件夹 可以递归

// await client.createDirectory("/test/data/system",true);

  

// 读取远程文件到本地(也可以读视频)

// client

//     .createReadStream("/test/1.txt")

//     .pipe(fs.createWriteStream("3.txt"));

// client

//     .createReadStream("/test/1.mp4")

//     .pipe(fs.createWriteStream("1.mp4"));

  

// 删除文件

// await client.deleteFile("/test/1.mp4");

  

// 判断文件夹是否存在  ×

// if (await client.exists("/test/path") === false) {

//   await client.createDirectory("/test/path");

// }

  

// 遍历文件与文件夹 可以递归

// const contents = await client.getDirectoryContents("/");

// const contents2 = await client.getDirectoryContents("/test", { deep: true });

  

// 获取小文件(文本之类)  不行?

// const str = await client.getFileContents("/test/1.text", { format: "text" });

// console.log(str);

  
  

// import { ProgressEvent } from "webdav";

  

// await client.getFileContents("/test/1.txt", {

//     onDownloadProgress: (progressEvent) => {

//       console.log(progressEvent.loaded + "/" + progressEvent.total)

//         // {

//         //     total: 12345600,

//         //     loaded: 54023

//         // }

//     }

// });

  
  

// 获取下载链接

// const downloadLink = client.getFileDownloadLink("/test/1.txt");

// console.log(downloadLink);

  
  

// 获取上传链接(怎么一样)

// const uploadLink: string = client.getFileUploadLink("/test/1.txt");

// console.log(uploadLink);

  
  
  
  
  
  
  
  

// Outputs a structure like:

// [{

//     filename: "/my-file.txt",

//     basename: "my-file.txt",

//     lastmod: "Mon, 10 Oct 2018 23:24:11 GMT",

//     size: 371,

//     type: "file"

// }]
```
