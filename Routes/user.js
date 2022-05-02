
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userController = require('../Controllers/user');
const { engine } = require('express-handlebars');
const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/public`)
    },
    filename: function (req, file, cb) {
     const ext=file.mimetype.split('/')[1]
      cb(null, `public-${file.fieldname}.${ext}`)
    }
  })
  
  const upload = multer({ storage: diskStorage })



app.use(bodyParser.json([]));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.post('/user', userController.createUser);
app.get('/user', userController.getAllUser)
app.get('/user/:userId', userController.getUserById);
app.put('/user/:userId', userController.updateUser);
app.delete('/user/:userId', userController.deleteUser);
app.get('/parentInfo/:empId', userController.getParentsInfo);
app.post('/sendEmail',userController.sendEmail)
app.post('/saveFile',upload.single('file'),userController.saveFile)
module.exports = app;