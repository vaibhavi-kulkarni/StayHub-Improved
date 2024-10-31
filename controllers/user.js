const User =require("../models/user.js");

module.exports.renderSignUpForm =(req,res)=>{
    res.render("users/signUp.ejs");
};

module.exports.signUp =async(req,res)=>{
    try {
        let {username ,password , email}=req.body;
        let newUser = new User({email,username});
        let registeredUser= await User.register(newUser ,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","user registered successfully!");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    };
};

module.exports.renderLoginForm =async(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back!!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// module.exports.logout =(req,res)=>{
//     req.logout((err)=>{
//         if(err){
//             return next(err);
//         }
//         req.flash("success","you are logged out!!");
//         res.redirect("/listings");
//     });
// };

module.exports.logout = async (req, res, next) => {
    try {
        await req.logout((err) => {
            if (err) {
                return next(err);
            }
        });
        req.flash("success", "You are logged out!!");
        res.redirect("/listings");
    } catch (err) {
        next(err);
    }
};

