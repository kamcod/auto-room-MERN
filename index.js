const express = require('express')
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('ab sahi ha....')
})


const port =  process.env.PORT || 5000;

const start = async () =>{
    console.log("DB is connected!")
    app.listen(port, () => {
        console.log(` server is listening at http://localhost:${port}`)
    })
}

start().catch(error => {
    console.error('Error starting the server:', error);
});
