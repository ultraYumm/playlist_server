const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const apps = require('./play-data.js');

app.get('/apps', (req, res) => {
    const { search = "", sort, genre } = req.query;
    

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be one of Rating or App');
        }
      }

    if (genre) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
          return res
            .status(400)
            .send('Sort must be one of Action, Puzzle, Strategy, Casual, Arcade or Card')
        }
      }



    let results = apps
            .filter(item =>
              item
                 .App
                 .toLowerCase()
                 .includes(search.toLowerCase()));

 

    
     if (sort) {
        results
        .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
        }            
    
    if (genre) {
            let selection = req.query.genre;
            
            pickGenre = (selection) => {
             
     
             const selectApps = results.filter(num => num.Genres === selection); 
             return selectApps 
            }
            
            pickGenre(selection)
        }
              

    res
    .json(results)
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});