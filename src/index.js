// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userprofileRoutes from './routes/userprofileRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import { verifyToken } from './middleware/verifyTokenMiddleware.js';
import { verifyUserAccess } from './middleware/userAccessMiddleware.js';
import { checkConnection } from './config/db.js';
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
//Reports
import reportsRoutes from './routes/reportsRoutes.js'
import cors from 'cors'
import path from 'path';
dotenv.config(); // Load variables from .env

import session from 'express-session';

const app = express();// Setup session middleware
// app.use(cors());
app.use(cors({
  origin: process.env.CLIENT_APP_URL,  // ✅ Set your frontend origin explicitly
  credentials: true                // ✅ Allow credentials (cookies, etc.)
}));

// ✅ Add this here BEFORE routes
// app.use((req, res, next) => {
//   const userAgent = req.get('User-Agent') || '';
//   const browserRegex = /(Chrome|Firefox|Safari|Edge|Opera|MSIE|Trident)/i;

//   if (browserRegex.test(userAgent)) {
//     return next();
//   }

//   return res.status(403).json({
//     message: 'Access denied. Mobile apps are not allowed.',
//   });
// });

app.use(cookieParser()); // ✅ Use cookie parser

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON bodies

//Session Setup
app.use(session({
  secret: 'pwxub2sbjapxtx51ipyniexut8lynrfjtfoihkh9b67kdtmnzpxdetgwukrlygh7fmt533m86iv2icmv9selb4ygawqtm3sropm5si19zc5ulv30st1rg3gnlfnp0w2eiktksleoisl909ncy4vfsafluze0jz8wo6xfkxxbwbuqs4t4x613tsh3yg1wj7570hkaxxuqjdhtou2tpkn0kaqpq7fg9wcqgmm455wb0qcdnxmfw3igunlv7r43xmc0',     // replace with a secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
  // resave: false,
  // saveUninitialized: false,
  // cookie: {
  //   secure: false, // true if HTTPS
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 // 1 hour
  // }       // set to true if using HTTPS
}));


// Error middleware
app.use(errorMiddleware);

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
//Reports
app.use('/api/reports', reportsRoutes);

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
app.get("/dashboard", verifyUserAccess, renderWithEnv("dashboard"));
app.get("/ngo", verifyUserAccess, renderWithEnv("ngo"));
app.get("/school", verifyUserAccess, renderWithEnv("school"));
app.get("/district", verifyUserAccess, renderWithEnv("district"));
app.get("/taluka", verifyUserAccess, renderWithEnv("taluka"));
app.get("/village", verifyUserAccess, renderWithEnv("village"));
app.get("/usergroup", verifyUserAccess, renderWithEnv("usergroup"));
app.get("/pagemaster", verifyUserAccess, renderWithEnv("pagemaster"));
app.get("/userprofile", verifyUserAccess, renderWithEnv("userprofile"));
app.get("/intentform", verifyUserAccess, renderWithEnv("intentform"));
app.get("/holiday", verifyUserAccess, renderWithEnv("holiday"));
app.get("/route", verifyUserAccess, renderWithEnv("route"));
//Reports
app.get("/reports", verifyUserAccess, renderWithEnv("reports"));

app.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: 'Lax',
  });
  res.render("logout");
});


app.listen(process.env.PORT, async () => {
  // console.log('Server running on port 3000');
  // try {
  //   await checkConnection();
  //   // await createAllTable();
  // } catch (error) {
  //   console.log("Failed to initialize the database",error);    
  // }
});

