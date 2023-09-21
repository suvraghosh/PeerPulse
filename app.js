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
    secret: "This is the secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-suvra:J0IyKCt6PaTaJcVg@cluster0.98ifzzn.mongodb.net/socialmediaDB");

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
app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/login");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/feed");
                isAuthenticate = true;
            })
        }
    })
})


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})


// Custom API for posts
var posts = [
    {
        id: 1,
        "profilePic": "https://pbs.twimg.com/profile_images/1685344710498656256/PYCqwObJ_400x400.jpg",
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
        "profilePic": "https://media.licdn.com/dms/image/C4D03AQGGB6CT6NqFzQ/profile-displayphoto-shrink_100_100/0/1618725077549?e=1700697600&v=beta&t=bVWRZez7P_jwVuEoWBH4NN5UOk-LyWoHlLwGtGENORI",
        "name": "Sandeep Jain",
        "description": "Coding all day, every day! 💻",
        "postImage": "https://media.licdn.com/dms/image/D4D22AQElnD-BP-9iZQ/feedshare-shrink_800/0/1694281407635?e=1698278400&v=beta&t=zIeiY4ByGhVDuVYLnR4rYnMYIP3GY-ciUGvNy-sB5-0"
    },
    {
        id: 4,
        "profilePic": "https://media.licdn.com/dms/image/C4D03AQEdzwKv80hEnA/profile-displayphoto-shrink_100_100/0/1516590596897?e=1700697600&v=beta&t=mj3Vg4GxVL87fdty6tNCjvJo0lu1YAiz7WgkJZrgwxA",
        "name": "Daniel Abrahams",
        "description": "Just start.",
        "postImage": "https://media.licdn.com/dms/image/D5622AQHD4dI5h6u-FA/feedshare-shrink_800/0/1691365111893?e=1698278400&v=beta&t=nFJ_kU6Ac_zxxvUR53oaxCvt7x8TJgs0dYYHHi687aY"
    },
    {
        id: 5,
        "profilePic": "https://media.licdn.com/dms/image/D4D0BAQFThEvZuev8jA/company-logo_100_100/0/1693993872406/codingninjas_logo?e=1703116800&v=beta&t=THzd_aLIFi1Tu2utg4LYDDEyCaAAnzdABM5dkZBbaC4",
        "name": "Coding Ninjas",
        "description": "Comments always lie. Write the biggest lie in the comments👇🥲",
        "postImage": "https://media.licdn.com/dms/image/D4D22AQGGz07osYY22w/feedshare-shrink_800/0/1692967955224?e=1698278400&v=beta&t=_JuszH6C7UsYMGowZEbF6w7U2o7oRFaOmdtpCL0EZ14"
    },
    {
        id: 6,
        "profilePic": "https://media.licdn.com/dms/image/C4D03AQGGB6CT6NqFzQ/profile-displayphoto-shrink_100_100/0/1618725077549?e=1700697600&v=beta&t=bVWRZez7P_jwVuEoWBH4NN5UOk-LyWoHlLwGtGENORI",
        "name": "Sandeep Jain",
        "description": "History made anew as #Chandrayaan3 lands on the lunar soil, marking a monumental leap for our nation's space prowess! It fills us with immense pride to stand as the pioneering nation that has successfully touched down on the south pole of the moon.Proud to witness this extraordinary achievement that propels us even closer to the stars. #IndiaInSpace #ChandrayaanLanding 🇮🇳",
        "postImage": "https://media.licdn.com/dms/image/D4D22AQF6rhE0kM_Tdg/feedshare-shrink_2048_1536/0/1692795151743?e=1698278400&v=beta&t=GakI7tr3mBuKDAjBujBTYrgoxF8pxJWBWiVHLNOAofk"
    },
    {
        id: 7,
        "profilePic": "https://media.licdn.com/dms/image/D5603AQE_kj8WigWDqg/profile-displayphoto-shrink_100_100/0/1688744624208?e=1700697600&v=beta&t=sgYHeKydKO9Sj1gLd7Gx_JOrljIRx5ErCU5geNIBrAo",
        "name": "Suvra Ghosh",
        "description": "As an entrepreneur you have to feel like you can jump out of an aeroplane because you're confident that you'll catch a bird flying by.It's an act of stupidity, and most entrepreneurs go splat because the bird doesn’t come by, but a few times it does. - Reed Hastings",
        "postImage": "https://media.licdn.com/dms/image/D4D22AQHacFeMIT9hjA/feedshare-shrink_800/0/1690513509382?e=1698278400&v=beta&t=w_j6RK459YFq1BLpksXP_jjlGBuObZ2uZJw5om5KWEE"
    },
    {
        id: 8,
        "profilePic": "https://pbs.twimg.com/profile_images/1672620718239141889/XTOsUdwx_400x400.jpg",
        "name": "izzy",
        "description": "toxic chatgpt is the best coding partner i can have",
        "postImage": "https://pbs.twimg.com/media/F6XfaHyboAAjV0S?format=webp&name=small"
    },
    {
        id: 9,
        "profilePic": "https://media.licdn.com/dms/image/C4D0BAQHa212XwpTpRw/company-logo_100_100/0/1660626687953/geeksforgeeks_logo?e=1703116800&v=beta&t=nvdAQIwziNlAQT2K0nhe7B3-2WyHBCJz-rNfi3tjR4w",
        "name": "GeeksforGeeks",
        "description": "Purr-sonal attack 🥲",
        "postImage": "https://media.licdn.com/dms/image/D4D22AQE5WgUkLVmm1g/feedshare-shrink_800/0/1690367409643?e=1698278400&v=beta&t=SYanykhTwhDNjCllAeLBDpjUDktAuAynj296W54OS2E"
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
        "description": 'Do you agree?👇',
        "postImage": "https://media.licdn.com/dms/image/D5622AQGDIMSptZg7Pw/feedshare-shrink_800/0/1695196300064?e=1698278400&v=beta&t=wdUXhNT4Le1Ex21uyNOaXuvnCiK-3crcZ3vG4sNRzw8"
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
        "description": 'We dare you to tag that guy 🔫',
        "postImage": "https://media.licdn.com/dms/image/D5622AQFctbXQl7n4SA/feedshare-shrink_800/0/1695153857691?e=1698278400&v=beta&t=FdoC2c-R_8V8MNtS1gaoIqg9oeLDTIKlfblo3rqFKsI"
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
        "description": 'CSS is the worst programming language',
        "postImage": "https://pbs.twimg.com/media/F5963A4XsAA2udn?format=jpg&name=small"
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
        "description": 'Good morning friends 👍',
        "postImage": "https://media.licdn.com/dms/image/D4D22AQHHRTFQXsDhsg/feedshare-shrink_800/0/1695187911114?e=1698278400&v=beta&t=c1VEyq7Il-tZ0Tf1LQsOw4Euu6ZUJvEzMr8O4noQ168"
    },
    {
        id: 34,
        "profilePic": "https://media.licdn.com/dms/image/D5603AQH-smSCvkH2Dg/profile-displayphoto-shrink_100_100/0/1694944220075?e=1700697600&v=beta&t=4FCdFSDDtPHODgvPNuE6bhlP8jzMGn2X_LWqGC-8zdU",
        "name": "Bhaskar Nandy",
        "description": "Bhaiya abhi Development kare ya DSA kare or DEV & DSA dono parallelly kaise manage kare.. This is a common question that I In the era of software engineering, development covers a massive area where combination of your problem solving skill and development skill will make you a better engineer (I know there are so many ways to become a better engineer but it's one of them).So assuming you're making a social media app which has an infinite scrolling system.. Over here using a doubly linked list will make it infinitely scrollable in both directions (node->left or node->right).. And to update the newsfeed you just have to add a new node.. So simple huhh!!Yea DSA/CP will improve your problem solving skill where development is the implementation of your problem solving skill..A good problem solving skill will help you to think about the different approaches that can be implemented to build something so that software becomes more optimised..And to manage all these things you just have to make a schedule and have to follow it.. Maybe you might miss a friends party or night outing but after reaching a point of life you won't be disappointed..(Don't make excuses like cllg me 75% attendance lagwane h toh time nhi milrha.. Jisko karna h wo kar lega theek 🤘)",
        "postImage": "https://media.licdn.com/dms/image/D5622AQHNIOnPnBz_wA/feedshare-shrink_800/0/1694288346132?e=1698278400&v=beta&t=t7_O90MuYchenHrLx6EcC8f90MuZsrAxXZ4rsK7gDMM"
    },
    {
        id: 35,
        "profilePic": "https://pbs.twimg.com/profile_images/1633141863006838784/J4Zmxrmr_400x400.jpg",
        "name": "Programmer Memes",
        "description": '100% true when it comes to developers',
        "postImage": "https://pbs.twimg.com/media/F4oHLd6W4AAbWCd?format=png&name=small"
    },
]
