const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

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
  if(!req.body) return res.sendStatus(400);
  fs.readFile('data/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      
      let find = cart.find(el => parseInt(el.id_product) === parseInt(item.id_product));
      if (find) {
        find.quantity++;
      } else {
        cart.push(item);
      }

      //Файл переписывается целиком
      fs.writeFile('data/cart.json', JSON.stringify(cart, null, 2 ), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});

app.post('/remoteFromCart', (req, res) => {
  if(!req.body) return res.sendStatus(400);
  fs.readFile('data/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      
      let find = cart.find(el => parseInt(el.id_product) === parseInt(item.id_product));
      if(find) {
        if (parseInt(find.quantity) > 1) {
          find.quantity--;
        } else {
          cart.splice(cart.indexOf(find), 1);
        }

        //Файл переписывается целиком
        fs.writeFile('data/cart.json', JSON.stringify(cart, null, 2 ), (err) => {
          if (err) {
            res.send('{"result": 0}');
          } else {
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
