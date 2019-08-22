## 功能
本项目主要功能为在浏览器中自动播放视频，并且实现音量控制，快进快退，全屏控制，播放暂停控制等功能。

仓库地址：[https://github.com/hapiman/chrome-video](https://github.com/hapiman/chrome-video)

### 安装静态服务器
如果电脑上存在nodejs的环境，可以直接安装[anywhere](https://github.com/JacksonTian/anywhere)来访问`index.html`页面。
进入项目根目录，执行命令：`anywhere`，然后浏览器会自动打开`http://localhost:8000`页面。

### 使用puppeteer自动化执行命令
通过在`nodejs`调用前端页面的方法，然后能够Socket实现远程控制浏览器的视频播放。
```sh
node vplay.js
```

### 具体功能实现
```js
var _volumeNum = 1 // 音量值
  var _speedNum = 1 // 速度值
  var videoSrc = 'demo02.mp4' // 切换资源

  window.onload = function () {
    var myVideo = document.getElementById('myVideo')
    var scSource = document.getElementById('sc')
    var myVideoBody = { pause: true }

    // 播放完成指令
    myVideo.addEventListener('ended', function () {
      scSource.src = videoSrc;
      myVideo.load()
      myVideo.play()
    })

    // 初始化
    start()
  }

  // 获取video
  function getVideo() {
    var myVideo = document.getElementById('myVideo')
    return myVideo
  }

  // 快进
  function vforward(params) {
    if (_speedNum >= 2) return
    _speedNum = accAdd(_speedNum, 0.1)
    console.log('vforward _speedNum: ', _speedNum)
    getVideo().playbackRate = _speedNum
  }

  // 快退
  function vbackward() {
    if (_speedNum <= 0.5) return
    var myVideo = getVideo()
    _speedNum = accSub(_speedNum, 0.1)
    console.log('vbackward _speedNum: ', _speedNum)
    getVideo().playbackRate = _speedNum
  }

  // 页面加载之后执行命令
  function start() {
    var myVideo = getVideo()
    myVideo.volume = 1
    myVideo.playbackRate = 1
  }

  // 设置静音
  function setMuted() {
    getVideo().muted = true
  }

  // 设置非静音
  function setNotMuted() {
    getVideo().muted = false
  }

  // 播放
  function vplay() {
    console.log('vplay =>')
    getVideo().play();
  }

  // 暂停
  function vstop() {
    getVideo().pause();
  }

  // 重播
  function vrestart() {
    getVideo().currentTime = 0
    getVideo().play()
  }

  // 取消全屏
  function cancelFull() {
    screenfull.exit()
  }

  // 打开全屏
  function openFull() {
    getVideo().webkitRequestFullscreen()
  }

  // 音量 --
  function reduceVolume() {
    console.log('reduceVolume:: current volume: ', myVideo.volume) // 当前音量
    getVideo().muted = false
    if (_volumeNum <= 0) return
    _volumeNum = accSub(_volumeNum, 0.1)
    getVideo().volume = _volumeNum
  }

  // 音量 ++
  function addVolume() {
    console.log('addVolume:: current volume: ', myVideo.volume)   // 当前音量
    getVideo().muted = false
    if (_volumeNum >= 1) return
    _volumeNum = accAdd(_volumeNum, 0.1)
    getVideo().volume = _volumeNum
  }
```

## 遇到的问题

### 关于人工触发

打开网页的时候，autoplay可以自动播放，但是是静音模式，从76版本开始，chrome浏览器安全机制不再允许有声自动播放视频。

同样的，处于安全考虑，浏览器也不能够在没有用户操作的情况，通过接口设置为全屏。

当前项目引入`puppeteer`目的就是为了模拟人工触发页面的情况。

### 关于puppeteer安装

如果直接使用`puppeteer`，使用npm大概率是下载不下来的。本项目使用了`puppeteer-cn`来代替。

参考文章：[国内下载安装 Puppeteer 的方法](https://brickyang.github.io/2019/01/14/%E5%9B%BD%E5%86%85%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85-Puppeteer-%E7%9A%84%E6%96%B9%E6%B3%95/)


