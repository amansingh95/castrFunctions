const express = require('express');
const axios = require('axios')
const cors=require('cors');
const app = express();
app.use(cors())
app.use(express.json());
var router = express.Router();

const castrBaseUrl = 'https://developers.castr.io/apiv1';
app.get('/test',async function ( req, res) {
 res.json({"resulkt":"okk"})

})
app.post('/checkCasterApiKey', async function ( req, res) {
    try{
      const headers={'x-api-key': req.body.apiKey}
        let result= await axios.get(`${castrBaseUrl}/user/profile`,{headers});
        console.log("API key",result)
       res.send(result.data);
    } catch (error) {
      console.log("errors",error);
      res.send(error)  
    }  
});
app.post('/getuserprofile',async function ( req, res) {
  try{
    const headers={'x-api-key': req.body.apiKey}
      let result= await axios.get(`${castrBaseUrl}/user/profile`,{headers});
      console.log("User Profile",result)
      res.send(result.data);
  } catch (error) {
     console.log("errors",error);
     res.send(error) 
  }  
});
app.post(`/getregionlist/:streamType`,async function ( req, res) {
  try{
    const headers={'x-api-key': req.body.apiKey}
    const streamTypes=req.params.streamType
    let result= await axios.get(`${castrBaseUrl}/ingests/${streamTypes}`, {headers});
    console.log("List of Regions",result.data)
    res.send(result.data);

} catch (error) {
   console.log("errors",error);
   res.send(error)
}   
});
app.post(`/createnewstream`,async function ( req, res) {
  try{
    const payload={
        "type": req.body.type ,
        "name": req.body.name,
        "region":req.body.region
        }
    const headers={'x-api-key': req.body.apiKey}
    let result= await axios.post(`${castrBaseUrl}/streams/create`, payload, {headers});
    console.log("New stream created",result.data)
    res.send(result.data);
} catch (error) {
   console.log("errors",error);
   res.send(error)
}   
});

app.post(`/getstreamrtmpconfig/:id`,async function ( req, res) {
  try{
    const streamId=req.params.id;
    const headers={'x-api-key': req.body.apiKey}
      let result= await axios.get(`${castrBaseUrl}/streams/${streamId}/ingest`, {headers});
      console.log("getStreamRtmpConfig",result)
      res.send(result.data);

  } catch (error) {
     console.log("errors",error);
     res.send(error)
  }     
  
} );

app.post(`/getallstreams`,async function ( req, res) {
  try{
    const headers={'x-api-key': req.body.apiKey}
      let result= await axios.get(`${castrBaseUrl}/streams`,{headers});
      res.send(result.data);
      console.log("stream deletead",result.data)

  } catch (error) {
     console.log("errors",error);
     res.send(error)
  }  
});

app.post(`/deletestream/:id`,async function ( req, res) {
  try{
    const deleteStreamId=req.params.id;
    const headers={'x-api-key': req.body.apiKey}
    let result=await axios.delete(`${castrBaseUrl}/streams/${deleteStreamId}`,{headers});
      res.send(result.data);
  } catch (error) {
     console.log("errors",error);
     res.send(error)
  }  
});
const PORT =  5000;

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
);