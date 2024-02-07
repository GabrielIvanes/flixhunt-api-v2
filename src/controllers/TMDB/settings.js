const axios = require('axios');
require('dotenv').config();

const TMDBToken = process.env.TMDB_TOKEN;
const TMDBUrl = process.env.TMDB_URL;

const getBaseUrl = async (req, res) => {
  try {
    const response = await axios.get(`${TMDBUrl}/configuration`, {
      headers: {
        Authorization: `Bearer ${TMDBToken}`,
      },
    });
    return res
      .status(200)
      .json({ baseUrl: response.data.images.secure_base_url });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getBaseUrl,
};
