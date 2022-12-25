import { NextFunction, Request, Response } from "express"
import { google } from "googleapis"
import { getDB } from "./db.js"
import secrets from "./secrets.json"

// oauth client for google api
export const oauth2Client = new google.auth.OAuth2(secrets)

// Middleware function to validate access token and set oauth2client refresh token
export const setCredential = async (req: Request, res: Response, next: NextFunction)=> {
    const access_token = req.header('access_token')

    if (!access_token) {
        res.status(403).send("Please validate with token")
        return
    }

    const tokens = await getDB().collection('Users').findOne({ access_token })

    if(!tokens) {
        res.status(403).send("No user found")
        return
    }

    const { refresh_token } = tokens

    oauth2Client.setCredentials({ refresh_token })
    next()
}

