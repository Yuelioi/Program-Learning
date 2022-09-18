https://nodejs.org/api/path.html

filepath  C:\\javascript\\foo.js

path.basename(path[, ext])      foo.js
path.delimiter                  ;/,
path.dirname(path)              C:\\javascript
path.extname(path)              .js
path.format(pathObject)         格式化
path.isAbsolute(path)           是否绝对路径
path.join([...paths])           join(filepath , "..") => C:\\javascript
path.normalize(path)            格式化
path.parse(path)                => {dir root base name ext}
path.posix
path.relative(from, to)
path.resolve([...paths])        => 绝对路径
path.sep                        \ /
path.toNamespacedPath(path)
path.win32
