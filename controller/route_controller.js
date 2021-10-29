const TWILIO_SID = 'AC9d9eed6870b5030f716199ffd3a44ef1'
const TWILIO_AUTH_TOKEN = '2e9b2efbb35c95472d5a7c805bf384ed'
const TWILIO_PHONE_NUMBER = '+12058462350'

const twilio = require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN);

const { find } = require('../model/file');
const File = require('../model/file');

 var latest_id = '';


module.exports.sendBill_post = async (req, res) => {


    const details = req.body;
    console.log(details)
    if (details) {
        try {

            const retriveData = await File.find().sort({_id:-1}).limit(1); 
        
            console.log(retriveData)
            const data = retriveData[0]
            const c = data.file_path;
            const filePath = c.toString().split(/\\/)
            const link = 'http://localhost:3000/' + filePath[1] + '/' + filePath[2]
            
            twilio.messages
                .create({
                    body: `Download Your File from here ${link}`,
                    messagingServiceSid: 'MG8c25852defcd5e697f223f44836ca96d',
                    to: `${details.mobile}`
                })
                .then(message => console.log(message))
                .done();
        } catch (err) {
            console.log(err)
        }
    }
    res.status(200).send({ message: 'ok' })
}

module.exports.post_uploadFile = async (req, res) => {

    console.log(req.file);
    console.log(req.body)
    try {
        const uploadFileStatus = await File.create({
            title: 'TEST12345',
            description: 'TEST12345',
            file_path: req.file.path,
            file_mimetype: req.file.mimetype
        })
       
    //    console.log(latest_id)
        res.status(200).send({message:'uploaded Successfully',uploadFileStatus})
    }catch(err)
    {
        console.log(err)
        res.status(400).send({message:'NOT SAVED',err})
    }
    
}

module.exports.get_uploadBill = async (req, res) => {
    try {
       
        const retriveData = await File.find().sort({_id:-1}).limit(1); 
        
        console.log(retriveData)
        const data = retriveData[0]
        const c = data.file_path;
        const filePath = c.toString().split(/\\/)
        
        res.status(200).send({data:'http://localhost:3000/' + filePath[1] + '/' + filePath[2]})
    } catch (error) {
        console.log(error)
        res.status(400).send('Error while getting list of files. Try again later.');
    }

}