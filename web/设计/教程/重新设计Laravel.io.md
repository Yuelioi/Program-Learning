[重新设计 Laravel.io](https://medium.com/refactoring-ui/redesigning-laravel-io-c47ac495dff0)
---

![](https://miro.medium.com/v2/resize:fit:1000/1*AZkkwzahAr0VpKdJ4OzRNQ.png)

[Laravel.io是一个面向使用](https://laravel.io/)[Laravel](https://laravel.com/) PHP 框架的开发人员的论坛和社区门户。

他们最近推出了一个全新版本的网站，但作为一个由志愿者驱动的开源项目，找到资源来整合一个真正精美的设计可能很困难。

我们要求并得到了继续尝试进行一些整容的机会，所以让我们看看我们可以做些什么来使 UI 更上一层楼！

# 目前的设计

我们将致力于论坛本身的设计。这是现有设计的样子：

![](https://miro.medium.com/v2/resize:fit:1000/1*mTFJc4vDVeEyRWf3z8849Q.png)

该网站的布局和结构开局不错，但在某些视觉设计细节方面肯定还有改进的余地。

我们对在这里重塑品牌或从头开始重新设计网站不感兴趣；取而代之的是，让我们看看我们可以做些什么来尝试将这个设计提升到一个新的水平。

# 减小页面标题大小

![](https://miro.medium.com/v2/resize:fit:700/1*5zGrdvwFfmuuZfFWT7dqVw.png)

在这个页面上，我们首先要看的是主导航下方的大“论坛”标题。

您可能已经意识到该站点正在使用[Bootstrap](http://getbootstrap.com/)，这是一个用于快速可靠地构建响应式网站的出色框架。

Bootstrap 开箱即用地为标题标签提供默认大小，例如 `h1`through `h6`。这对于博客文章或文档页面等文档样式内容很有帮助，但它可能会鼓励在应用程序 UI 中做出一些错误的决定。

由于“论坛”是页面标题，从语义上讲，将它作为 `h1`. 但即使它应该是 `h1`，页面标题真的需要是页面上*最大的文本吗？*

[从Baremetrics](https://demo.baremetrics.com/)仪表板查看此屏幕截图：

![](https://miro.medium.com/v2/resize:fit:700/0*6dIIq9e2skNGC6Ff.png)

在这个设计中，“Metrics Overview”页面标题文本与“Monthly Recurring Revenue”的大小相同 *（在本例中为 16px）* 。

它仍然很好地完成了标记页面的工作，但因为它更小，所以它有点不碍事，有助于突出显示页面上更重要的内容，即（42px！）收入统计 *本身* 。

> =***提示***= =*：在应用程序 UI 中，不要盲目地根据层次结构选择标题大小而不考虑内容优先级。*=

将“论坛”标题的大小从 39px 减小到 24px 以及减少垂直填充可以大大降低页面标题的重要性，并让更多人关注它所属的线程列表：

![](https://miro.medium.com/v2/resize:fit:700/1*ZBynyxXvgN2K5KQJ2HNsWA.png)

# 重新定位搜索字段

现在搜索字段位于“创建线程”按钮的正上方，这给人一种错误的印象，即它们在某种程度上是相关的：

![](https://miro.medium.com/v2/resize:fit:700/1*X_ccf68Vs43WZgmRVgOtcw.png)

乍一看，您可能认为输入字段是您要创建的话题的标题，或者该按钮实际上是搜索的提交按钮。

让我们通过将搜索字段移动到与“论坛”页面标题相同的标题区域来分隔这两个元素：

![](https://miro.medium.com/v2/resize:fit:1000/1*6uJCWRUV5etosW3hQQVv7w.png)

这清楚地表明按钮和搜索字段不是同一表单的一部分，并将搜索放在更常规的位置，让用户更容易发现。

为了使它是一个搜索字段更加明显，我们还添加了一个放大镜图标，以帮助访问者识别它是一个搜索字段，而无需阅读占位符文本。

# 重新设计导航栏

![](https://miro.medium.com/v2/resize:fit:1000/1*LJATFajfXZRxdywvVzVOqQ.png)

现有导航栏中的粗体绿色与“创建线程”按钮的颜色相同，这会以多种方式影响设计：

1. **导航吸引了很多整体注意力，** 因为它与主要号召性用语的颜色相同。
2. **它直接与“Create Thread”按钮竞争** ，使按钮比我们可能想要的要少。

它也只是看起来超级“Bootstrap”，所以想出一种感觉更定制化的处理方式会很好。

## 选择新的背景颜色

如果可以的话，最好避免引入全新的颜色，所以让我们看看使用网站上的一些现有颜色时导航会是什么样子：

![](https://miro.medium.com/v2/resize:fit:1000/1*QKHP-aYafhRPkpE6lZnErQ.png)

在这三个选项中，我认为白色看起来最好，而且绝对不会与页面上任何更重要的内容争夺注意力。

让我们开始吧！

## 增添一丝色彩

白色看起来非常干净和现代，但如果给它的头发更有个性会很好。

全背景活动状态看起来仍然很像 Bootstrap，所以也许我们可以通过尝试一些不同的东西来恢复这种个性。

![](https://miro.medium.com/v2/resize:fit:700/1*wRRQX_P2f-bGsA9FJU5_Fg.png)

看看 Twitter 用于导航的方法：

![](https://miro.medium.com/v2/resize:fit:700/0*rEHvQSU5AW8r8vf5.png)

重音边框和彩色文字为该品牌增添了一点色彩，但又不会让人感到压倒性的感觉，而且仍然感觉非常干净和简单。

让我们借用这种处理方式，为活动导航项添加一个短的 2px 底部边框，并更改文本颜色以匹配：

![](https://miro.medium.com/v2/resize:fit:700/1*3yLHVnJorzRsWCBKJIcSqQ.png)

> *提示：小强调边框是为平淡无奇的设计添加一些颜色的简单方法。*

绿色的底部边框看起来不错，但是绿色的文字有点难以阅读。

使用与非活动导航项相同的深色文本颜色看起来更好，但如果活动项和非活动项之间存在*一些*差异，那就更好了：

![](https://miro.medium.com/v2/resize:fit:700/1*EZ5YPw4CzJM4iM9p0dPJkw.png)

与其尝试寻找一种新颜色来强调活动文本，不如尝试使用较浅的字体颜色来*淡化非活动文本：*

![](https://miro.medium.com/v2/resize:fit:700/1*hBn51UKZ83DnzzP1_tS1cg.png)

这种方法还为悬停状态创造了一个很好的机会，我们在鼠标光标下为非活动项目使用较深的文本颜色。

> *提示：与其让文本变暗或变粗来强调它，不如尝试通过变细或变亮来淡化周围的文本。*

文字现在看起来好多了，但底部边框感觉有点不连贯，就像它只是漂浮在太空中一样。

解决这个问题的一种方法是在整个导航栏中添加一个微妙的底部边框，就像页面标题下的那样：

![](https://miro.medium.com/v2/resize:fit:1000/1*rKxhE_48k5x3rI_Gci38sA.png)

这有助于锚定重音边框并清楚地表明它已连接到上面的导航项。

## 收尾工作

Laravel.io 最近获得了一个新徽标，所以让我们将其合并到标题中：

![](https://miro.medium.com/v2/resize:fit:1000/1*6_cooavb6qUUJnq-7EyLLw.png)

新标志非常大胆，让导航的左侧感觉比右侧重很多。这本身并不是坏事，但让我们看看如果我们试图通过将导航项居中来平衡一些事情会是什么样子：

![](https://miro.medium.com/v2/resize:fit:1000/1*qFgjHKiHY1cju5dc1TafgQ.png)

这看起来很不错，而且设计与标准的 Bootstrap 布局也有一些距离，这有助于让事情感觉更加定制和有意。

接下来我们来看看线程列表。

# 线程列表

这里首先突出的是所有绿色链接文本：

![](https://miro.medium.com/v2/resize:fit:1000/1*HfhMGocZiLc9JesxmUuPPg.png)

当您将一个链接包含在一个非链接文本块中时，确保链接突出并且看起来可点击是很重要的，Bootstrap 通过默认为链接着色来针对这种情况进行优化。

但在这种情况下，线程列表中的几乎所有内容都是一个链接，并且使用旨在使链接在段落文本中“弹出”的处理方式确实很霸道。

在几乎完全是链接的网站上，您会注意到一种常见的方法是只使用正常正文颜色的粗体版本，例如 YouTube 所做的：

![](https://miro.medium.com/v2/resize:fit:700/0*7CQ5QQENRRRliyFN.png)

让我们在线程列表中尝试一下，将线程标题设为粗体深灰色，并在常规字体粗细下将预览文本设为浅灰色：

![](https://miro.medium.com/v2/resize:fit:700/1*zRikVbrNIn2ufk40u_WnVg.png)

> *提示：在链接繁重的网站上，不要试图用鲜艳的颜色让每个链接都“流行”。*

## 重要内容放在第一位

现在，每个线程卡的顶部都有一个灰色标题，其中包含元数据，例如最后一个回复的人和该帖子的相关标签。

作为您在每张卡片中看到的第一条内容，标题区域会与线程标题竞争注意力，同时也会使线程列表更难扫描。

让我们尝试将该标题区域移动到每张卡片的底部，以尝试更多地强调线程标题：

![](https://miro.medium.com/v2/resize:fit:700/1*PkP1HR6LRJc2GNpx9mC7lg.png)

## 不再强调次要内容

这无疑是一个改进，但页脚中的灰色背景仍然吸引了很多注意力并损害了列表的可扫描性。

灰色背景为我们做的唯一一件事是帮助将元数据区域与线程标题和预览分开。

让我们尝试删除背景，看看我们是否可以通过另一种方式实现分离：

![](https://miro.medium.com/v2/resize:fit:700/1*QdaK26l7wWhYJ8EP36K31A.png)

删除背景绝对是整体上的改进，但如果不改变背景颜色， *“x 分钟前回复”* 文本现在肯定会与线程预览竞争。

让我们将元数据上的字体大小降低几个像素并使用稍微亮一点的颜色，看看是否有帮助：

![](https://miro.medium.com/v2/resize:fit:700/1*JK3a9DrGp7RaW1SpJL8QtQ.png)

这感觉像是一个改进，但绿色的用户名链接变得有点难以阅读。

快速[对比检查](https://webaim.org/resources/contrastchecker/)确认白底浅绿色未通过[WCAG 2.0 可访问性指南](https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast)，因此让我们使用深绿色代替：

![](https://miro.medium.com/v2/resize:fit:700/1*UH_YfXHFhceA93vgzzl8hw.png)

这看起来好多了，我认为我们现在甚至可以在线程预览和元数据区域之间减少空白：

![](https://miro.medium.com/v2/resize:fit:700/1*Vs2kvHU9KdcNVv0mlY5H0g.png)

这让我们可以在屏幕上塞进更多的信息，并且考虑到网站的受众是开发人员，额外的密度可能会受到赞赏。

## 重新定位标签以减少干扰

现在，每张卡片右下角的深色主题标签将您的视线从线程标题上移开一点；当您向下浏览线程列表时，它们会让您的眼睛从一个角落跳到另一个角落。

![](https://miro.medium.com/v2/resize:fit:700/1*DM2J14KuhPqzVN7gGvtf8g.png)

我们可以做的一项更改是将标签移到更靠近卡片左侧的位置：

![](https://miro.medium.com/v2/resize:fit:700/1*z5NpcAG0mFSoVy6ofZYztA.png)

通过将标签放置在更靠近线程标题的位置，它们必须更直接地争夺注意力。由于标题更加强调，它胜出并使标签不那么分散注意力。

## 反转标签颜色

如果我们想进一步弱化标签，我们也可以将深色背景切换为浅色背景：

![](https://miro.medium.com/v2/resize:fit:700/1*LFLZhiybo66VX3TvzztSLg.png)

## 更清晰的评论

我们还通过删除深色背景来淡化评论计数，同时添加一个图标，使数字的含义更加清楚：

![](https://miro.medium.com/v2/resize:fit:700/1*P1HbIsKG2wUiFYbr0bBlWw.png)

## 更微妙的默认头像

最后，让我们用更微妙的东西替换默认的 Gravatar 图片；没有必要提醒用户注意从未上传过个人资料照片的用户。

我们在这里使用的是[Zondicons](http://www.zondicons.com/)的：

![](https://miro.medium.com/v2/resize:fit:700/1*pKqInMt7ZoNkGiKjfPcgwg.png)

## 折叠边界

让我们看看页面其余部分的新卡片设计：

![](https://miro.medium.com/v2/resize:fit:1000/1*r-NPM_XhW9BdVHEnQL7o7Q.png)

为每张卡片使用单一背景颜色的另一个好处是我们不再需要将每张卡片分开；仍然很清楚什么内容属于什么卡片，即使它们都共享边界：

![](https://miro.medium.com/v2/resize:fit:1000/1*c23SltiDsI5H8H9W6pm7ZQ.png)

这让我们可以在页面上容纳更多信息，也让线程列表更像是一个统一的组件。

# 更改站点背景颜色

这真的开始融合在一起，但我认为页面上的不同部分可以使用更多的区别。

实现此目的的一种简单方法是使用稍微深一点的背景颜色来帮助白色页面部分更清晰地脱颖而出：

![](https://miro.medium.com/v2/resize:fit:1000/1*3QhT-HVgzo9lGlTKzhzcbg.png)

在这里，我们将页眉区域保持为白色，将其视为自己的页面部分，并将“论坛”页面标题下的底部边框扩展为全宽，这样我们就没有尴尬的部分边框了。

# 标签边栏

## 减小标题大小

就像我们在开头提到的页面标题一样，“标签”标题可以更小：

![](https://miro.medium.com/v2/resize:fit:700/1*U7qsavbpGDPmUrXiUo8Jvw.png)

让我们将它从 26px 一直减少到 12px，并给它一个更微妙的颜色，这样它就不会从标签列表本身窃取太多注意力：

![](https://miro.medium.com/v2/resize:fit:700/1*fUoLaRlFcLF8sNpQJvQkJQ.png)

现在这可能有点 *太小* /太微妙，感觉不像一个标题，但让我们尝试用其他一些想法来解决这个问题。

让我们将字体粗细从常规更改为粗体，将文本大写，并添加一点字母间距以确保易于阅读：

![](https://miro.medium.com/v2/resize:fit:700/1*0LjDAd6hKpzxy89jC2_2GQ.png)

这给了标题更多的权威，同时仍然让我们保持文本相当小和柔和。

> *提示：使用全部大写时，稍微增加字母间距以提高易读性。*

## 删除不必要的边框

既然我们已经更改了页面的背景颜色，我认为“Create Thread”按钮下的边框对我们没有多大帮助，所以让我们将其删除：

![](https://miro.medium.com/v2/resize:fit:700/1*jq0PDynio8ijLZOhfOge0A.png)

## 不再强调标签列表

深色选定状态与亮白色背景的高对比度使当前标签列表设计与线程列表竞争非常激烈。

由于标签列表是次要内容，因此值得探讨如何降低它对整体设计的影响。

使标签列表不那么突出的一种简单方法是完全删除背景 *（和边框）* ，并将文本直接放在页面背景上：

![](https://miro.medium.com/v2/resize:fit:1000/1*tHqk_0RGyEadizKab1Ld9A.png)

这看起来已经好多了，但让我们尝试让选定状态也更微妙一些。

我们不反转文本颜色并使用深色背景，而是尝试通过使背景稍微亮一点并将字体粗细从常规变为粗体来增加所选项目的对比度：

![](https://miro.medium.com/v2/resize:fit:1000/1*O_M21Knv5TEDOX5psiQIsg.png)

仍然很容易分辨出选择了哪个标签，但现在线程列表感觉更像是页面的焦点，这似乎是一个胜利。

## 压缩列表项

[技术受众喜欢Hacker News](https://news.ycombinator.com/)等网站的密度，所以让我们通过减少每个项目之间的空间并在所选状态上使用更少的填充来稍微压缩侧边栏：

![](https://miro.medium.com/v2/resize:fit:1000/1*An9_EQ_z4MMwWUNI0pinWA.png)

## 调整按钮位置

按钮位置有些地方感觉有点“不对劲”，但目前还不清楚是什么原因造成的：

![](https://miro.medium.com/v2/resize:fit:700/1*6gr3663EBMbhRn1yFwkffA.png)

它与似乎“正确”的线程列表的顶部完全对齐，那么问题是什么？

好吧，如果您想象侧边栏列周围有一个不可见的容器，那么按钮将被推到该容器的顶部而 *没有填充* 。

线程列表栏*确实*有一些填充，至少在我看来这让这两栏看起来有点不均匀。

让我们将左侧的列向下移动一点，看看是否有帮助：

![](https://miro.medium.com/v2/resize:fit:700/1*PWPGsjs1oI9MEr8Om4ZXNg.png)

这对我来说绝对看起来更好，即使一开始看起来像是一个违反直觉的位置。

![](https://miro.medium.com/v2/resize:fit:1000/1*Q2IbxhfqhfXCuIwSVBnnfg.png)

# 反转布局

在当前布局中，“Create Thread”号召性用语和标签列表位于左侧，线程列表位于右侧。

我喜欢这种布局的一个优点是它使线程标题非常靠近中心，当您扫描页面时感觉很自然。

不过，只是为了好玩，让我们尝试交换列，看看是否有我们更喜欢该布局的地方：

![](https://miro.medium.com/v2/resize:fit:1000/1*X1XMQ4ilM6VmqyeY79bpAA.png)

在这个版本中，线程标题与页面的左边缘对齐，感觉不如在中心那么好，但它仍然感觉很好。

这个布局还有两点值得一提：

1. **“创建线程”按钮感觉有点远，将更多注意力放在线程列表上。** 这可能是一件好事，因为线程列表是页面的焦点。
2. **标签列表与线程列表很好地对齐。** 这真的只是一种表面审美的东西，但我确实认为它看起来不错。

网站从来没有单一的“正确”设计，所以很多时候您只需要选择对您来说更好的设计。

在这种情况下，我认为这种颠倒的布局看起来很棒，所以让我们致力于这一改变。

# 之前和之后

这是我们的决赛前后：

![](https://miro.medium.com/v2/resize:fit:1000/1*ZwcjJXCpugSiEKOyCN_-vw.png)

总而言之，我们进行了 20 多个小的迭代调整，但最终的结果是一个感觉更加定制和精致的设计。

最重要的是，这些变化都不需要任何天生的设计或艺术“天赋”；仅仅知道要寻找什么问题以及如何解决这些问题就可以使您的设计走很长一段路。
