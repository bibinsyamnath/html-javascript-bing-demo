const MAP_API_KEY = 'YOUR_BING_MAP_API_KEY';
const API_BASE_URL = 'https://disease.sh/v2';

let map;

const loadAffectedCountries = async () => {
    await fetch(`${API_BASE_URL}/countries`)
        .then(res => res.json())
        .then(data => data.forEach(c => {

            let loc = new Microsoft.Maps.Location(c['countryInfo'].lat, c['countryInfo'].long);
            let pin = new Microsoft.Maps.Pushpin(loc, {
                color: 'crimson',
                title: c['country'],
                subTitle: `Cases: ${c.cases}\nDeaths: ${c.deaths}\nRecovered: ${c.recovered}`,
            });

            map.entities.push(pin);
        })).catch(reason => console.log(reason));
}

function initMap() {
    map = new Microsoft.Maps.Map('#map', {
        credentials: MAP_API_KEY,
        mapTypeId: Microsoft.Maps.MapTypeId.grayscale,
        zoom: 3,
        showDashboard: false
    });

    loadAffectedCountries();
}


