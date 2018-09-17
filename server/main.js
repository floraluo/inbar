const Koa = require('koa');
const proxy = require('koa-proxies')
const serve = require('koa-static')
const mount = require('koa-mount');
const logger = require('koa-logger');
const app = new Koa();

app.use(logger());

// API代理配置
app.use(proxy('/api', {
  target: 'http://api.zhenhenet.com',
  //必须，用于收银台侦测
  xfwd: true,
  //必须，用于消息推送WebSocket
  ws: true,
  changeOrigin: true,
  rewrite: path => path.replace(/^\/api/, ''),
  logs: true
}))

app.use(mount('/static', serve('../static')));

// 生产环境（已编译好的项目文件）
const distServe = serve('../dist');
app.use((ctx, next) => {
  if (ctx.path === '/') {
    ctx.path = '/index.html'
  }
  return distServe(ctx, next)
})

app.on('error', err => {
  console.error('server error', err)
});

// 生产环境端口
app.listen(9000, '0.0.0.0', () => {
  console.info(`服务器已启动，端口：9000`)
});
