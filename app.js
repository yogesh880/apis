const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/event', { useNewUrlParser: true,useUnifiedTopology:true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Event schema
const eventSchema = new mongoose.Schema({
  uid: Number,
  name: String,
  tagline: String,
  schedule: Date,
  description: String,
  files: {
    image: String
  },
  moderator: String,
  category: String,
  sub_category: String,
  rigor_rank: Number,
  attendees: [Number]
});

// Event model
const Event = mongoose.model('Event', eventSchema);

// create event
app.post('/api/v3/app/events', async(req, res) => {
  
  const event = await Event.create(req.body);
      res.status(200).json({ 
        success:true,
        id: event.id 
    });
    
});

// API endpoints
app.get('/api/v3/app/events', async(req, res) => {
    const { id, type, limit, page } = req.query;
  
    if (id) {
        let event= await Event.findById(id);
        if (!event) {
          res.status(404).json({ message: 'Event not found' });
        } else {
          res.json(event);
        }
      
    } else {
      const query = {};
  
      if (type === 'latest') {
        query.schedule = { $gte: new Date() };
      }
  
      let event= await Event.find(query).skip((page - 1) * limit).limit(limit).sort({ schedule: 1 });
          if (!event) {
            res.status(500).json({ message: "event not found" });
          } else {
            res.json(event);
          }
        
    }
  });

  

app.put('/api/v3/app/events/:id', async(req, res) => {
    const event= await Event.findByIdAndUpdate(req.params.id,req.body,)
  
  res.status(200).json({success:true,event})
    
})

app.delete("/api/v3/app/events/:id",async(req,res)=>{
    let id=req.params.id;
    let event= await Event.findByIdAndDelete(id)
    if(event){
        res.status(200).json({
            success:true,
            message:"events deleted successfully",
            event
        })

    }else{
        res.status(500).json({
            success:false,
            message:"events not found"
       
        })
    }
})

app.listen(4500,()=>{
    console.log("server is working... http://localhost:4500")
})