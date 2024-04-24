const http= require('http');
const fs= require('fs');
const path = require('path');
const {MongoClient} = require('mongodb');
const uri ="mongodb+srv://prashanth:prashanth@atlascluster.ospgyhd.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
const client = new MongoClient(uri);

const server   =http.createServer(async(req,res) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    
      
      };

const connectDB=async()=>{
    try{
        await client.connect();
        console.log("Mongo DB is connected")
    
    }
    catch(e){
        console.log(e)
    }
}
connectDB();

console.log(req.url)
if(req.url === '/'){
    fs.readFile( path.join(__dirname,'public','index.html'),(err,data)=>{

    if (err) throw err;
    res.writeHead(200,{ 'Content-Type' : 'text/html'});
    res.end(data);
    }
 )
 
}
else if(req.url=='/api')
{

    const cursor = client.db("workoutdb").collection("workoutcollections").find({});
    const results = await cursor.toArray();
    //console.log(results);
    const js= (JSON.stringify(results));
    res.writeHead(200,headers)
    console.log(js);
    res.end(js);

}
else{

    res.end("Error - 404")
}

});

const PORT = process.env.PORT || 5959;
server.listen(PORT,() => console.log(`Server is running at port: ${PORT}`));
