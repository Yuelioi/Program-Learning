function renameNodeName(oldNode,newNodeName) {
  // 示例: 将table的第一个tr替换为thead
  // let tables = document.querySelectorAll("table");
  // for (let tb of tables) {
  //     renameNodeName(tb.querySelector("tr"),'THEAD')
  // }
  var newNode = document.createElement(newNodeName),
    node,
    nextNode;

  node = oldNode.firstChild;
  while (node) {
    nextNode = node.nextSibling;
    newNode.appendChild(node);
    node = nextNode;
  }

  newNode.className = oldNode.className;
  // 其他属性也得通用复制
  newNode.id = oldNode.id;
  oldNode.parentNode.replaceChild(newNode, oldNode);
}


