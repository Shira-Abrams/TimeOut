import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectMongo } from './config/db.js'

import { pageNotFound, serverErrors } from './middleware/handleErrors.js'
import invitationsRouter from './router/invitation.router.js'
import MessagesRouter from './router/message.router.js';
import messageTypeRouter from './router/messageType.router.js';
import pendingUsersRouter from './router/pendingUser.router.js'
import preferencesRouter from './router/preference.router.js';
import websitesRouter from './router/websites.router.js';
import profilesRouter from './router/profile.router.js'
import settingsRouter from './router/settings.router.js';
import usersRouter from './router/user.router.js'
import visitedWebsiteRouter from './router/visitedWebsite.router.js'

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());

dotenv.config();
connectMongo();
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('welcome to time out ');
});


app.use('/users',usersRouter);
app.use('/uploads', express.static('uploads'))
app.use('/preferences', preferencesRouter);
app.use('/websites', WebsitesRouter);
app.use('/vistedWebsite', visitedWebsiteRouter);
app.use('/profiles', profilesRouter);
app.use('/message', MessagesRouter);
app.use('/messageType', messageTypeRouter);
app.use('/invitations', invitationsRouter)
app.use(pageNotFound);
app.use(serverErrors)
let port = process.env.PORT;
app.listen(port, () => {
    console.log(` running at http://localhost:${port}`);
})
app.use('/pendingUsers', pendingUsersRouter);
app.use('/api', settingsRouter);
app.use(pageNotFound);
app.use(serverErrors)


export default app;

