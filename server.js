const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('./src/db/mongoDB');

const settingsTMDBRoutes = require('./src/routes/TMDB/settingsRoutes');
const moviesTMDBRoutes = require('./src/routes/TMDB/moviesRoutes');
const TVShowsTMDBRoutes = require('./src/routes/TMDB/TVShowsRoutes');
const personsTMDBRoutes = require('./src/routes/TMDB/personsRoutes');
const searchTMDBRoutes = require('./src/routes/TMDB/searchRoutes');
const userRoutes = require('./src/routes/userRoutes');
const actionsRoutes = require('./src/routes/actionsRoutes');
const elementsRoutes = require('./src/routes/elementsRoutes');
const commentsRoutes = require('./src/routes/commentRoutes');
const app = express();

const port = 3000;

const corsOptions = {
  origin: [
    'https://flixhunt-v2.vercel.app',
    'https://flixhunt-api-v2.vercel.app',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const allowedOrigins = ['https://flixhunt-v2.vercel.app'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json('Hello server 🙌');
});
app.use('/api/TMDB/settings', settingsTMDBRoutes);
app.use('/api/TMDB/movies', moviesTMDBRoutes);
app.use('/api/TMDB/tv', TVShowsTMDBRoutes);
app.use('/api/TMDB/persons', personsTMDBRoutes);
app.use('/api/TMDB', searchTMDBRoutes);
app.use('/api/user', userRoutes);
app.use('/api/lists', actionsRoutes);
app.use('/api/elements', elementsRoutes);
app.use('/api/comments', commentsRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
