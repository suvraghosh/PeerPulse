require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
// Cookies And Sessions
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const port = 3000;

let isAuthenticate = false;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Setting up sessions
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });

const socialmediaSchema = new mongoose.Schema({
    email: String,
    password: String,
})
socialmediaSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("user", socialmediaSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
    res.render("index")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.get('/feed', (req, res) => {
    if (isAuthenticate === true) {
        res.render('NewsFeed', { posts });
    } else {
        res.redirect("/login");
    }
});

app.get('/feed/chat', (req, res) => {
    if (isAuthenticate === true) {
        res.render('chat');
    } else {
        res.redirect("/login");
    }
});

app.get('/blog', (req, res) => {
    res.render("blog")
})

app.get('/features', (req, res) => {
    res.render("feature")
})
app.get('/communities', (req, res) => {
    res.render("communities")
})
app.get('/security', (req, res) => {
    res.render("security")
})

// Register new user
app.post('/register', (req, res) => {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/signup");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/feed");
                isAuthenticate = true;
            })
        }
    })
})

// Login the existing user
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // Authentication succeeded
        req.login(user, (err) => {
            if (!user) {
                return res.render("login", { errorMessage: "Invalid username or password" }); // Log the error for debugging
            }else{
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/feed");
                    isAuthenticate = true;
                })
            }
        });
    })(req, res, next);
});


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})


// Custom API for posts
var posts = [
    {
        id: 1,
        "profilePic": "https://pbs.twimg.com/profile_images/1718197561713131520/HQFznAK2_400x400.jpg",
        "name": "Suvra Ghosh",
        "description": "You 'might' not succeed at first..But you eventually will if you keep trying!",
        "postImage": "https://pbs.twimg.com/media/F3u8vrsbkAAqf91?format=jpg&name=medium"
    },
    {
        id: 2,
        "profilePic": "https://pbs.twimg.com/profile_images/1559406522329100288/bZAmg2J7_400x400.jpg",
        "name": "GeeksforGeeks",
        "description": "Them: What has your programming journey been like?Me:",
        "postImage": "https://pbs.twimg.com/media/F50gtBfaQAAUopT?format=png&name=900x900"
    },
    {
        id: 3,
        "profilePic": "https://pbs.twimg.com/profile_images/1651292382804185089/GNI3ZRtK_400x400.jpg",
        "name": "Saurabh Kumar",
        "description": "Productive evening (Work from park)💻",
        "postImage": "https://pbs.twimg.com/media/F97Fb8fbgAAVXUi?format=jpg&name=medium"
    },
    {
        id: 4,
        "profilePic": "https://pbs.twimg.com/profile_images/837204721723068417/retChlXc_400x400.jpg",
        "name": "The Engineer Bro",
        "description": "Crazy!!☠️",
        "postImage": "https://pbs.twimg.com/media/F97vHvfa8AA1HjJ?format=jpg&name=small"
    },
    {
        id: 5,
        "profilePic": "https://media.licdn.com/dms/image/D4D0BAQFThEvZuev8jA/company-logo_100_100/0/1693993872406/codingninjas_logo?e=1703116800&v=beta&t=THzd_aLIFi1Tu2utg4LYDDEyCaAAnzdABM5dkZBbaC4",
        "name": "Coding Ninjas",
        "description": "Privacy is power.",
        "postImage": "https://pbs.twimg.com/media/F97qVUVa4AAO47B?format=jpg&name=900x900"
    },
    {
        id: 6,
        "profilePic": "https://media.licdn.com/dms/image/C4D03AQGGB6CT6NqFzQ/profile-displayphoto-shrink_100_100/0/1618725077549?e=1700697600&v=beta&t=bVWRZez7P_jwVuEoWBH4NN5UOk-LyWoHlLwGtGENORI",
        "name": "Sandeep Jain",
        "description": "Taking meetings in your backyard >",
        "postImage": "https://pbs.twimg.com/media/F93-8nYXQAAsgPL?format=jpg&name=small"
    },
    {
        id: 7,
        "profilePic": "https://media.licdn.com/dms/image/D5603AQE_kj8WigWDqg/profile-displayphoto-shrink_100_100/0/1688744624208?e=1700697600&v=beta&t=sgYHeKydKO9Sj1gLd7Gx_JOrljIRx5ErCU5geNIBrAo",
        "name": "Suvra Ghosh",
        "description": "Fresh outta college ready to take on the world...",
        "postImage": "https://pbs.twimg.com/media/F92TAmsWEAAh4f0?format=jpg&name=small"
    },
    {
        id: 8,
        "profilePic": "https://pbs.twimg.com/profile_images/1633141863006838784/J4Zmxrmr_400x400.jpg",
        "name": "izzy",
        "description": "toxic chatgpt is the best coding partner i can have",
        "postImage": "https://pbs.twimg.com/media/F6XfaHyboAAjV0S?format=webp&name=small"
    },
    {
        id: 9,
        "profilePic": "https://media.licdn.com/dms/image/C4D0BAQHa212XwpTpRw/company-logo_100_100/0/1660626687953/geeksforgeeks_logo?e=1703116800&v=beta&t=nvdAQIwziNlAQT2K0nhe7B3-2WyHBCJz-rNfi3tjR4w",
        "name": "GeeksforGeeks",
        "description": "The last option is the best",
        "postImage": "https://pbs.twimg.com/media/F9wNXAiXAAA4ptu?format=jpg&name=medium"
    },
    {
        id: 11,
        "profilePic": "https://pbs.twimg.com/profile_images/1679831765744259073/hoVtsOZ9_400x400.jpg",
        "name": "GitHub Projects Community",
        "description": 'Found it in a meme forum! 😅',
        "postImage": "https://pbs.twimg.com/media/F6ZTNTuXwAAdAy7?format=webp&name=small"
    },
    {
        id: 12,
        "profilePic": "https://pbs.twimg.com/profile_images/1681241724574658561/bzJgMCte_400x400.jpg",
        "name": "Michael Gaffney",
        "description": 'So accurate!',
        "postImage": "https://pbs.twimg.com/media/F6AinbPWMAAaaln?format=webp&name=small"
    },
    {
        id: 13,
        "profilePic": "https://pbs.twimg.com/profile_images/1472916836408721409/zQl-1tuq_400x400.png",
        "name": "MIT CSAIL",
        "description": 'Today would have been the 82nd birthday of Dennis Ritchie, inventor of C and co-creator of Unix',
        "postImage": "https://pbs.twimg.com/media/F5mqdYeWMAAxt0L?format=webp&name=small"
    },
    {
        id: 14,
        "profilePic": "https://pbs.twimg.com/profile_images/1533597714381803520/9-0dOYFp_400x400.jpg",
        "name": "Craig Rowland",
        "description": 'When you log into a Linux system, make it a habit to look at the processes with this command: ps -auxwf This will list out all processes in tree format. It makes it easy to spot unusual activity. For instance, this is what a PHP reverse bindshell backdoor will look like.',
        "postImage": "https://pbs.twimg.com/media/F5texrVacAAyY8D?format=webp&name=small"
    },
    {
        id: 15,
        "profilePic": "https://pbs.twimg.com/profile_images/965775897193275398/LLrUTVUs_400x400.jpg",
        "name": "Programmer Humor",
        "description": 'iAmNotSure',
        "postImage": "https://pbs.twimg.com/media/F6G_KmQXAAEtgHE?format=webp&name=small"
    },
    {
        id: 16,
        "profilePic": "https://pbs.twimg.com/profile_images/1365068242918780928/m278bxAZ_400x400.jpg",
        "name": "Why you should have a cat",
        "description": '🫠🫠',
        "postImage": "https://pbs.twimg.com/media/F6arJERWUAABARL?format=webp&name=small"
    },
    {
        id: 17,
        "profilePic": "https://media.licdn.com/dms/image/D5603AQF4voR_1_BQZg/profile-displayphoto-shrink_100_100/0/1687295026446?e=1700697600&v=beta&t=xAHyIPjzg6KvkYX-bgFG6_yATiMpWi8qVCoUI1I4ft8",
        "name": "Nikita Gupta",
        "description": 'Started learning Kubernetes',
        "postImage": "https://pbs.twimg.com/media/F95aPwkXUAAOvqE?format=jpg&name=small"
    },
    {
        id: 18,
        "profilePic": "https://pbs.twimg.com/profile_images/965775897193275398/LLrUTVUs_400x400.jpg",
        "name": "Programmer Humor",
        "description": 'notEvenThat',
        "postImage": "https://pbs.twimg.com/media/F6Jj9l_W0AAzgdf?format=webp&name=small"
    },
    {
        id: 19,
        "profilePic": "https://media.licdn.com/dms/image/C4E0BAQFfKJaDYAqbkg/company-logo_100_100/0/1644469905471?e=1703116800&v=beta&t=r5bNrrxAuB4BuxXmSKJOlvtdhUuxK8w_9g_MbC-dJ24",
        "name": "Scalar",
        "description": 'How to organize your React project like a pro',
        "postImage": "https://pbs.twimg.com/media/F8sjOpBbUAAcbeO?format=jpg&name=small"
    },
    {
        id: 20,
        "profilePic": "https://pbs.twimg.com/profile_images/965775897193275398/LLrUTVUs_400x400.jpg",
        "name": "Programmer Humor",
        "description": 'ifOnlyThey',
        "postImage": "https://pbs.twimg.com/media/F6OSFsmWoAABvOk?format=webp&name=small"
    },
    {
        id: 21,
        "profilePic": "https://pbs.twimg.com/profile_images/837204721723068417/retChlXc_400x400.jpg",
        "name": "The Engineer Bro",
        "description": '😧',
        "postImage": "https://pbs.twimg.com/media/F0aYauXWYAEfb2x?format=jpg&name=small"
    },
    {
        id: 22,
        "profilePic": "https://pbs.twimg.com/profile_images/1633141863006838784/J4Zmxrmr_400x400.jpg",
        "name": "Programmer Memes",
        "description": '💥 💥 💥 💥',
        "postImage": "https://media.licdn.com/dms/image/D4D22AQHxhz3ebtAxjQ/feedshare-shrink_800/0/1699007561813?e=1701907200&v=beta&t=b9zHoYbWDwk1uV69i8tr5dGr1z_KydsoMv30vY86cjk"
    },
    {
        id: 23,
        "profilePic": "https://pbs.twimg.com/profile_images/965775897193275398/LLrUTVUs_400x400.jpg",
        "name": "Programmer Humor",
        "description": 'justOneMoreThing',
        "postImage": "https://pbs.twimg.com/media/F6eKUwxXQAA6rth?format=webp&name=small"
    },
    {
        id: 24,
        "profilePic": "https://pbs.twimg.com/profile_images/1634330547420790784/LaIawRCN_400x400.jpg",
        "name": "Security Trybe",
        "description": 'Ports Mostly Used By Hackers',
        "postImage": "https://pbs.twimg.com/media/F6dUOJIWUAAufNX?format=webp&name=small"
    },
    {
        id: 25,
        "profilePic": "https://pbs.twimg.com/profile_images/1633141863006838784/J4Zmxrmr_400x400.jpg",
        "name": "Programmer Memes",
        "description": 'Worse case than this?',
        "postImage": "https://pbs.twimg.com/media/F595cu2XEAAQRmq?format=jpg&name=small"
    },
    {
        id: 26,
        "profilePic": "https://pbs.twimg.com/profile_images/1608085780291031040/1fgxfi7N_400x400.jpg",
        "name": "Pratik Rajput",
        "description": '🚀 JavaScript Promises🚀 Promise.all()"👇',
        "postImage": "https://pbs.twimg.com/media/F6eIt1AboAAIjxO?format=webp&name=small"
    },
    {
        id: 27,
        "profilePic": "https://pbs.twimg.com/profile_images/989513875124117504/UNMIb20k_400x400.jpg",
        "name": "non aesthetic things",
        "description": '',
        "postImage": "https://pbs.twimg.com/media/F6e9BhhWgAE8on-?format=webp&name=small"
    },
    {
        id: 28,
        "profilePic": "https://pbs.twimg.com/profile_images/1634330547420790784/LaIawRCN_400x400.jpg",
        "name": "Security Trybe",
        "description": 'The Indian nation doing the most for students…',
        "postImage": "https://pbs.twimg.com/media/F6anFnyWYAEq2Ym?format=webp&name=small"
    },
    {
        id: 29,
        "profilePic": "https://pbs.twimg.com/profile_images/965775897193275398/LLrUTVUs_400x400.jpg",
        "name": "Programmer Humor",
        "description": 'techTwitter',
        "postImage": "https://pbs.twimg.com/media/F6fBQonXIAAQR_-?format=webp&name=small"
    },
    {
        id: 30,
        "profilePic": "https://pbs.twimg.com/profile_images/1633141863006838784/J4Zmxrmr_400x400.jpg",
        "name": "Programmer Memes",
        "description": '',
        "postImage": "https://pbs.twimg.com/media/F597knYXcAArVkh?format=jpg&name=small"
    },
    {
        id: 31,
        "profilePic": "https://pbs.twimg.com/profile_images/1633141863006838784/J4Zmxrmr_400x400.jpg",
        "name": "Programmer Memes",
        "description": 'This PC can probably run Linux, Mac OS and Windows concurrently.',
        "postImage": "https://pbs.twimg.com/media/F5uckRfXQAACZG2?format=jpg&name=small"
    },
    {
        id: 32,
        "profilePic": "https://pbs.twimg.com/profile_images/1634330547420790784/LaIawRCN_400x400.jpg",
        "name": "Security Trybe",
        "description": '😂',
        "postImage": "https://pbs.twimg.com/media/F6Nf4JTWwAAMTEf?format=webp&name=small"
    },
    {
        id: 33,
        "profilePic": "https://media.licdn.com/dms/image/C4D0BAQHa212XwpTpRw/company-logo_100_100/0/1660626687953/geeksforgeeks_logo?e=1703116800&v=beta&t=nvdAQIwziNlAQT2K0nhe7B3-2WyHBCJz-rNfi3tjR4w",
        "name": "GeeksforGeeks",
        "description": 'junior programmers vs senior programmers',
        "postImage": "https://pbs.twimg.com/media/F92yR0hW4AAn9BU?format=png&name=small"
    },
    {
        id: 34,
        "profilePic": "https://pbs.twimg.com/profile_images/1633141863006838784/J4Zmxrmr_400x400.jpg",
        "name": "Programmer Memes",
        "description": '100% true when it comes to developers',
        "postImage": "https://pbs.twimg.com/media/F4oHLd6W4AAbWCd?format=png&name=small"
    },
]
