https://nodejs.org/api/fs.html

fsPromises.access(path[, mode])
fs.access(path[, mode], callback)
fs.accessSync(path[, mode])

// * Promise方法
try {
  await fsPromises.access('myfile', constants.R_OK | constants.W_OK);
  console.log('can access');
} catch {
  console.error('cannot access');
}
// * 同步方法
try {
  accessSync('myfile', constants.R_OK | constants.W_OK);
  console.log('can read/write');
} catch (err) {
  console.error('no access!');
}

// * 异步方法
access('myfile', (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
}



fs.access(path[, mode], callback)                判断访问权限(不要有读写操作)
fs.appendFile(path, data[, options], callback)   追加写入文件内容,文件不存在创建
fs.chmod(path, mode, callback)                   更改文件访问权限
fs.chown(path, uid, gid, callback)               更改文件所有者
fs.close(fd[, callback])                         关闭文件
fs.copyFile(src, dest[, mode], callback)         拷贝文件(目标存在则被覆盖)
// !fs.cp(src, dest[, options], callback)
fs.createReadStream(path[, options])
fs.createWriteStream(path[, options])
// !fs.exists(path, callback)
fs.fchmod(fd, mode, callback)                    设置文件的权限
fs.fchown(fd, uid, gid, callback)                设置文件的所有者
fs.fdatasync(fd, callback)
fs.fstat(fd[, options], callback)
fs.fsync(fd, callback)
fs.ftruncate(fd[, len], callback)
fs.futimes(fd, atime, mtime, callback)
fs.lchmod(path, mode, callback)
fs.lchown(path, uid, gid, callback)
fs.lutimes(path, atime, mtime, callback)
fs.link(existingPath, newPath, callback)
fs.lstat(path[, options], callback)
fs.mkdir(path[, options], callback)              异步创建目录
fs.mkdtemp(prefix[, options], callback)          创建临时文件
fs.open(path[, flags[, mode]], callback)         打开文件
fs.opendir(path[, options], callback)            打开文件夹
fs.read(fd, buffer, offset, length, position, callback)
fs.read(fd[, options], callback)                 读文件
fs.read(fd, buffer[, options], callback)
fs.readdir(path[, options], callback)
fs.readFile(path[, options], callback)           读文件全部内容
fs.readlink(path[, options], callback)
fs.readv(fd, buffers[, position], callback)
fs.realpath(path[, options], callback)
fs.realpath.native(path[, options], callback)
fs.rename(oldPath, newPath, callback)            重命名/移动
fs.rmdir(path[, options], callback)
fs.rm(path[, options], callback)                 删除文件/文件夹
fs.stat(path[, options], callback)               文件信息(isDirectory mtimeMs)
fs.symlink(target, path[, type], callback)
fs.truncate(path[, len], callback)
fs.unlink(path, callback)
fs.unwatchFile(filename[, listener])
fs.utimes(path, atime, mtime, callback)
fs.watch(filename[, options][, listener])
fs.watchFile(filename[, options], listener)
fs.write(fd, buffer, offset[, length[, position]], callback)
fs.write(fd, buffer[, options], callback)
fs.write(fd, string[, position[, encoding]], callback)
fs.writeFile(file, data[, options], callback)
fs.writev(fd, buffers[, position], callback)