const express = require('express')
const {router}=require('./routers/userRouter')
const cors=require('cors')
const {connectDB}=require('./configs/dbConfigs')

connectDB()
app = express()
const PORT= process.env.PORT || 8000
app.use(express.json())
app.use(cors())
app.use('/api/user',router);
app.listen(PORT,()=>console.log(`app is running in port ${PORT}`))