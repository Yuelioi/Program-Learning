## 类型

js基础类型 `boolean`、 `bigint`、 `null`、`number`、 `string`、 `symbol`和 `undefined`

拓展类型: `any`、 `never`、 `unknown`

其他: `interface`、 `number[]`、 `class` ...

组合类型: 联合和泛型。

```javascript
// 联合
type MyBool = true | false;

// 泛型
type StringArray = Array<string>; // string[]
```
