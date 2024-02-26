const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const articles = []

app.get('/', (req, res) => {res.json(`Welcome to my News API`)

})

//scraper
app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')
    .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];

        $('a:contains("climate")', html).each(function() {
            const title = $(this).text();
            const url = $(this).attr('href');
            articles.push({ title, url });
        });

        res.json(articles);
    })
    .catch((err) => console.log(err)); // Corrected catch placement and error logging
});

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))
