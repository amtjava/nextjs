const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()


  router.get('/details/:id', async ctx => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/details',
      query: { id },
    })
    ctx.respond = false
  })


  server.use(router.routes());


  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', 'userid:xxxxx')
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })

  // ctx.body
})
