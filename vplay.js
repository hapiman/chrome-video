
const puppeteer = require('puppeteer-cn')
const sleep = require('promise.sleep')
const pageUrl = 'http://localhost:8000/index.html'
const durationSeds = 24 * 60 * 60
const pptrConfig = {
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  //设置超时时间
  timeout: 15000,
  //如果是访问https页面 此属性会忽略https错误
  ignoreHTTPSErrors: true,
  // 打开开发者工具, 当此值为true时, headless总为false
  devtools: false,
  // 关闭headless模式, 不会打开浏览器
  headless: false,
  ignoreDefaultArgs: ['--enable-automation'],
  args: ['--start-maximized', '--dont-require-litepage-redirect-infobar']
}

async function doAction (page) {
  await page.click(`#btn-not-muted`)
  await page.click(`#btn-play`)
  await page.click(`#btn-full`)
}
async function setView (page, screen) {
  await page.setViewport({
    width: screen.width,
    height: screen.height
  })
}
async function reloadPage (page, screen) {
  await page.goto(pageUrl) // 刷新页面
  await setView(page, screen)
  await doAction(page)
}
async function getScreenInfo (page) {
  const screen = await page.evaluate(() => {
    const width = window.screen.width
    const height = window.screen.height
    const layout = { width, height } // 屏幕尺寸，全屏使用
    return Promise.resolve(layout)
  })
  return screen
}

async function start () {
  try {
    const browser = await puppeteer.launch(pptrConfig)
    const page = await browser.newPage()
    const screen = await getScreenInfo(page)
    await reloadPage(page, screen)
    await sleep(10000)
    await reloadPage(page, screen) // 模拟刷新

    // 人为关闭页面触发
    page.on('close', async function () {
      console.log('page closed by mannual.')
      await browser.close()
      process.exit(0)
    })

    await sleep(durationSeds * 365 * 10) // 死循环
    await browser.close()
  } catch (error) {
    console.log('start error: ', error)
    process.exit(0)
  }
}
start()
