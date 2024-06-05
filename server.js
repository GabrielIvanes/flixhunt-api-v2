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

const port = process.env.port || 3000;

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(
    cors({
      origin: true,
      credentials: true,
    })
  )
  .use(cookieParser());

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
