require('babel-register');

const express = require('express');
const path = require('path');
const data_api = require('./api/data-api.js');

// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const ReactRouter = require('react-router-dom');

// const routes = express.Router();
var assetFolder = path.resolve(__dirname, '../public');
// routes.use('/api', data_api);

if(process.env.NODE_ENV !== 'test'){
  const server = express();
  server.use('/api', data_api);
  server.use('/', express.static(assetFolder));
  server.get('/*', (req, res) => {
    res.sendFile(assetFolder + '/index.html');
  });

  const port = process.env.PORT || 8080;
  server.listen(port, function(){
    console.log('listening on port '+ port);
  });
} else {
  // module.exports = routes;
}
