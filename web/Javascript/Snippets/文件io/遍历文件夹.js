const fs = require('fs');

// 异步方法
function iterateDirectory(dir) {
    fs.readdir(dir, (err, files) => {
      if (err) throw err;
  
      for (const file of files) {
        const filePath = `${dir}/${file}`;
        fs.stat(filePath, (err, stat) => {
          if (err) throw err;
  
          if (stat.isDirectory()) {
            iterateDirectory(filePath);
          } else {
            console.log(filePath);
          }
        });
      }
    });
}

// 同步方法
function iterateDirectorySync(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = `${dir}/${file}`;
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      iterateDirectorySync(filePath);
    } else {
      console.log(filePath);
    }
  }
}
const toLoopFolder = "E:\\Project\\docs_ue\\测试"

iterateDirectorySync(toLoopFolder);
iterateDirectory(toLoopFolder);

