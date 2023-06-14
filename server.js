const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.use(express.static('public'));

app.get('/search', async (req, res) => {
    const { q } = req.query;
    const response = await axios.get('https://www.bing.com/search', {
        params: {
            q,
            count: 10,  // Number of search results to retrieve (max 10)
            setlang: 'en', // Language preference
        },
        headers: {
            'User-Agent': req.headers['user-agent'], // Pass user agent from client request
        },
    });
    const $ = cheerio.load(response.data);
    const links = [];
    $('.b_algo').each((i, el) => {
        const title = $(el).find('h2').text();
        const link = $(el).find('a').attr('href');
        if (title && link) {
            links.push({ title, link });
        }
    });
    res.json(links);
});

app.listen(3000, () => console.log('Server is listening on port 3000.'));
