const axios = require("axios");
const {URLSearchParams} = require('url')
const apiKey = "NDg3MjVhNTMzMDRmNDY1YTQ2NjY3YTYzMzU0Yjc2Mzg=" // YOUR API KEY HERE
  const baseURL = "http://api.textlocal.in"
exports.sendOtp=async(number,otp)=>{
    const params = new URLSearchParams();
    params.append("apikey",apiKey);
    params.append("sender","FLUTRR");
    params.append("numbers", number);
    let message=`${otp} is your OTP for Login on -flutrr`
    params.append(
      "message",
      message
      );
    await axios.get(baseURL+"/send/?"+params.toString()).then(res=>{console.log(res.data)})
}