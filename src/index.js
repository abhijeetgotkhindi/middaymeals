// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userprofileRoutes from './routes/userprofileRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import { verifyToken } from './middleware/verifyTokenMiddleware.js';
import { checkConnection } from './config/db.js';
// import createAllTable from './utils/dbUtils.js';
import authRoutes from './routes/authRoutes.js'
import menuRoutes from './routes/menuRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import ngoRoutes from './routes/ngoRoutes.js'
import schoolRoutes from './routes/schoolRoutes.js'
import districtRoutes from './routes/districtRoute.js'
import talukaRoutes from './routes/talukaRoutes.js'
import villageRoutes from './routes/villageRoutes.js'
import usergroupRoutes from './routes/usergroupRoutes.js'
import pagemasterRoutes from './routes/pagemasterRoutes.js'
import databaseRoutes from './routes/databaseRoutes.js'
import intentRoutes from './routes/intentRoutes.js'
import holidayRoutes from './routes/holidayRoutes.js'
import routeRoutes from './routes/routeRoutes.js'
import cors from 'cors'
import path from 'path';
dotenv.config(); // Load variables from .env

const app = express();
// app.use(cors());
app.use(cors({
  origin: process.env.CLIENT_APP_URL,  // ✅ Set your frontend origin explicitly
  credentials: true                // ✅ Allow credentials (cookies, etc.)
}));
// Error middleware
app.use(errorMiddleware);
app.use(cookieParser()); // ✅ Use cookie parser

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/api/protected', verifyToken, (req, res) => {
 return res.json({ message: 'This is protected data.' });
});


app.use('/api/userprofile', userprofileRoutes); // Use user routes for API calls
app.use('/api/auth', authRoutes); // Use user routes for API calls
app.use('/api/menu', menuRoutes); // Use user routes for API calls
app.use('/api/dashboard', dashboardRoutes); // Use user routes for API calls
app.use('/api/ngo', ngoRoutes);
app.use('/api/school', schoolRoutes);
app.use('/api/district', districtRoutes);
app.use('/api/taluka', talukaRoutes);
app.use('/api/village', villageRoutes);
app.use('/api/usergroup', usergroupRoutes);
app.use('/api/pagemaster', pagemasterRoutes);
app.use('/api/database', databaseRoutes);
app.use('/api/intent', intentRoutes);
app.use('/api/holiday', holidayRoutes);
app.use('/api/route', routeRoutes);

app.set('views', path.join(process.cwd() + "/src", 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(process.cwd() + "/src", 'public')));

const renderWithEnv = (view) => (req, res) => {
  res.render(view, {
    appurl: process.env.APP_URL,
    // ddValues: req.session.dashboardValues, // uncomment if needed
  });
};

app.get(["/", "/login"], renderWithEnv("login"));
app.get("/dashboard", renderWithEnv("dashboard"));
app.get("/ngo", renderWithEnv("ngo"));
app.get("/school", renderWithEnv("school"));
app.get("/district", renderWithEnv("district"));
app.get("/taluka", renderWithEnv("taluka"));
app.get("/village", renderWithEnv("village"));
app.get("/usergroup", renderWithEnv("usergroup"));
app.get("/pagemaster", renderWithEnv("pagemaster"));
app.get("/userprofile", renderWithEnv("userprofile"));
app.get("/intentform", renderWithEnv("intentform"));
app.get("/holiday", renderWithEnv("holiday"));
app.get("/route", renderWithEnv("route"));

app.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: 'Lax',
  });
  res.render("logout");
});

app.listen(3000, async () => {
  // console.log('Server running on port 3000');
  // try {
  //   await checkConnection();
  //   // await createAllTable();
  // } catch (error) {
  //   console.log("Failed to initialize the database",error);    
  // }
});

