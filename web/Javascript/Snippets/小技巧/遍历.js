let obj = {a: 1, b: 2, c: 3};

// 遍历键名
for (let key of Object.keys(obj)) {
  console.log(key); // "a", "b", "c"
}

// 遍历键值
for (let value of Object.values(obj)) {
  console.log(value); // 1, 2, 3
}

// 遍历键值对
for (let [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`); // "a: 1", "b: 2", "c: 3"
}
