const express = require('express');
const axios = require('axios')

const app = express();
app.use(express.json());
  app.get("/", (req, res) => {
    res.send("Api is running");
    console.log(
        `hii`
      )
  });
 //const headers={'x-api-key': 'castrkey_91e6aa00-a7e3-11eb-bc86-0b87cf87c323'}
  const castrBaseUrl = 'https://developers.castr.io/apiv1';
  
  
getRegionList = async(streamType) =>{
    try{
        
        let result= await axios.get(`${castrBaseUrl}/ingests/${streamType}`, {headers});
        console.log("List of Regions",result)
        return result

    } catch (error) {
       console.log("errors",error);
    }     
    
} 
const streamtype="live"
//getRegionList(streamtype)

createNewStream = async(streamName, streamTypeValue, selectedRegion) => {
    try{
        const payload={
            "type": streamTypeValue ,
            "name": streamName,
            "region":selectedRegion
            }

        let result= await axios.post(`${castrBaseUrl}/streams/create`, payload, {headers});
        console.log("New stream created",result)
        return result
        

    } catch (error) {
       console.log("errors",error);
    }  
}
const streamName ="node tes";
const streamTypeValue="live";
const selectedRegion='5bc02ca183c5d1f2016d6d4e';
//createNewStream(streamName, streamTypeValue, selectedRegion)

getStreamRtmpConfig = async(streamId) =>{
  try{
      let result= await axios.get(`${castrBaseUrl}/streams/${streamId}/ingest`, {headers});
      console.log("getStreamRtmpConfig",result)
      return result

  } catch (error) {
     console.log("errors",error);
  }     
  
} 
const streamId='60a6548be3414ce54aa8a67a';
//getStreamRtmpConfig(streamId)

getAllStreams = async() => {
  try{
      let result= await axios.get(`${castrBaseUrl}/streams`,{headers});
      console.log("get all stream",result)
     return result;

  } catch (error) {
     console.log("errors",error);
  }  
}
//getAllStreams()

 deleteStreamById = async(deleteStreamId) => {
  try{
      await axios.delete(`${castrBaseUrl}/streams/${deleteStreamId}`,{headers});
  } catch (error) {
     console.log("errors",error);
  }  
}
const deleteStreamId="60a6548be3414ce54aa8a67a";
//deleteStreamById(deleteStreamId)

getUserProfile = async() => {
  try{
      let result= await axios.get(`${castrBaseUrl}/user/profile`,{headers});
      console.log("User Profile",result)
     return result;

  } catch (error) {
     console.log("errors",error);
  }  
}
//getUserProfile();

checkCasterApiKey = async(token) => {
  try{
    const headers={'x-api-key': token}
      let result= await axios.get(`${castrBaseUrl}/user/profile`,{headers});
      console.log("API key",result)
     return result;

  } catch (error) {
     console.log("errors",error);
  }  
}
const token='castrkey_91e6aa00-a7e3-11eb-bc86-0b87cf87c323';
//checkCasterApiKey(token)

const PORT =  5000;

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
);