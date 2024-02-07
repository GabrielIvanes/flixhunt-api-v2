const axios = require('axios');
require('dotenv').config();

const TMDBToken = process.env.TMDB_TOKEN;
const TMDBUrl = process.env.TMDB_URL;

const getDetails = async (req, res) => {
  const personId = req.params.id;

  if (personId) {
    try {
      const response = await axios.get(
        `${TMDBUrl}/person/${personId}?append_to_response=combined_credits`,
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
    res.status(500).json({ message: 'Missing the person id in the query' });
  }
};

module.exports = {
  getDetails,
};
