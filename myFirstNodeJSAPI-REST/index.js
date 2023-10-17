const express = require("express");
const app = express();
app.use(express.json());

const studentsData = [
    {id: 1, name: "Franco", surname: "Ruggieri", age: 22, avg: 9, regular: true},
    {id: 2, name: "Agustin", surname: "Brocani", age: 25, avg: 8, regular: true},
    {id: 3, name: "Federico", surname: "Martucci", age: 22, avg: 10, regular: true},
    {id: 4, name: "Simon", surname: "Bombon", age: 18, avg: 5, regular: false}
];

app.get("/api/students",(req,res) => {
    res.send("My first NodeJS API REST with Express");
});

app.get("/api/students/allStudents",(req,res) => {
    res.status(200).send(studentsData);
});

app.get("/api/students/:id",(req,res) => {
    
    const student = studentsData.find( c => parseInt(req.params.id) == c.id );

    if(!student)
    {
        return res.status(404).send("Student not found");
    }
    else
    {
        return res.send(student);
    }
});

app.post("/api/students",(req,res) => {

    if(studentsData.find( s => s.id === req.body.id))
    {
        return res.status(404).send("Duplicate ID, invalid request");
    }

    const student = {
        id: studentsData.length + 1,
        name: req.body.name,
        surname: req.body.surname,
        age: parseInt(req.body.age),
        avg: parseFloat(req.body.avg),
        regular: (req.body.regular === "true" )
    };

    studentsData.push(student);
    res.send(student);
});

app.delete("/api/students/:id",(req,res) =>{
    
    const student = studentsData.find(c => c.id === parseInt(req.params.id));

    if(!student)
    {
        return res.status(404).send("Student not found");
    }

    const index = studentsData.indexOf(student);
    studentsData.splice(index,1);
    res.status(200).send(student);
});

const port = process.env.port || 80;
app.listen(port,() => console.log(`Listen in ${port} ...`));