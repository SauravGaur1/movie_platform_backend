const { Router } = require('express');
const router = new Router();
const { getPopularCities, getCitiesByStateId, searchCity, searchCityByLatLong } = require('./controller');
const { isEmpty } = require('../../../utils/validators');

router.get('/', (req, res) => { 

    const { state_id, q,lat,long } = req.query;

    if(!isEmpty(state_id)) {
        getCitiesByStateId(req, res);
    } else if(!isEmpty(q)) {
        searchCity(req, res);
    } else if(!isEmpty(lat) && !isEmpty(long)) {
        searchCityByLatLong(req, res);
    } else {
        getPopularCities(req, res);
    }

});

module.exports = router;