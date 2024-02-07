const axios = require('axios');
require('dotenv').config();

const TMDBToken = process.env.TMDB_TOKEN;
const TMDBUrl = process.env.TMDB_URL;

/**
 * Get all the trending tv shows of the week
 */
const getTrending = async (req, res) => {
  try {
    const response = await axios.get(`${TMDBUrl}/trending/tv/week`, {
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
 * Get the list of official genres for tv shows
 */
const getGenres = async (req, res) => {
  try {
    const response = await axios.get(
      `
${TMDBUrl}/genre/tv/list`,
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
 * Get 20 tv shows based on the genre given in the body sort by popularity
 */
const getTvShowsByGenre = async (req, res) => {
  const genreId = req.params.id;

  if (genreId) {
    try {
      const response = await axios.get(
        `${TMDBUrl}/discover/tv?include_adult=false&sort_by=popularity.desc&with_genres=${genreId}`,
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

/**
 * Get more information about the TV show given in request
 */
const getDetails = async (req, res) => {
  const tvId = req.params.id;
  if (tvId) {
    try {
      const response = await axios.get(
        `${TMDBUrl}/tv/${tvId}?append_to_response=aggregate_credits,watch/providers,recommendations,videos`,
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
          .json({ message: "The TV show given in query doesn't exist " });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json({ message: 'Missing the TV show id in the query' });
  }
};

const getSeasonDetails = async (req, res) => {
  const { id: tvId, nbSeason } = req.params;
  if (tvId && nbSeason) {
    try {
      const response = await axios.get(
        `
${TMDBUrl}/tv/${tvId}/season/${nbSeason}?append_to_response=credits,videos,watch/providers`,
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
    res.status(400).json({
      message:
        'Missing the TV show id or the number of the season in the query',
    });
  }
};

const getEpisodeDetails = async (req, res) => {
  const { id: tvId, nbSeason, nbEpisode } = req.params;
  if (tvId && nbSeason && nbEpisode) {
    try {
      const response = await axios.get(
        `${TMDBUrl}/tv/${tvId}/season/${nbSeason}/episode/${nbEpisode}?append_to_response=credits,videos,images`,
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
    res.status(400).json({
      message:
        'Missing the TV show id or the number of the season or the number of the episode in the query',
    });
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
    let url = `${TMDBUrl}/discover/tv?include_adult=false&page=${page}&sort_by=vote_average.desc&with_genres=${genres}`;

    if (vote_gte) url += `&vote_count.gte=${vote_gte}`;
    if (vote_lte) url += `&vote_count.lte=${vote_lte}`;
    if (rate_gte) url += `&vote_average.gte=${rate_gte}`;
    if (rate_lte) url += `&vote_average.lte=${rate_lte}`;
    if (date) {
      url += `&first_air_date_year
=${date}`;
    } else {
      if (date_gte) url += `&first_air_date.gte=${date_gte}-01-01`;
      if (date_lte) url += `&first_air_date.lte=${date_lte}-12-31`;
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
  getTvShowsByGenre,
  getDetails,
  getSeasonDetails,
  getEpisodeDetails,
  getTopRated,
};
