![咨询大白小程序码 (1)](https://user-images.githubusercontent.com/12805846/211237534-507cbb39-5fe4-4da5-aab0-3e159940a119.jpg)


# miniProgram

- 关于经济新闻和招聘的微信小程序`better-work`。
- 关于经济新闻和招聘的微信小程序接口服务`better-work-server`。
- 关于经济新闻和招聘的微信小程序数据服务`better_work_data`。

## 技术栈
- <em>项目设计</em>
- <em>架构设计</em>
- <em>接口设计</em>
- <em>迭代更新</em>
- 小程序开发使用<em>WXML</em>、<em>WXSS</em>、<em>JSON</em>、<em>JavaScript</em>进行原生落地、接口端服务使用<em>Egg.js</em>、<em>mysql2</em>、<em>egg-sequelize</em>、<em>Nginx</em>进行HTTP接口的落地和转发、数据端服务使用<em>Scrapy</em>、<em>MariaDB</em>、<em>Request</em>对原始数据进行封装，作为基础数据层为应用提供原始数据。

## 功能列表

  - [X] 经济要闻
  - [X] 经济政策
  - [X] 经济招聘
  - [X] 搜索
  - [ ] 注册 
  - [ ] 登录
  - [ ] 点赞
  - [ ] 收藏
  - [ ] 编辑
  - [X] 截图分享
  - [X] 小程序分享
  - [X] 关于
  - [X] 要闻详情
  - [X] 政策详情
  - [X] 经济招聘信息
  - [X] 服务接口监控 


> https://eggjs.org/zh-cn/intro/

## 项目里边生成了不同类型的文件:
- `.json`后缀的JSON配置文件；
- `.wxml`后缀的WXML模板文件；
- `.wxss`后缀的WXSS样式文件；
- `.js`后缀的JS脚本逻辑文件

------

## `.json`后缀的JSON配置文件:
- 在项目的根目录下有一个`app.json`和`project.config.json`，此外在`pages/logs`目录下还有一个`logs.json`，依次来说明一下他们的用途。

### 小程序配置`app.json`
- `app.json`是对当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部tab等。如:
```
{
    "pages": [
        "pages/index/index",
        "pages/logs/index"
    ],
    "window": {
        "navigationBarTitleText": "Demo"
    },
    "tabBar": {
        "list": [{
        "pagePath": "pages/index/index",
        "text": "首页"
        }, {
        "pagePath": "pages/logs/logs",
        "text": "日志"
        }]
    },
    "networkTimeout": {
        "request": 10000,
        "downloadFile": 10000
    },
    "debug": true
}
```

- `app.json`配置项列表:

| 属性 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| pages | String Array | 是 | 设置页面路径 |
| window | Object | 否 | 设置默认页面的窗口表现 |
| tabBar | Object | 否 | 设置底部tab的表现 |
| networkTimeout | Object | 否 | 设置网络超时时间 |
| debug | Boolean | 否 | 设置是否开启debug模式 |

#### pages
- 接受一个数组，每一项都是字符串，来指定小程序由哪些页面组成。每一项对应页面的[路径+文件名]信息，**数组的第一项代表小程序的初始页面。小程序中新增/减少页面，都需要对pages数组进行修改**。
- 文件名不需要写文件后缀，因为框架会自动去寻找路径下`.json, .js, .wxml, .wxss` 四个文件进行整合。
- 如开发目录为:
```
pages/
pages/index/index.wxml
pages/index/index.js
pages/index/index.wxss
pages/logs/logs.wxml
pages/logs/logs.js
app.js
app.json
app.wxss
```
- 则需要在`app.json`中写:
```
{
    "pages": [
        "pages/index/index",
        "pages/logs/logs"
    ]
}
```

#### window
- 用于设置小程序的状态栏、导航条、标题、窗口背景色

| 属性 | 类型 | 默认值 | 描述 | 最低版本 |
| --- | --- | --- | --- | --- |
| navigationBarBackgroundColor | HexColor | #000000 | 导航栏背景颜色，如"#000000" | |
| navigationBarTextStyle | String | white | 导航栏标题颜色，仅支持black\white | | 
| navigationBarTitleText | String | | 导航栏标题文字内容 | |
| navigationStyle | String | default | 导航栏样式，仅支持default/custom。custom模式可自定义导航栏，只保留右上角胶囊状的按钮。 | 微信版本 6.6.0 |
| backgroundColor | HexColor | #ffffff | 窗口的背景色 | |
| backgroundTextStyle | String | dark | 下拉loading的样式，仅支持dark/light | |
| backgroundColorTop | String | #ffffff | 顶部窗口的背景色，仅iOS支持 | 微信版本 6.5.16 |
| backgroundColorBottom | String | #ffffff | 底部窗口的背景色，仅iOS支持 | 微信版本 6.5.16 |
| enablePullDownRefresh | Boolean | false | 是否开启下拉刷新，详见页面相关事件处理函数 | | 
| onReachBottomDistance | Number | 50 | 页面上拉触底事件触发时距页面底部距离，单位为px |

**注: HexColor(十六进制颜色值), 如"#ffffff"**

**注: navigationStyle只在app.json中生效。开启custom后, 低版本客户端需要做好兼容。 开发者工具基础**

- `app.json`:
```
{
    "window":{
        "navigationBarBackgroundColor": "#ffffff",
        "navigationBarTextStyle": "black",
        "navigationBarTitleText": "微信接口功能演示",
        "backgroundColor": "#eeeeee",
        "backgroundTextStyle": "light"
    }
}
```


![window_config][1]


#### tabBar
- 如果小程序是一个多tab应用(客户端窗口的底部或者顶部有`tab`栏可以切换页面)，可以通过`tabBar`配置项指定`tab`栏的表现，以及`tab`切换时显示的对应页面。
- **Tip**:
    - 1.当设置`position`为`top`时，将不会显示`icon`
    - 2.`tabBar`中的`list`是一个数组，**只能配置最少2个、最多5个tab**, tab按数组的顺序排序。

- **属性说明**:

| 属性 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| color | HexColor | 是 | | tab上的文字默认颜色 |
| selectedColor | HexColor | 是 | | tab上的文字选中时的颜色 |
| backgroundColor | HexColor | 是 | | tab的背景颜色 |
| borderStyle | String | 否 | black | tabbar上边框的颜色，仅支持black/white |
| list | Array | 是 | | tab的列表，list属性说明(最少2个，最多5个tab) |
| position | String | 否 | bottom | 可选值bottom、top |

- 其中list接受一个数组，数组中的每个项都是一个对象，其属性值如下:

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| pagePath | String | 是 | 页面路径, 必须在pages中先定义 |
| text | String | 是 | tab上的按钮文字 |
| iconPath | String | 否 | 图片路径，icon大小限制为40kb， 建议尺寸为81px * 81px，当position为top时，此参数无效，不支持网络图片 |
| selectedPath | String | 否 | 选中时的图片路径，icon大小限制为40kb，建议尺寸为81px * 81px，当position为top时，此参数无效 |

![tabbar][2]

#### networkTimeout
- 可以设置各种网络请求的超时时间。
- **属性说明**:

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| request | Number | 否 | wx.request的超时时间，单位毫秒，默认为：60000 |
| connectSocket | Number | 否 | wx.connectSocket的超时时间，单位毫秒，默认为: 60000 |
| uploadFile | Number | 否 | wx.uploadFile的超时时间, 单位毫秒，默认为: 60000 |
| downloadFile | Number | 否 | wx.downloadFile的超时时间，单位毫秒，默认为: 60000 |

#### debug
- 可以在开发者工具中debug模式，在开发者工具的控制台面板，调试信息以`info`的形式给出，其信息有`Page`的注册，页面路由，数据更新，事件触发。可以帮助开发者快速定位一些常见的问题。

#### page.json
- 每一个小程序页面也可以使用`.json`文件来对本页面的窗口表现进行配置。页面的配置比`app.json`全局配置简单得多，只是设置`app.json`中的`window`配置项的内容，页面中配置项会覆盖`app.json`的`window`中相同的配置项。
- 页面的`.json`只能设置`window`相关的配置项，以决定本页面的窗口表现，所以无需写`window`这个键，如:

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| navigationBarBackgroundColor | HexColor | #000000 | 导航栏背景颜色，如"#000000" |
| navigationBarTextStyle | String | white | 导航栏标题颜色，仅支持 black/white |
| navigationBarTitleText | String | | 导航栏标题文字内容 |
| backgroundColor | HexColor | #ffffff | 窗口的背景色 |
| backgroundTextStyle | String | dark | 下拉loading的样式, 仅支持dark/light |
| enablePullDownRefresh | Boolean | false | 是否开启下拉刷新 |
| disableScroll | Boolean | false | 设置为true则页面整体不能上下滚动；只在`page.json`中有效，无法在`app.json`中设置该项 |
| onReachBottomDistance | Number | 50 | 页面上拉触底事件触发时距页面底部距离，单位为px |

```
{
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "微信接口功能演示",
    "backgroundColor": "#eeeeee",
    "backgroundTextStyle": "light"
}
```

  [1]: ./images/config.jpg "config.jpg"
  [2]: ./images/tabbar.png "tabbar.png"
