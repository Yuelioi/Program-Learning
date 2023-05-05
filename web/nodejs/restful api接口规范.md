# RESTful API 设计指南

## 序

RESTful是目前最流行的API设计规范，它是用于Web数据接口的设计。从字面可以看出，他是Rest式的接口，所以我们先了解下什么是Rest。

REST与技术无关，它代表的是一种软件架构风格，REST它是 Representational State Transfer的简称，中文的含义是: "表征状态转移" 或 "表现层状态转化"。它是基于HTTP、URI、XML、JSON等标准和协议，支持轻量级、跨平台、跨语言的架构设计。

## 正片

网络应用程序，分为前端和后端两个部分。当前的发展趋势，就是前端设备层出不穷（手机、平板、桌面电脑、其他专用设备......）。

因此，必须有一种统一的机制，方便不同的前端设备与后端进行通信。这导致API构架的流行，甚至出现[&#34;API First&#34;](https://www.google.com.hk/search?q=API+first)的设计思想。[RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer)是目前比较成熟的一套互联网应用程序的API设计理论。我以前写过一篇[《理解RESTful架构》](https://www.ruanyifeng.com/blog/2011/09/restful.html)，探讨如何理解这个概念。

今天，我将介绍RESTful API的设计细节，探讨如何设计一套合理、好用的API。我的主要参考了两篇文章（[1](http://codeplanet.io/principles-good-restful-api-design/)，[2](https://bourgeois.me/rest/)）。

![RESTful API](https://www.ruanyifeng.com/blogimg/asset/2014/bg2014052201.png)

## 一、协议

API与用户的通信协议，总是使用[HTTPs协议](https://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)。

## 二、域名

应该尽量将API部署在专用域名之下。

```javascript
https://api.example.com
```

如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下。

```javascript
https://example.org/api/
```

## 三、版本（Versioning）

应该将API的版本号放入URL。

```javascript
https://api.example.com/v1/
```

另一种做法是，将版本号放在HTTP头信息中，但不如放入URL方便和直观。[Github](https://developer.github.com/v3/media/#request-specific-version)采用这种做法。

## 四、路径（Endpoint）

路径又称"终点"（endpoint），表示API的具体网址。

在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的"集合"（collection），所以API中的名词也应该使用复数。

举例来说，有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样。

> * https://api.example.com/v1/zoos
> * https://api.example.com/v1/animals
> * https://api.example.com/v1/employees

## 五、HTTP动词

对于资源的具体操作类型，由HTTP动词表示。

常用的HTTP动词有下面五个（括号里是对应的SQL命令）。

> * GET（读取）：从服务器取出资源（一项或多项）。
> * POST（创建）：在服务器新建一个资源。
> * PUT（更新）：在服务器更新资源（客户端提供改变后的完整资源）。
> * PATCH（部分更新）：在服务器更新资源（客户端提供改变的属性）。
> * DELETE（删除）：从服务器删除资源。

还有两个不常用的HTTP动词。

> * HEAD：获取资源的元数据。
> * OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

下面是一些例子。

> * GET /zoos：列出所有动物园
> * POST /zoos：新建一个动物园
> * GET /zoos/ID：获取某个指定动物园的信息
> * PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
> * PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
> * DELETE /zoos/ID：删除某个动物园
> * GET /zoos/ID/animals：列出某个指定动物园的所有动物
> * DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物

## 六、过滤信息（Filtering）

如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。

下面是一些常见的参数。

> * ?limit=10：指定返回记录的数量
> * ?offset=10：指定返回记录的开始位置。
> * ?page=2&per_page=100：指定第几页，以及每页的记录数。
> * ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
> * ?animal_type_id=1：指定筛选条件

参数的设计允许存在冗余，即允许API路径和URL参数偶尔有重复。比如，GET /zoo/ID/animals 与 GET /animals?zoo_id=ID 的含义是相同的。

## 七、状态码（Status Codes）

服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）。

状态码范围

客户端的每一次请求, 服务器端必须给出回应，回应一般包括HTTP状态码和数据两部分。

1xx: 信息，请求收到了，继续处理。
2xx: 代表成功. 行为被成功地接收、理解及采纳。
3xx: 重定向。
4xx: 客户端错误，请求包含语法错误或请求无法实现。
5xx: 服务器端错误.

2xx 状态码

200 OK [GET]: 服务器端成功返回用户请求的数据。
201 CREATED [POST/PUT/PATCH]: 用户新建或修改数据成功。
202 Accepted 表示一个请求已经进入后台排队(一般是异步任务)。
204 NO CONTENT -[DELETE]: 用户删除数据成功。

4xx状态码

400：Bad Request - [POST/PUT/PATCH]: 用户发出的请求有错误，服务器不理解客户端的请求，未做任何处理。
401: Unauthorized; 表示用户没有权限(令牌、用户名、密码错误)。
403：Forbidden: 表示用户得到授权了，但是访问被禁止了, 也可以理解为不具有访问资源的权限。
404：Not Found: 所请求的资源不存在，或不可用。
405：Method Not Allowed: 用户已经通过了身份验证, 但是所用的HTTP方法不在它的权限之内。
406：Not Acceptable: 用户的请求的格式不可得(比如用户请求的是JSON格式，但是只有XML格式)。
410：Gone - [GET]: 用户请求的资源被转移或被删除。且不会再得到的。
415: Unsupported Media Type: 客户端要求的返回格式不支持，比如，API只能返回JSON格式，但是客户端要求返回XML格式。
422：Unprocessable Entity: 客户端上传的附件无法处理，导致请求失败。
429：Too Many Requests: 客户端的请求次数超过限额。

5xx 状态码

5xx 状态码表示服务器端错误。

500：INTERNAL SERVER ERROR; 服务器发生错误。
502：网关错误。
503: Service Unavailable 服务器端当前无法处理请求。
504：网关超时。

状态码的完全列表参见[这里](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)。

## 八、错误处理（Error handling）

如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。

> ```javascript
>
> {
>     error: "Invalid API key"
> }
> ```

## 九、返回结果

针对不同操作，服务器向用户返回的结果应该符合以下规范。

> * GET /collection：返回资源对象的列表（数组）
> * GET /collection/resource：返回单个资源对象
> * POST /collection：返回新生成的资源对象
> * PUT /collection/resource：返回完整的资源对象
> * PATCH /collection/resource：返回完整的资源对象
> * DELETE /collection/resource：返回一个空文档

## 十、Hypermedia API

RESTful API最好做到Hypermedia，即返回结果中提供链接，连向其他API方法，使得用户不查文档，也知道下一步应该做什么。

比如，当用户向api.example.com的根目录发出请求，会得到这样一个文档。

> ```javascript
>
> {"link": {
>   "rel":   "collection https://www.example.com/zoos",
>   "href":  "https://api.example.com/zoos",
>   "title": "List of zoos",
>   "type":  "application/vnd.yourformat+json"
> }}
> ```

上面代码表示，文档中有一个link属性，用户读取这个属性就知道下一步该调用什么API了。rel表示这个API与当前网址的关系（collection关系，并给出该collection的网址），href表示API的路径，title表示API的标题，type表示返回类型。

Hypermedia API的设计被称为[HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)。Github的API就是这种设计，访问[api.github.com](https://api.github.com/)会得到一个所有可用API的网址列表。

> ```javascript
>
> {
>   "current_user_url": "https://api.github.com/user",
>   "authorizations_url": "https://api.github.com/authorizations",
>   // ...
> }
> ```

从上面可以看到，如果想获取当前用户的信息，应该去访问[api.github.com/user](https://api.github.com/user)，然后就得到了下面结果。

> ```javascript
>
> {
>   "message": "Requires authentication",
>   "documentation_url": "https://developer.github.com/v3"
> }
> ```

上面代码表示，服务器给出了提示信息，以及文档的网址。

## 十一、其他

（1）API的身份认证应该使用[OAuth 2.0](https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)框架。

（2）服务器返回的数据格式，应该尽量使用JSON，避免使用XML。

## 理解

### 一. 理解为什么要使用RESTful API设计规范

在很久以前，工作时间长的同学肯定经历过使用velocity语法来编写html模板代码，也就是说我们的前端页面放在服务器端那边进行编译的，更准确的可以理解为 "前后端没有进行分离"，那么在那个时候，页面、数据及模板渲染操作都是放在服务器端进行的，但是这样做有一个很大的缺点是: 后期维护比较麻烦，前端开发人员还必须掌握velocity相关的语法。因此为了解决这个问题慢慢就出现了前后端分离的思想: 即后端负责数据接口, 前端负责数据渲染, 前端只需要请求下api接口拿到数据，然后再将数据显示出来。因此后端开发人员需要设计api接口，因此为了统一规范: 社区就出现了 RESTful API 规范，其实该规范很早就有的，只是最近慢慢流行起来，RESTful API 可以通过一套统一的接口为所有web相关提供服务，实现前后端分离。

### 二. Rest设计原则

那么怎么样可以设计成REST的架构规范呢? 需要符合如下的一些原则：

1. 每一个URI代表一种资源;
2. 同一种资源有多种表现形式(xml/json);
3. 所有的操作都是无状态的。
4. 规范统一接口。
5. 返回一致的数据格式。
6. 可缓存(客户端可以缓存响应的内容)。

符合上述REST原则的架构方式被称作为 RESTful 规范。

#### 理解为什么所有的操作需要无状态呢

http请求本身是无状态的，它是基于 client-server 架构的，客户端向服务器端发的每一次请求都必须带有充分的信息能够让服务器端识别到，请求的一些信息通常会包含在URL的查询参数中或header中，服务器端能够根据请求的各种参数, 不需要保存客户端的状态, 直接将数据返回给客户端。无状态的优点是：可以大大提高服务器端的健状性和可扩展性。客户端可以通过token来标识会话状态。从而可以让该用户一直保持登录状态。

#### 理解规范统一的接口

Rest接口约束定义为: 资源识别；请求动作；响应信息; 它表示通过uri表示出要操作的资源，通过请求动作(http method)标识要执行的操作，通过返回的状态码来表示这次请求的执行结果。

可能看上面的解释还不够理解，下面我通过自己的理解来解释下上面的具体含义; 比如说，我在未使用Rest规范之前，我们可能有 增删改查 等接口，因此我们会设计出类似这样的接口: /xxx/newAdd (新增接口), /xxx/delete(删除接口), /xxx/query (查询接口), /xxx/uddate(修改接口)等这样的。增删改查有四个不同的接口，维护起来可能也不好，因此如果我们现在使用Restful规范来做的话，对于开发设计来说可能就只需要一个接口就可以了，比如设计该接口为 /xxx/apis 这样的一个接口就可以了，然后请求方式(method)有 GET--查询(从服务器获取资源); POST---新增(从服务器中新建一个资源); PUT---更新(在服务器中更新资源)，DELETE---删除(从服务器删除资源)，PATCH---部分更新(从服务器端更新部分资源) 等这些方式来做，也就是说我们使用RESTful规范后，我们的接口就变成了一个了，要执行增删改查操作的话，我们只需要使用不同的请求动作(http method)方式来做就可以了，然后服务器端返回的数据也可以是相同的，只是我们前端会根据状态码来判断请求成功或失败的状态值来判断。具体有那些状态码我们下面会讲解到。

#### 理解返回一致的数据格式

服务器端返回的数据格式可以是XML、或json. 或者直接返回状态码的方式。比如返回错误的格式json数据如下:

```json
{
    "code": 401,
    "status": "error",
    "message": '用户没有权限',
    "data": null
}
```

返回正确的数据格式的json数据一般可以为如下:

```json
{
    "code": 200,
    "status": "success",
    "data": [{
        "userName": "tugenhua",
        "age": 31
    }]
}
```

### 三. URL及参数设计规范

#### 1. uri设计规范

1) uri末尾不需要出现斜杠/
2) 在uri中使用斜杠/是表达层级关系的。
3) 在uri中可以使用连接符-, 来提升可读性。
   比如 http://xxx.com/xx-yy 比 http://xxx.com/xx_yy中的可读性更好。
4) 在uri中不允许出现下划线字符_.
5) 在uri中尽量使用小写字符。
6) 在uri中不允许出现文件扩展名. 比如接口为 /xxx/api, 不要写成 /xxx/api.php 这样的是不合法的。
7) 在uri中使用复数形式。
   具体可以看：（[https://blog.restcase.com/7-rules-for-rest-api-uri-design/](https://blog.restcase.com/7-rules-for-rest-api-uri-design/)）

在RESTful架构中，每个uri代表一种资源，因此uri设计中不能使用动词，只能使用名词，并且名词中也应该尽量使用复数形式。使用者应该使用相应的http动词 GET、POST、PUT、PATCH、DELETE等操作这些资源即可。

那么在我们未使用RESTful规范之前，我们是如下方式来定义接口的，形式是不固定的，并且没有统一的规范。比如如下形式:

```text
http://xxx.com/api/getallUsers; // GET请求方式，获取所有的用户信息
http://xxx.com/api/getuser/1;   // GET请求方式，获取标识为1的用户信息
http://xxx.com/api/user/delete/1 // GET、POST 删除标识为1的用户信息
http://xxx.com/api/updateUser/1  // POST请求方式 更新标识为1的用户信息
http://xxx.com/api/User/add      // POST请求方式，添加新的用户
```

如上我们可以看到，在未使用Restful规范之前，接口形式是不固定的，没有统一的规范，下面我们来看下使用RESTful规范的接口如下，两者之间对比下就可以看到各自的优点了。

```txt
http://xxx.com/api/users;     // GET请求方式 获取所有用户信息
http://xxx.com/api/users/1;   // GET请求方式 获取标识为1的用户信息
http://xxx.com/api/users/1;   // DELETE请求方式 删除标识为1的用户信息
http://xxx.com/api/users/1;   // PATCH请求方式，更新标识为1的用户部分信息
http://xxx.com/api/users;     // POST请求方式 添加新的用户
```

如上我们可以看到，增删改成我们都是使用同一个api接口，只是请求的方式 GET(查询)、POST(新增)、DELETE(删除)、PACTH(部分更新)来代表的是增删改查操作的方式。然后开发获取到该请求的header头部信息，就可以知道是什么方式来请求数据的了。

#### 五. 统一返回数据格式

RESTful规范中的请求应该返回统一的数据格式。对于返回的数据，一般会包含如下字段:

1) code: http响应的状态码。
2) status: 包含文本, 比如：'success'(成功), 'fail'(失败), 'error'(异常) HTTP状态响应码在500-599之间为 'fail'; 在400-499之间为 'error', 其他一般都为 'success'。 对于响应状态码为 1xx, 2xx, 3xx 这样的可以根据实际情况可要可不要。
   当status的值为 'fail' 或 'error'时，需要添加 message 字段，用于显示错误信息。
3) data: 当请求成功的时候, 返回的数据信息。 但是当状态值为 'fail' 或 'error' 时，data仅仅包含错误原因或异常信息等。

返回成功的响应JSON格式一般为如下:

```json
{
    "code": 200,
    "status": "success",
    "data": [{
        "userName": "tugenhua",
        "age": 31
    }]
}
```

返回失败的响应json格式为如下:

```json
{
    "code": 401,
    "status": "error",
    "message": '用户没有权限',
    "data": null
}
```

## 参考

[阮一峰 RESTful API 设计指南](https://www.ruanyifeng.com/blog/2014/05/restful_api.html)

[理解 RESTful API 设计规范](https://www.cnblogs.com/tugenhua0707/p/12153857.html)
