// destruct response object and token from user
const setCookie = ({res, token}) => {
   // ms in a day: 1000ms by mins by hour by day
   const oneDay = 1000 * 60 * 60 * 24

   // set jwt in cookie in response obj to client (cookie: name, value (jwt), options - res.cookie auto returns in res header)
   res.cookie("token", token, 
    {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay), // expires in one day
        secure: process.env.NODE_ENV === "production" // set to https only if production
    })
}

export default setCookie