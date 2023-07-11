const { Router } = require("express");
const {getApiData, getApiDataContinents}=require('../controllers/getCountries');
const {getActivities}=require('../controllers/getActivities');
const {getCountryById}=require('../controllers/getCountrieById');
const {getCountryByName}=require('../controllers/getCountrieByname');
const {postActivity}=require('../controllers/postActivity');


const router = Router();

router.get('/', async(req,res)=>{
    try {
    const list = await getApiData();
    res.status(200).send(list);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar los datos.');
  }
});

router.get('/continent', async(req, res)=>{
  try {
    const {continent} = req.query;
    const countries = await getApiDataContinents(continent);
    res.status(200).send(countries);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al cargar los datos.');
  }
})

router.get('/search', async (req, res) => {
  try {
    const name = req.query.name;
    const countries = await getCountryByName(name);

    if (countries.length === 0) {
      res.status(404).send('No se encontraron países con ese nombre.');
    } else {
      res.send(countries);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar los datos.');
  }
});

router.get('/detail', async(req, res)=>{
  try {
    const {id} = req.query
    const country = await getCountryById(id);
    res.status(200).send(country)
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

router.post('/post-activity', async (req, res)=>{
  try {
    const {name, difficulty, duration, season, id} = req.body;
    await postActivity(name, difficulty, duration, season, id);
    res.status(200).send('todo 200ok');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar los datos.');
  }
});

router.get('/activities', async (req, res)=>{
  try {
    const list = await getActivities();
    res.status(200).send(list);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al cargar los datos.');
  }
});

module.exports = router;
