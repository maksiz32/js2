const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const log = require('./log.js');
const _log = log._log;

app.use(express.static('.'));

app.use(bodyParser.json()); // Указываем, что содержимое - JSON

app.get('/catalogData', (req, res) => {
  fs.readFile('data/catalog.json', 'utf-8', (err, data) => {
      if(err){
        res.sendStatus(404, JSON.stringify({result:0, text: err}));
      } else {
        res.send(data);
      }
  })
});

app.get('/basketData', (req, res) => {
  fs.readFile('data/cart.json', 'utf-8', (err, data) => {
      if(err){
        res.sendStatus(404, JSON.stringify({result:0, text: err}));
      } else {
        res.send(data);
      }
  })
});

app.post('/addToCart', (req, res) => {
  let action = '';
  if(!req.body) return res.sendStatus(400);
  fs.readFile('data/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      const unit = item.product_name;
      
      let find = cart.find(el => parseInt(el.id_product) === parseInt(item.id_product));
      if (find) {
        action = 'plus item';
        find.quantity++;
      } else {
        action = 'add item';
        cart.push(item);
      }

      //Файл переписывается целиком
      fs.writeFile('data/cart.json', JSON.stringify(cart, null, 2 ), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          _log(action, unit);
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.delete('/remoteFromCart', (req, res) => {
  let action = '';
  if(!req.body) return res.sendStatus(400);
  fs.readFile('data/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      const unit = item.product_name;
      
      let find = cart.find(el => parseInt(el.id_product) === parseInt(item.id_product));
      if(find) {
        if (parseInt(find.quantity) > 1) {
          action = 'minus item';
          find.quantity--;
        } else {
          action = 'remote item';
          cart.splice(cart.indexOf(find), 1);
        }

        //Файл переписывается целиком
        fs.writeFile('data/cart.json', JSON.stringify(cart, null, 2 ), (err) => {
          if (err) {
            res.send('{"result": 0}');
          } else {
            _log(action, unit);
            res.send('{"result": 1}');
          }
        });
      } else {
        res.send('{"result": 0}');
      }
    }
  });
});

app.listen(3000, () => {
  console.log('server is running on port 3000!');
});
