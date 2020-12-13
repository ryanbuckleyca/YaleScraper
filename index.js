const path = require('path')
const port = process.env.PORT || 8080
const express = require('express');
const app = express();
const axios = require('axios');

const asBrowser = { headers: { 'User-Agent': 'Mozilla/5.0' } }

app.get('/getImageURL', async (req, res) => {
  try {
    const imagePage = await axios.get(req.query.link, asBrowser)
    const realURL = imagePage.request.res.responseUrl
    const realURLres = await axios.get(realURL, asBrowser)
    const hiResFile = realURLres.data
    res.send(hiResFile)
  } 
  catch(err) { 
    res.send(`error: ${err}`)
    console.log('error in /search route: ', err) 
  }
})

app.get('/search', async (req, res) => {
  try {
    const query = req.query.find
    const base = 'https://findit.library.yale.edu/?q='
    const result = await axios.get(base + query, asBrowser)
    const html = result.data
    res.send(html)
  } 
  catch(err) { 
    res.send(`error: ${err}`)
    console.log('error in /search route: ', err) 
  }
})

app.get('/', (req, res) => {
  // TODO: if there are no params, render a form?
  return res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(port);
console.log(`listening on ${port}`);
