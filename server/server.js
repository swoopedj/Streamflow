require('babel-register');

const express = require('express');
const path = require('path');
// const data_api = require('./api/data-api.js');
const routes = express.Router();
var assetFolder = path.resolve(__dirname, '../public');
// routes.use('/api', data_api);

if(process.env.NODE_ENV !== 'test'){
  const server = express();
  server.use(express.static(assetFolder));
  server.use('/', routes);
  server.get('/*', (req, res) => {
    res.sendFile(assetFolder + '/index.html');
  });

  const port = process.env.PORT || 8080;
  server.listen(port, function(){
    console.log('listening on port '+ port);
  });
} else {
  module.exports = routes;
}
