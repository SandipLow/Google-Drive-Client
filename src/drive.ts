import { drive_v3, google } from "googleapis";
import { oauth2Client, setCredential } from "./client.js";
import { Router } from 'express'

const drive: drive_v3.Drive = google.drive({
    version: "v3",
    auth: oauth2Client
})

const router = Router()

router.use(setCredential)

router.post('/getfiles', async (req, res)=> {
    try {
        const drive_res = await drive.files.list({
            q: '\'root\' in parents and trashed = false'
        })
    
        res.send(drive_res.data)
    } catch (err) {
        console.log(err)
        res.status(300).send("Some server error occured")
    }
})

router.post('/getfiles/:folderId', async (req, res)=> {
    try {
        const drive_res = await drive.files.list({
            q:  `'${req.params.folderId}' in parents and trashed = false`
        })
    
        res.send(drive_res.data)
    } catch (err) {
        console.log(err)
        res.status(403).send("The requested folder may not exist or some server error occured")
    }
})

router.post('/getfile/:fileId', async (req, res)=> {
    const { fileId } = req.params
    try {
        const drive_res = await drive.files.get({ fileId })
    
        res.send(drive_res.data)
    } catch (err) {
        console.log(err)
        res.status(403).send("The requested file may not exist or some server error occured")
    }
})

export default router