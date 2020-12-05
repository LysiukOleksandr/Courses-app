const express = require('express')
const path = require('path')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cartRoutes = require('./routes/cart')
const User = require('./models/user')
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(async(req,res,next)=>{
  try{
    const user = await User.findById('5fcb8e69394d7714b8314909')
    req.user = user
    next()
  }catch(e){
    console.log(e)
  }
  
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url =
      'mongodb+srv://Oleksandr:d32U8TDsyx4CT4P@cluster0.nyfsw.mongodb.net/shop?retryWrites=true&w=majority'
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    const candidate = await User.findOne()
    if(!candidate){
      const user = new User({
        email: 'sasha@gmail.com',
        name:"Sasha",
        cart:{items:[]}
      })
      await user.save()
    }
    app.listen(PORT, () => {
      console.log(`Server is running by port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
