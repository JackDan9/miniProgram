# miniProgram
## 项目里边生成了不同类型的文件:
- `.json`后缀的JSON配置文件；
- `.wxml`后缀的WXML 模板文件；
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

#### tabBar
- 如果小程序是一个多tab应用(客户端窗口的底部或者顶部有`tab`栏可以切换页面)，可以通过`tabBar`配置项指定`tab`栏的表现，以及`tab`切换时显示的对应页面。
- **Tip**:
    - 1. 当设置`position`为`top`时，将不会显示`icon`
    - 2. `tabBar`中的`list`是一个数组，**只能配置最少2个、最多5个tab**, tab按数组的顺序排序。

- **属性说明**:

| 属性 | 类型 | 必填 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |


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


  [1]: ./images/config.jpg "config.jpg"