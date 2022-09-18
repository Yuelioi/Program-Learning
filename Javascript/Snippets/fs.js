import { open, close } from "node:fs";


写文件
open("myfile", "wx", (err, fd) => {
  if (err) {
    if (err.code === "EEXIST") {
      console.error("myfile already exists");
      return;
    }

    throw err;
  }

  try {
    writeFile('message.txt', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  } finally {
    close(fd, err => {
      if (err) throw err;
    });
  }
});





读文件
import { readFile } from 'node:fs';

readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});


创建目录
import { mkdir } from 'node:fs';

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
mkdir('/tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
});


重命名/移动
import { rename } from 'node:fs';

rename('oldFile.txt', 'newFile.txt', (err) => {
  if (err) throw err;
  console.log('Rename complete!');
});

删除文件

import { unlink } from 'node:fs';
// Assuming that 'path/file.txt' is a regular file.
unlink('path/file.txt', (err) => {
  if (err) throw err;
  console.log('path/file.txt was deleted');
});

监听文件/文件夹
https://www.jianshu.com/p/d0b9a811ead2