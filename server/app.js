require('dotenv').config()
const express = require('express')
const app = express();
const connectDB = require('./db/connect');

const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const registerRoutes = require('./routes/register')
const jobsRoutes = require('./routes/jobs')
const webHooksRoute = require('./routes/webHooks');
const authentication = require('./middlewares/authentication')


const errorHandler = require('./middlewares/error-handler')
const notFound = require('./middlewares/not-found')

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);


app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/testing', (req, res) => {
    res.send('han g sahi ha....')
})
app.use(cookieParser());
app.use(xss())
app.use(cors({ credentials: true, origin: process.env.frontend_domain }))
app.use(helmet())
app.use('/api', registerRoutes)
app.use('/api', authentication, jobsRoutes)
app.use('/', webHooksRoute);

app.use(errorHandler)
app.use(notFound)

const port = process.env.PORT || 5000;

const start = async () =>{
     await connectDB(process.env.MONGO_URI)
    console.log("DB is connected!")
    app.listen(port, () => {
        console.log(` server is listening at http://localhost:${port}`)
    })
}

start()
