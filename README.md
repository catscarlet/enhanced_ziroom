# Enhanced Ziroom

这是一个增强自如官网访问体验的 userscript 。

~~自如官网现在搜索到的结果，把可以租的可以看的不能租的不能看的都混到一起了。大量的无效结果混扎在搜索结果中，用户必须点开每个房源的详情页才能确认房子是否有效，非常浪费用户时间。~~ 20181214，现在不混到一起了

这个插件可以在列表页就显示房源的一些额外状态，比如是否可租，是否可月租。**（注：各地区的政策不同，部分房源即使在网上没有显示可月租选项，但仍可以签署短租月租合同。具体情况请与链家自如管家核实）**

## 截图

![](snap.jpg)

## 使用说明

### 安装

用户需先安装用户脚本管理器，推荐

- 暴力猴：[chrome 网上应用店](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)，[火狐附加组件](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)，[GitHub](https://github.com/violentmonkey/violentmonkey/releases/latest)

或其他同类扩展程序。用户脚本管理器的安装等相关资料均可参见 [Greasy Fork](https://greasyfork.org/)。

之后安装 Enhanced Ziroom：

- 脚本安装地址：<https://greasyfork.org/zh-CN/scripts/36468-enhanced-ziroom>，点击页面上的 **安装此脚本** 即可。

### 使用

脚本仅在列表页生效。

有效房源增加提示信息，提示文字为 **我要看房** ，此类包括 **配置中**，**可预定**，以及 **现房**。对于刚刚放出但尚未开放看房或预定的，则会显示 **可签约时间**。

无效房源标记为灰色，提示文字为 **已下定**，此类包括......我不知道，传闻是不看房也不签约直接订房的人弄的。

**提示文字都是在详情页固定位置抠的。官网说啥是啥。**

## 原理

自如并未提供过任何 API 接口。所以为了获取这些信息，脚本会从列表页中扫描所有详情页地址，并全部扫一遍。脚本会对每个房源都发一条HTTP请求，按理来讲还是有点消耗带宽的。

房源状态判断以及提示文字也都是在详情页固定位置抠的。

也说了，都是扣的页面，也没有 API ，所以也随时会失效。

### 版本备注

#### 0.2.0 - 20181214

链家自如在这一年后，总算不再把可用房源和不可用房源混在一起排列了，失效房源现在很少见，但并不是没有。反过来经常出现不少房源这一秒可用，下一秒又不可用的状态，所以请不要依赖这个插件做最终判断。多刷新，总有变。

链家自如基于地铁找房的页面已经坏掉了，选了地铁之后是无法翻页的，否则会出现无房源提示。

也可能整个网站都闹 404 。（这个时候手机上的自如APP会一起崩）

之所以把可用房源去掉，是为了考虑色盲和色弱用户。自如网站的配色本身就对上述用户非常不友好，我也是最近才发现加个绿色更会降低用户体验。不可用房源继续保持灰色不变。

月租房的价格算法极为诡异，自如的管家都是不肯接打电话聊的，都是一条一条微信语音发过来。我是没什么心情研究，所以没做月均价格这个功能，以防误导。谁要研究透了可以发 Pull Request。

更多相关信息：<https://blog.catscarlet.com/201812143234.html>

## 源码

Github：<https://github.com/catscarlet/enhanced_ziroom>

Master 分支用于发布。如有 Pull Request 请发到 dev 分支。

## LICENSE

**Apache License 2.0**
