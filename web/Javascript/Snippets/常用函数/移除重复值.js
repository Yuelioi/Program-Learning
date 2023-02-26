function removeDuplicates(array) {
  return Array.from(new Set(array));
}

const array = [1, 2, 3, 3, 4, 5, 5];
const result = removeDuplicates(array);
console.log(result); // 输出 [1, 2, 3, 4, 5]
