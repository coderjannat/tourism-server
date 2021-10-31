const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u4cly.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




async function run() {
    try {
        await client.connect();
        const database = client.db("Travel");
        const volunteerCollection = database.collection("destinations");
        const ticketsCollection = database.collection("tickets");

          // get app
        app.get('/destinations', async(req, res) => {
            const query = {};
            const result = await volunteerCollection.find(query).toArray();
            res.json(result);
        })

        app.get('/destinations/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await volunteerCollection.findOne(query)
            res.json(result)
        })

        app.post('/destinations', async(req, res) => {
            const service = req.body;
            const result = await volunteerCollection.insertOne(service)
            res.json(result)
        })

        // Tickets
        app.post("/tickets", async (req, res) => {
            console.log(req.body);
            const result = await ticketsCollection.insertOne(req.body);
            res.send(result);
          });

          app.get("/mytickets/:email", async (req, res) => {
            const result = await ticketsCollection.find({
              email: req.params.email,
            }).toArray();
            res.send(result);
          });

          app.get("/alltickets", async (req, res) => {
            const result = await ticketsCollection.find({}).toArray();
            res.send(result);
            console.log(result);
          });
          
          app.get('/tickets/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ticketsCollection.findOne(query)
            res.json(result)
        })
          

          app.delete("/deletetickets/:id", async (req, res) => {
            console.log(req.params.id);
            const result = await ticketsCollection.deleteOne({
              _id: ObjectId(req.params.id),
            });
            res.send(result);
          });
        

        app.get('/added/:email', async(req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await categoryCollection.find(query).toArray()
            res.json(result);
        })

        app.delete('/delete/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await categoryCollection.deleteOne(query);
            res.send(result);
        })

        app.get('/allAdded', async(req, res) => {
            const query = {};
            const result = await categoryCollection.find(query).toArray();
            res.json(result);
        })

    } finally {

    }
}
run().catch(console.dir)

// app.get('/', (req, res) => {
//     res.send('this is home page')
// })

app.listen(port, () => {
    console.log('server running on port ' + port);
})






// const express = require('express');
// const cors = require ("cors");
// const app = express();
// const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
// require ('dotenv').config();
// const port = process.env.PORT || 5000;

// // middleware
// app.use(cors());
// app.use(express.json());

// // connect with mongodb
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u4cly.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri);

// // database connection
// async function run() {
//     try {
//       await client.connect();
//       const database = client.db ('Travel');
//       const destinationCollection = database.collection('destinations');
//       const categoryCollection = database.collection("addedCategory");
     
//       app.get('/destinations',async (req,res) =>{
//         const query = {};
//         const result = await destinationCollection.find(query).toArray();
//         res.json(result);
//         })

//           app.get('/destination/:id', async(req, res) => {
//             const id = req.params.id;
//             const query = { _id: ObjectId(id) };
//             const result = await destinationCollection.findOne(query)
//             res.send(result)
//         })
     

//       app.post('/added', async(req, res) => {
//         const category = req.body;
//         const result = await categoryCollection.insertOne(category)
//         res.send(result)
//     })

//     app.get('/added/:email', async(req, res) => {
//         const email = req.params.email;
//         const query = { email: email };
//         const result = await categoryCollection.find(query).toArray()
//         res.json(result);
//     })

//     app.delete('/delete/:id', async(req, res) => {
//         const id = req.params.id;
//         const query = { _id: ObjectId(id) };
//         const result = await categoryCollection.deleteOne(query);
//         res.send(result);
//     })

//     app.get('/allAdded', async(req, res) => {
//         const query = {};
//         const result = await categoryCollection.find(query).toArray();
//         res.json(result);
//     })
//     } 
//     finally {
//     //   await client.close();
//     }
//   }
//   run().catch(console.dir);



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log('running my port',port)
// })