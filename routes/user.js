
const Model = require('../models/user');

const express = require('express');

const router = express.Router()

router.post('/signup', async (req, res) => {
    const data = new Model({
        username: req.body.username,
        password: req.body.pass
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/login', async (req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const user = await Model.findOne({username,password});

        if(!user){
            res.status(404).json({message:"Incorrect Username/Password."})
        }

        res.status(200).json({loggedIn:true});


    } catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports = router;