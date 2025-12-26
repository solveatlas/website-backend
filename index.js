const app = require('./app') 
const {PORT} = require('./config/config')

app.listen(PORT, ()=>{
    console.log("I am live at port", PORT);
    
})