const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const fs = require("fs");

// For serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// Set the template engine as pug
app.set('view engine', 'pug')
app.engine('pug', require('pug').__express)
// Set the views directory
app.set('views',path.join(__dirname,'views'))
// app.get("/demo", (req, res)=>{ 
//     res.status(200).render('demo', { title: 'Hey Harry', message: 'Hello there and thanks for telling me how to use pubG!' })
// });
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('index.pug', params);
})
app.get("/", (req, res)=>{ 
    res.status(200).render('index.pug',params);
});
app.post('/',(req,res)=>{
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    email = req.body.email
    more = req.body.more
    // console.log(req.body)
    let outputToWrite = `the name of the client is ${name}, ${age} years old, ${gender}, email id is ${email}. More about him/her: ${more}`
    fs.writeFileSync('output.txt',outputToWrite)
    const params = {'message': 'Your Form has been submitted'}
    res.status(200).render('index.pug', params);

})


// app.get("/this", (req, res)=>{
//     res.status(404).send("This page is not found on my website cwh");
// });

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
