if (process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express=require("express");
const app=express();
const port =8080;
const mongoose=require("mongoose");
const path=require("path");
const methodOverride = require('method-override');
const ejsMate= require('ejs-mate');
const expressError =require('./utils/expressError.js');
const session =require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport =require("passport");
const LocalStratergy =require("passport-local");
const User =require("./models/user.js");
const listingRouter =require("./routes/listing.js");
const reviewRouter =require("./routes/review.js");
const userRouter=require("./routes/user.js");

const db_url= process.env.ATLASDB_URL;

async function main(){
    mongoose.connect(db_url);
}

main()
    .then(()=>{
        console.log("success with mongodb connection");
    })
    .catch((err)=>{
        console.log(err);
    });


// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // so you can render('index')
 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

const store =  MongoStore.create({
    mongoUrl: db_url ,
    crypto :{
        secret:process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("err",()=>{
    console.log("error in mongo session store",err);
});

const sessionOptions = {
    store,//store: store
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized : true,
    cookie :{
        expires: Date.now()+ 7*24*60*60*1000, //in ms
        maxAge:7*24*60*60*1000 ,
        httpOnly : true
    }
}

//use this before routes 
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

app.use("/listings" ,listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/" ,userRouter);

app.all("*",(req , res, next)=>{
    next( new expressError(404, "Page not found!!"));
});

app.use((err ,req ,res ,next)=>{
    let {statusCode = 500, message = "Something went wrong!!"} = err;
    if (res.headersSent) {
        return next(err); // Pass the error to the default Express error handler
    }
    res.status(statusCode).render("listings/error.ejs", {err});
    // res.status(statusCode).send(message);
});


app.listen(port,()=>{
    console.log("Listening to the server");
});


// app.get("/demouser" ,async(req,res)=>{
//     let fakeUser =new User({
//         email:"student@gmail.com",
//         username : "studeeeeent"
//     })
//     let registeredUser=await User.register(fakeUser ,"hello");
//     res.send(registeredUser)
// })

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"new home",
//         description:"near city",
//         price:9000,
//         location:"Goa",
//         country:"India"
//     })
//     await sampleListing.save()
//     res.send("testing successfull");
// });