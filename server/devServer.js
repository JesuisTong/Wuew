const fs = require('fs');
const path = require('path');
const os = require('os');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const compress = require('koa-compress');
const koaBody = require('koa-body');

// 性感css，在线编译
const nsass = require('node-sass');
const nless = require('less');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const prettify = require('postcss-prettify')
const processor = postcss([autoprefixer, prettify]);



const App = new Koa();
const router = new Router();

const getIP = () => (
  os.networkInterfaces().en0 ? os.networkInterfaces().en0[1].address : os.networkInterfaces().eth0[1].address
);

// sass
const complierSass = (request, response) => {
  processor.process(
    nsass.renderSync({
      data: request.body.css || ''
    }).css,
    { from: undefined }
  ).then(
      result => {
        response.body = {
          code: 0,
          css: result.css
        };
      }
  );
};

const ccomplierLess = (request, response) => {
  nless.render(request.body.css || '')
    .then(res => {
      processor.process(
        res.css,
        { from: undefined }
      ).then(
        result => {
          response.body = {
            code: 0,
            css: result.css
          };
        }
      )
    })
}

// 路由处理
router.post('/complier-:type', koaBody(), async (ctx) => {
  const { response, request } = ctx;

  response.type = 'application/json';

  try {
    switch (ctx.params.type) {
      case 'sass':
        await complierSass(request, response);
        break;
      case 'less':
        await ccomplierLess(request, response);
        break;
      default:
        break;
    }
  } catch (error) {
    response.body = {
      code: 500,
      msg: error.message
    };
  }
});


router.get('/test', async (ctx) => {
  const { response, request } = ctx
});

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