const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const dbConnection = require('./db')
app.use(express.json())

app.use('/api/policies/' , require('./routes/policiesRoute'))
app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/bookings/' , require('./routes/bookingsRoute'))

// const path = require('path')

// if(process.env.NODE_ENV==='production'){
//     app.use('/',express.static('client/build'))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client/build/index.html'));
//     })
// }

app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/api/students/login', (req,res)=>res.send('Login Success!'))
// app.get('/api/students/register', (req,res)=>res.send('Register Success!'))
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))