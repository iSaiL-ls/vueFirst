const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// 处理静态资源
app.use(express.static('public'))
// 处理参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
// 路由
app.get('data', (req, res) => {
  res.send('112')
})
app.get('/books', (req, res) => {
  res.send('传统的URL传递参数' + req.query.id)
})
app.get('/books/:id', (req, res) => {
  res.send('restful的URL传递参数' + req.params.id)
})
app.delete('/books/:id', (req, res) => {
  res.send('DELETE传递参数' + req.params.id)
})
app.post('/books', (req, res) => {
  // console.log(req.body.uname);
  res.send('POST传递参数' + req.body.uname + '-----' + req.body.pwd)
})
app.put('/books/:id', (req, res) => {
  // console.log(req.body.uname);
  res.send('PUT传递参数' + req.params.id + '----' + req.body.uname + '-----' + req.body.pwd)
})
app.get('/json', (req, res) => {
  // console.log(req.body.uname);
  res
    .json({
      uname: 'lisai',
      age: 18,
      gender: 'male'
    })
  // res.send('PUT传递参数' + req.params.id + '----' + req.body.uname + '-----' + req.body.pwd)
})
app.get('/axios', (req, res) => {
  res.send('hello axios')
})

app.post('/login', (req, res) => {
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    console.log(req.body.username)
    console.log(req.body.password)
  }

  // if(req.query)
})
// 启动监听
app.listen(3000, () => {
  console.log('run')
  return '/login'
})
