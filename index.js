const express = require('express');

const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//ama-john-dbUser
//WDQAKBILzNK8hiQ6

//middle wire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wfblndv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
  const productCollection = client.db('amaJohn').collection('products');

  app.get('/products',async(req,res)=>{
    const page = parseInt(req.query.page);
    const size =parseInt(req.query.size);
    console.log(page,size);
    const query = {};
    const cursor = productCollection.find(query);
    const products = await cursor.skip(page*size).limit(size).toArray();
    const count = await productCollection.estimatedDocumentCount();
    res.send({count,products});
  });
   
  app.post('/productsByIDS',async(req,res)=>{
    const ids = req.body;
    const objectids = ids.map(id=>ObjectId(id));
    const query = {_id: {$in:objectids}};
    const cursor= productCollection.find(query);
    const products = await cursor.toArray();
    res.send(products);
  })



}finally{

}
}
run().catch(err=>console.error(err));




app.get('/',(req,res)=>{
    res.send('ama john running');
})
app.listen(port,()=>{
    console.log(`ama john running on:${port}`);

})