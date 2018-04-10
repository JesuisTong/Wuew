const fs = require('fs');
const path = require('path');
const os = require('os');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const compress = require('koa-compress');

const App = new Koa();
const router = new Router();

const getIP = () => (
  os.networkInterfaces().en0 ? os.networkInterfaces().en0[1].address : os.networkInterfaces().eth0[1].address
);

// 路由处理
router.get('/*', async (ctx) => {
  const { response } = ctx;
  response.type = 'text/html';
  response.body = fs.createReadStream(path.resolve(__dirname, '../dist/index.html'));
});

// gzip 压缩处理
App.use(compress());

// 静态资源
App.use(serve(path.resolve(__dirname, '../src')));
App.use(serve(path.resolve(__dirname, '../')));
// 路由系统
App.use(router.routes());

App.listen(3001);
console.log(`server listen on: ${getIP()}:3001`);