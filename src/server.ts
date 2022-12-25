import express from "express"
import { oauth2Client } from "./client.js";
import driveRoutes from './drive.js'
import { connectToMongo, getDB } from "./db.js";

// connect to mongodb
connectToMongo()

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, auth-token, access_token, Referer, User-Agent, Accept');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  res.setHeader('Access-Control-Allow-Preflight', "true")

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
})

app.use(express.json())

// Routes for the app
app.use('/drive', driveRoutes)

app.get('/', (req, res) => {
  res.send('Hello Express...!!');
})

// Google auth url
app.get('/google', (req, res)=> {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/drive'
    ]
  })

  res.redirect(url)
})

// Google Redirect url ⚠ don't need to visit
app.get('/google/redirect', async (req, res)=> {
  try {
    const code: string|any = req.query.code
    // get tokens from the code sent to us
    const oauth_res = await oauth2Client.getToken(code)
    const { refresh_token, access_token } = oauth_res.tokens

    const tokensJson = {
      "access_token": access_token,
      "refresh_token": refresh_token
    }

    // Refresh token is sent to us when user first time grant access so if it is the first log in to user then we need to store the tokens in our database..
    // Here I use access_token to authenticate user and fetch the refresh token from my db.
    if (refresh_token) {
      await getDB().collection('Users').insertOne(tokensJson)
    }

    res.redirect('http://localhost:5173/redirect?access_token='+access_token+(refresh_token ? `&refresh_token=${refresh_token}` : ''))

  } catch (err) {
    console.log(err);
    res.send("some server error occured..!")
  }
})

app.listen(port, () => {
  console.log(`Example app listening at PORT : ${port}`);
})
