const userModel = require('../Models/user');
const parentModel = require('../Models/parents');
const { default: mongoose } = require('mongoose');
const emailService=require('../Notifications/EmailService')
async function getAllUser(req, res, next) {
    try {
        // let response = await userModel.find({}).populate('employeId', { firstName: 1 });
        // res.json(response);
        res.render('home', { name: "Neeraj", age: 25 })

    } catch (error) {
        res.status(500).json(error);
    }
}

async function createUser(req, res, next) {
    //fetch info from request body
    try {
        console.log("req.body", req.body);
        let userDetail = req.body;
        let response = await userModel.insertMany([userDetail]);
        let parentInfo = {
            empId: response._id,
            firstName: req.body.parents.firstName,
            lastName: req.body.parents.lastName,
            age: req.body.parents.age,
            phoneNo: req.body.parents.phoneNo,

        }
        console.log(parentInfo)
        await parentModel.insertMany([parentInfo]);

        res.json(response);

    } catch (error) {
        res.json(error);
    }
}

async function getUserById(req, res, next) {
    let userId = req.params.userId;
    let response = await userModel.find({ _id: userId });
    res.json(response);
}

async function deleteUser(req, res, next) {
    let userId = req.params.userId;
    let response = await userModel.deleteOne({ _id: userId });
    res.json(response);
}

async function updateUser(req, res, next) {
    let userId = req.params.userId;
    let body = req.body;
    let response = await userModel.updateOne({ _id: userId }, { $set: body });
    res.json(response);
}

async function getParentsInfo(req, res, next) {
    console.log(req.params);
    let response = await parentModel.find({ empId: mongoose.Types.ObjectId(req.params.empId) }).populate('empId');
    res.json(response);
}

async function sendEmail(req,res,next) {
    let message = req.body.message
    let response = await emailService.sendMail({
        from: '"Ayush 👻" <ayush@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>${message}</b>`, // html body
    });
    
    console.log(response);
    res.send(response)
}

function saveFile(req, res, next) {
    res.send('File Saved')
}
module.exports = {
    getAllUser,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
    getParentsInfo,
    sendEmail,
    saveFile
}



