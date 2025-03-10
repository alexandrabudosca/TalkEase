const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Question = require('./models/questionModel');
const User = require('./models/userModel');
const bodyParser = require('body-parser');
const checkAuth = require('./middleware/check-auth');

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://budosca17:O7E9mgjqg5y72uhj@cluster0.1y19a9d.mongodb.net/talkease?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("DB working");
})

// CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
  
app.get('/api/lessons/:page', checkAuth, async (req, res) => {
    const page = parseInt(req.params.page);
    const limit = 8;
    const questionQuerry = Question.find();
    questionQuerry.skip((page - 1) * limit).limit(limit);

    try {
        const questions = await questionQuerry;
        res.status(200).json(questions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

app.get('/api/begginer', checkAuth, async (req, res) => {
    const questionQuerry = Question.find();

    try {
        const questions = await questionQuerry;
        res.status(200).json(questions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

app.post('/api/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 5);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, 'secret_key_long_string', { expiresIn: '3h' });
      res.json({ token });

      const now = new Date();
      const lastLogin = user.lastLogin;

      if (lastLogin) {
        const diffDays = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          user.loginStreak += 1;
          user.lastLogin = now;
        } else if (diffDays > 1) {
          user.loginStreak = 1; // Reset streak if more than a day has passed
          user.lastLogin = now;
        }
      } else {
        user.lastLogin = now;
        user.loginStreak = 1; // First login
      }

      await user.save();

    } else {
      res.status(400).send('Email or password is wrong');
    }
});

app.get('/api/profil', checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userData.userId);
        
        if (user) {
            res.json({ name: user.name, score: user.score, loginStreak: user.loginStreak });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.put('/api/add', checkAuth, async (req, res) => {
    try {
        const score = req.body;
        const userId = req.userData.userId;

        const user = await User.findByIdAndUpdate(userId, score, {new: true});
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ user });
    } catch (error) {
      res.status(400).send(error.message);
    }
});

app.listen(3000, () => {
    console.log("working");
})
