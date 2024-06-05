const movieModel = require('../models/movieModel');
const tvShowModel = require('../models/tv-showModel');
const seasonModel = require('../models/seasonModel');
const episodeModel = require('../models/episodeModel');
const personModel = require('../models/personModel');
const genreModel = require('../models/genreModel');
const providerModel = require('../models/providerModel');

/*
Evolution possible: Regarder la date createdAt et définir un seuil on l'on fait un modifyElement pour remplacer les valeurs
*/

const addMovie = async (req, res) => {
  const {
    backdropPath,
    credits,
    genres,
    TMDBId,
    overview,
    posterPath,
    recommendations,
    date,
    runtime,
    tagline,
    title,
    voteAverage,
    video,
    providers,
    directors,
  } = req.body;

  if (!(TMDBId && title))
    return res.status(404).json('Missing TMDBId or the title of the movie.');
  try {
    const movie = await movieModel.findOne({ TMDBId: TMDBId });

    if (movie) return res.status(204).json('This movie already exist.');

    const newMovie = new movieModel({
      backdropPath: backdropPath,
      credits: credits,
      genres: genres,
      TMDBId: TMDBId,
      overview: overview,
      posterPath: posterPath,
      recommendations: recommendations,
      date: date,
      runtime: runtime,
      tagline: tagline,
      title: title,
      voteAverage: voteAverage,
      video: video,
      providers: providers,
      directors: directors,
    });
    newMovie
      .save()
      .then((movie) => {
        return res
          .status(201)
          .json({ message: 'Movie has been created.', element: movie });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getMovie = async (req, res) => {
  const TMDBId = req.params.id;

  if (!TMDBId) return res.status(404).json('Missing TMDBId');

  try {
    const movie = await movieModel.findOne({ TMDBId: TMDBId });
    if (movie) return res.status(200).json(movie);
    else return res.status(400).json('Movie not found.');
  } catch (err) {
    return res.status(500).json(err);
  }
};

const removeMovie = async (req, res) => {
  const TMDBId = req.body.TMDBId;

  try {
    movieModel.deleteOne({ TMDBId: TMDBId }).then(() => {
      return res
        .status(200)
        .json(`Movie ${TMDBId} has been deleted`)
        .catch((err) => {
          return res.status(400).json(err);
        });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addTvShow = async (req, res) => {
  const {
    backdropPath,
    credits,
    genres,
    TMDBId,
    overview,
    posterPath,
    recommendations,
    firstDate,
    lastDate,
    tagline,
    name,
    voteAverage,
    numberEpisodes,
    numberSeasons,
    video,
    providers,
    creators,
  } = req.body;

  if (!(TMDBId && name))
    return res.status(404).json('Missing TMDBId or the name of the tv show.');
  try {
    const tvShow = await tvShowModel.findOne({ TMDBId: TMDBId });

    if (tvShow) return res.status(204).json('This tv show already exist.');

    const newTVShow = new tvShowModel({
      backdropPath: backdropPath,
      credits: credits,
      genres: genres,
      TMDBId: TMDBId,
      overview: overview,
      posterPath: posterPath,
      recommendations: recommendations,
      firstDate: firstDate,
      lastDate: lastDate,
      tagline: tagline,
      name: name,
      voteAverage: voteAverage,
      numberEpisodes: numberEpisodes,
      numberSeasons: numberSeasons,
      video: video,
      providers: providers,
      creators: creators,
    });
    newTVShow
      .save()
      .then((tvShow) => {
        return res
          .status(201)
          .json({ message: 'TV Show has been created.', element: tvShow });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getTvShow = async (req, res) => {
  const TMDBId = req.params.id;

  if (!TMDBId) return res.status(404).json('Missing TMDBId');

  try {
    const tvShow = await tvShowModel.findOne({ TMDBId: TMDBId });
    if (tvShow) return res.status(200).json(tvShow);
    else return res.status(400).json('TV Show not found.');
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addSeason = async (req, res) => {
  const {
    credits,
    genres,
    TMDBId,
    TMDBTvId,
    overview,
    posterPath,
    date,
    seasonNumber,
    name,
    video,
    providers,
  } = req.body;

  if (!(TMDBId && name))
    return res.status(404).json('Missing TMDBId or the name of the season.');
  try {
    const season = await seasonModel.findOne({ TMDBId: TMDBId });

    if (season) return res.status(204).json('This season already exist.');

    const newSeason = new seasonModel({
      credits: credits,
      genres: genres,
      TMDBId: TMDBId,
      TMDBTvId: TMDBTvId,
      overview: overview,
      posterPath: posterPath,
      date: date,
      seasonNumber: seasonNumber,
      name: name,
      video: video,
      providers: providers,
    });

    newSeason
      .save()
      .then((season) => {
        return res
          .status(201)
          .json({ message: 'Season has been created.', element: season });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getSeason = async (req, res) => {
  const TMDBId = req.params.id;

  if (!TMDBId) return res.status(404).json('Missing TMDBId');

  try {
    const season = await seasonModel.findOne({ TMDBId: TMDBId });
    if (season) return res.status(200).json(season);
    else return res.status(400).json('Season not found.');
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addEpisode = async (req, res) => {
  const {
    credits,
    genres,
    TMDBId,
    TMDBTvId,
    nbSeason,
    overview,
    posterPath,
    date,
    episodeNumber,
    name,
    video,
    images,
  } = req.body;

  console.log(images);

  if (!(TMDBId && name))
    return res.status(404).json('Missing TMDBId or the name of the episode.');
  try {
    const episode = await episodeModel.findOne({ TMDBId: TMDBId });

    if (episode) return res.status(204).json('This episode already exist.');

    const newEpisode = new episodeModel({
      credits: credits,
      genres: genres,
      TMDBId: TMDBId,
      TMDBTvId: TMDBTvId,
      nbSeason: nbSeason,
      overview: overview,
      posterPath: posterPath,
      date: date,
      episodeNumber: episodeNumber,
      name: name,
      video: video,
      images: images,
    });

    newEpisode
      .save()
      .then((episode) => {
        return res
          .status(201)
          .json({ message: 'Episode has been created.', element: episode });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getEpisode = async (req, res) => {
  const TMDBId = req.params.id;

  if (!TMDBId) return res.status(404).json('Missing TMDBId');

  try {
    const episode = await episodeModel.findOne({ TMDBId: TMDBId });
    if (episode) return res.status(200).json(episode);
    else return res.status(400).json('Episode not found.');
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addGenre = async (req, res) => {
  const { id, name, type } = req.body;

  if (!(id && name && type))
    return res.status(404).json('Missing id or name or type');
  try {
    const genre = await genreModel.findOne({ id: id, type: type });
    if (genre) return res.status(204).json('Genre already exist.');
    const newGenre = new genreModel({
      id: id,
      name: name,
      type: type,
    });
    newGenre
      .save()
      .then((genre) => {
        return res
          .status(201)
          .json({ message: 'Genre has been created.', element: genre });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getGenre = async (req, res) => {
  const genreId = req.params.id;

  if (!genreId) return res.status(404).json('Missing genreId');

  try {
    const genre = await genreModel.findOne({ id: genreId });
    if (genre) return res.status(200).json(genre);
    else return res.status(400).json('Genre not found.');
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addProvider = async (req, res) => {
  const { id, name, logoPath } = req.body;

  if (!(id && name && logoPath))
    return res.status(404).json('Missing id or logoPath or type');
  try {
    const provider = await providerModel.findOne({ id: id });
    if (provider) return res.status(204).json('Provider already exist.');
    const newProvider = new providerModel({
      id: id,
      name: name,
      logoPath: logoPath,
    });
    newProvider
      .save()
      .then((provider) => {
        return res
          .status(201)
          .json({ message: 'Provider has been created.', element: provider });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getProvider = async (req, res) => {
  const providerId = req.params.id;

  if (!providerId) return res.status(404).json('Missing providerId');

  try {
    const provider = await providerModel.findOne({ id: providerId });
    if (provider) return res.status(200).json(provider);
    else return res.status(400).json('Provider not found.');
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addPerson = async (req, res) => {
  const { TMDBId, genre, knowForDepartment, name, profilePath, biography } =
    req.body;

  if (!(TMDBId && name)) return res.status(404).json('Missing TMDBId or name');
  try {
    const person = await personModel.findOne({ TMDBId: TMDBId });
    if (person) return res.status(204).json('Person already exist.');

    const newPerson = new personModel({
      TMDBId: TMDBId,
      genre: genre,
      knowForDepartment: knowForDepartment,
      name: name,
      profilePath: profilePath,
      biography: biography,
    });
    newPerson
      .save()
      .then((person) => {
        return res
          .status(201)
          .json({ message: 'Person has been created.', element: person });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getPerson = async (req, res) => {
  const TMDBId = req.params.id;

  if (!TMDBId) return res.status(404).json('Missing TMDBId');

  try {
    const person = await personModel.findOne({ TMDBId: TMDBId });
    if (person) return res.status(200).json(person);
    else return res.status(400).json('Person not found.');
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  addMovie,
  getMovie,
  addTvShow,
  getTvShow,
  addSeason,
  getSeason,
  addEpisode,
  getEpisode,
  addGenre,
  getGenre,
  addProvider,
  getProvider,
  addPerson,
  getPerson,
};
