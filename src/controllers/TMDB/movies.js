const axios = require('axios');
require('dotenv').config();

const TMDBToken = process.env.TMDB_TOKEN;
const TMDBUrl = process.env.TMDB_URL;

/**
 * Get all the trending movies of the week
 */
const getTrending = async (req, res) => {
  try {
    const response = await axios.get(`${TMDBUrl}/trending/movie/week`, {
      headers: {
        Authorization: `Bearer ${TMDBToken}`,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * Get the list of official genres for movies
 */
const getGenres = async (req, res) => {
  try {
    const response = await axios.get(`${TMDBUrl}/genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${TMDBToken}`,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * Get 20 movies based on the genre given in the body sort by popularity
 */
const getMoviesByGenre = async (req, res) => {
  const genreId = req.params.id;

  if (genreId) {
    try {
      const response = await axios.get(
        `${TMDBUrl}/discover/movie?include_adult=false&sort_by=popularity.desc&with_genres=${genreId}`,
        {
          headers: {
            Authorization: `Bearer ${TMDBToken}`,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json({ message: 'Missing the genre id in the query' });
  }
};

const getMoviesInTheater = async (req, res) => {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 28);

  const minDateString = `${minDate.getFullYear()}-${(minDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${minDate.getDate().toString().padStart(2, '0')}`;

  const maxDate = new Date();

  const maxDateString = `${maxDate.getFullYear()}-${(maxDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${maxDate.getDate().toString().padStart(2, '0')}`;

  try {
    const response = await axios.get(
      `${TMDBUrl}/discover/movie?include_adult=false&page=1&primary_release_date.gte=${minDateString}&primary_release_date.lte=${maxDateString}&sort_by=popularity.desc&with_release_type=2|3&region=FR`,
      {
        headers: {
          Authorization: `Bearer ${TMDBToken}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * Get more information about the movie given in request
 */
const getDetails = async (req, res) => {
  const movieId = req.params.id;
  if (movieId) {
    try {
      const response = await axios.get(
        `${TMDBUrl}/movie/${movieId}?append_to_response=credits,watch/providers,recommendations,videos`,
        {
          headers: {
            Authorization: `Bearer ${TMDBToken}`,
          },
        }
      );
      if (response.data) {
        res.status(200).json(response.data);
      } else {
        res
          .status(400)
          .json({ message: "The movie given in query doesn't exist" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json({ message: 'Missing the movie id in the query' });
  }
};

const getTopRated = async (req, res) => {
  const {
    page,
    genres,
    date,
    date_gte,
    date_lte,
    vote_gte,
    vote_lte,
    rate_gte,
    rate_lte,
  } = req.body;
  try {
    let url = `${TMDBUrl}/discover/movie?include_adult=false&page=${page}&sort_by=vote_average.desc&with_genres=${genres}`;

    if (vote_gte) url += `&vote_count.gte=${vote_gte}`;
    if (vote_lte) url += `&vote_count.lte=${vote_lte}`;
    if (rate_gte) url += `&vote_average.gte=${rate_gte}`;
    if (rate_lte) url += `&vote_average.lte=${rate_lte}`;
    if (date) {
      url += `&primary_release_year=${date}`;
    } else {
      if (date_gte) url += `&primary_release_date.gte=${date_gte}-01-01`;
      if (date_lte) url += `&primary_release_date.lte=${date_lte}-12-31`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${TMDBToken}`,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getTrending,
  getGenres,
  getMoviesByGenre,
  getDetails,
  getTopRated,
  getMoviesInTheater,
};
