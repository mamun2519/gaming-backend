const sendToken = (user , statusCode , res) =>{
      const token = user.getJWTtoken()
      // options for cookie
      // const options = {
      //       expires: new Date(
      //         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      // ddddddddd      ),
      //       httpOnly: true,
      //     };
        
          res.status(statusCode).json({
            success: true,
            user,
            token,
          });

}

module.exports = sendToken