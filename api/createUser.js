import axios from 'axios'

const createUser=async (req,res)=>{
    const {userId, userName}=req.body;
    axios
    .post(
        'https://api.chatengine.io/users/',
        {username:userName, secret: userId},
        {headers:{'Private-Key':process.env.chatengine_private_key}}
        )
    /*.post(
        'https://api.chatengine.io/projects/people/',
        {username:userName, secret: userId},
        {headers:{'Private-Key':process.env.chatengine_private_key}}
        )*/ //both ok on vercel dev but need to delete .env
    .then(apiRes=>{
        res.json({body:apiRes.body,error:null})
    })
    .catch(err=>{
        res.json({body:null,error:err})
    })
}
export default createUser