const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(morgan('common')); // let's see what 'common' format looks like

const apps = require('./play-data.js');

app.get('/apps', (req, res) => {
    const { search = "", sort, genre } = req.query;
    
    console.log("request params:", req.query)

    /*if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be one of Rating or App');
        }
      }*/

    if (sort) {
      if (!['Rating', 'App'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of Rating or App');
      }
    
        /*if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
          return res
            .status(400)
            .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card')
               
        }*/
      }

      if (genre) {
              
          if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card',].includes(genre))
          
          {
            return res
              .status(400)
              .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card')
              
          }
        }   

      console.log("passed")

      let results = apps
      .filter(item =>
        item
           .App
           //.toLowerCase()
           )
           //.includes(toLowerCase()));
 
           //.includes(genre.toLowerCase()));
    
    if (sort) {
    results
      .sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
    });
    }
     
    
    if (genre) {
    let selection = req.query.genre;
    console.log("selection;", selection)
    
    pickGenre = (selection) => {
      

      const selectApps = results.filter(num => num.Genres === selection); 
      console.log(selectApps)
      
      return selectApps 
      
    }
    //console.log(pickGenre(selection))
    results = pickGenre(selection)
    
}

       
    res
    .json(results)
});

module.exports = app;
