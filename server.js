const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

let subscriptions = [{name: 'Ilya', phone: 12425}, {name: 'Valya', phone: 478}];


app.use(koaBody({
    urlencoded:true,
}));

app.use(async ctx => {

    const {name, phone} = ctx.request.query;

    ctx.response.set({'Access-Control-Allow-Origin':'*',});
    for (let i=0; i < subscriptions.length; i++) {
        if (subscriptions[i].name === name && subscriptions[i].phone === Number(phone)) {
            ctx.response.body='You already subscribed';
            return
        }
    }
    subscriptions.push({name: name, phone: phone});
    ctx.response.body = subscriptions;
});

const server = http.createServer(app.callback()).listen(7070);
