const axios = require('axios');
require('dotenv').config();

const TMDBToken = process.env.TMDB_TOKEN;
const TMDBUrl = process.env.TMDB_URL;

const search = async (req, res) => {
  const { query, type, page } = req.body;
  try {
    const response = await axios.get(
      `${TMDBUrl}/search/${type}?include_adult=false&query=${query}&page=${page}`,
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

module.exports = {
  search,
};
