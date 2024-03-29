if(process.env.NODE_ENV!== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/author')

app.set('view engine','ejs')
app.set('layout','layouts/layout')

app.use(express.static('public'))
app.use(expressLayouts)
app.use(express.urlencoded({ limit: '10mb', extended: false}))
app.use('/',indexRouter)
app.use('/authors',authorRouter)

const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
})
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('connected to mongoose'))

app.listen(process.env.PORT||3000) 