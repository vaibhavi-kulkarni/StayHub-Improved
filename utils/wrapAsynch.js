// function wrapAsynch(fn){
//     return function (req,res,next){
//         fn(req,res,next).catch(err);
//     }
// }

module.exports=(fn)=>{
    return function (req,res,next){
        fn(req,res,next).catch(next);
    };
}

