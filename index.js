const path = require('path')
const port = process.env.PORT || 8080
const express = require('express');
const app = express();
const axios = require('axios');

const asBrowser = { headers: { 'User-Agent': 'Mozilla/5.0' } }

app.get('/getImageURL', async (req, res) => {
  try {
    const r = await axios.get(req.query.link, asBrowser)
    const realURL = r.request.res.responseUrl
    const realURLres = await axios.get(realURL, asBrowser)
    const image = realURLres.data
    console.log(image)
    res.send(image)
  } catch (err) { console.log("error: ", err)}
})

app.get('/search', (req, res) => {
  const base = 'https://findit.library.yale.edu/?utf8=%25E2%259C%2593&id=digcoll%253A3455720&utf8=%25E2%259C%2593&search_field=all_fields&q='
  axios
    .get(base + req.query.q)
    .then(response => res.send(response.data))
    .catch(error => res.send(error))
})

app.get('/?*', (req, res) => {
  console.log('/?* called')
  return res.sendFile(path.join(__dirname + `/index.html?${req.query}`))
})

app.listen(port);
console.log(`listening on ${port}`);
