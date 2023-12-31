require("dotenv").config()
const express=require("express")
const app=express();
const cors=require("cors")
const mongoose=require("mongoose")
const Note=require("./models/note")


app.use(cors());
app.use(express.json());
app.use(express.static('dist'))


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes=>{
      response.json(notes)
    })
  })
  app.get('/api/notes/:id',(request,response)=>{
    Note.findById(request.params.id).then(note=>{
      if(note){
        response.json(note);
      }
      else{
        response.status(404).end()
      }
    })
  })
  app.delete('/api/notes/:id',(request,response)=>{
    const id=Number(request.params.id);
     notes=notes.filter(note=>note.id!==id)
    response.status(204).end()
  })
  const handleId=()=>{
    const maxID=notes.length>0
    ? Math.max(...notes.map(n=>n.id))
    : 0;
    return maxID+1;

  }
 app.post('/api/notes/',(request,response)=>{
  const body=request.body;
  console.log("body:",body)
  if(!body.content){
    response.status(400).json({error:"Content Missing"})
  }
  const note=new Note({
    content:body.content,
    important:body.important || false,
  })
  note.save().then(savedNotes=>{
    response.json(savedNotes)
  })
 })
  
  const PORT = process.env.PORT||3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })