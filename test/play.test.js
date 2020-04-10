const { expect } = require('chai')
const supertest = require ('supertest')
const app = require('../app')


describe ('GET/apps', () => {
    it('should return an array of apps /', () => {
        return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        console.log(app)
        expect(app).to.include.all.keys(
        'App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver' 
       );
      }); 
        })
    it('should be 400 if sort is incorrect', () => {
    return supertest(app)
    .get('/apps')
    .query({ sort: 'MISTAKE' })
    .expect(400, 'Sort must be one of Rating or App');
        });

    it('should sort by Rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;
    
            let i = 0;
            // iterate once less than the length of the array
            // because we're comparing 2 items in the array at a time
            while (i < res.body.length - 1) {
                // compare app at `i` with next app at `i + 1`
                const appAtI = res.body[i];
                const appAtIPlus1 = res.body[i + 1];
                // if the next app is more than the book at i,
                if (appAtIPlus1.Rating > appAtI.Rating) {
                // the apps were not sorted correctly
                sorted = false;
                break; // exit the loop
                }
                i++;
            }
            expect(sorted).to.be.true;
            });
        });
        it('should sort by genre selection', () => {
            return supertest(app)
                .get('/apps')
                .query({ genre: 'Strategy' })
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;
        
                for (let i = 0; i < res.body.length - 1; i++) {
                    // compare app at `i` with next app at `i + 1`
                    const genre = res.body[i].Genres;
                    if (! genre === "Strategy") {
                    // the genre selection did not work
                    sorted = false;
                    break; // exit the loop
                    }
                
                }
                expect(sorted).to.be.true;
                });
            });

    }
    )
