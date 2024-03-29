const express = require('express');
const router = express.Router();
require('../db/conn')
const User = require('../model/userSchema')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const authenticate = require('../middleware/authenticate')

router.get('/', (req, res) => {
    res.send(`Hello world from the server router js`);
});


router.post('/register', async (req, res) => {

    const { roomNo, name, rollNo, phone, startDate, endDate } = req.body;

    if (!roomNo || !name || !rollNo || !phone || !startDate || !endDate) {
        return res.status(422).json({ error: "Plz fill the fields properly" });
    }

    try {
        // const userExist = await User.findOne({ email: email })

        // if (userExist) {
        //     return res.status(422).json({ error: "Email already Exist" });
        // }
        // else if (password != cpassword) {
        //     return res.status(422).json({ error: "passwords do not match" });
        // }
        // else {

        //     const user = new User({ name, email, phone, work, password, cpassword });
        //     // here
        //     const userRegister = await user.save();

        //     console.log(userRegister)

        //     if (userRegister) {
        //         res.status(201).json({ message: "user registered successfuly" });
        //     }

        //     else {
        //         res.status(500).json({ error: "Failed to registered" })
        //     }
        // }

        const user = new User({ roomNo, name, rollNo, phone, startDate, endDate });
        // here
        const userRegister = await user.save();

        console.log(userRegister)

        if (userRegister) {
            res.status(201).json({ message: "user registered successfuly" });
        }

        else {
            res.status(500).json({ error: "Failed to registered" })
        }


    } catch (err) {
        console.log(err);
    }


});

// router.post('/signin', async (req, res) => {

//     try {
//         let token; 
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ error: "Plz Filled the data" })
//         }
//         const userLogin = await User.findOne({ email: email }); 

//         if (userLogin) {
//             const isMatch = await bcrypt.compare(password, userLogin.password)

//             token = await userLogin.generateAuthToken()
//             res.cookie("jwtoken", token, { 
//                 expires: new Date(Date.now() + 25892000000), 
//                 httpOnly:true
//     });

//             if (isMatch) {
//                 res.json({message: "SignIn successful"})
//             } else {
//                 res.status(400).json({error: "Invalid credentials"})
//             }

//         }
//         else {
//             res.status(400).json({error: "Invalid credentials"})
//         }


//     } catch (err) {
//         console.log(err);
//     }
// })

router.get('/about', async (req, res) => {

    const findResult = await User.find();
    // const rootUser = await findResult.forEach(console.log);

    res.json(findResult);

    // console.log(`Hello my About`);
    // console.log(`${req.rootUser} from router`);
});

module.exports = router;