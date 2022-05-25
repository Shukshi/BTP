const express = require("express")
const multer = require("multer")
const execute_models = require("./python_modules/execute_models")
const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + '_' + uniqueSuffix+ ".mp4")
    }
  })
  
const upload = multer({ storage: storage })

app.get("/",(req,res)=>{
    res.json({sucess:true})
})

app.post("/video",upload.single("video"),(req,res)=>{
    //file is uploaded ... multer took care of it
    console.log(req.file,req.file.filename);
    //req.file.filename
    execute_models(req.file.filename,()=>{
        res.json({sucess:true})
    })

})

const port = 80
app.listen(port,()=>{
    console.log("started on",port);
})
