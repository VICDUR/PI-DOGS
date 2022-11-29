 //            .========.        .========.
 //           // I .'..' \      // VI.'.,".\
 //           || II .'..'|      || VII..'..|
 //           || III .'."|      || VIII,'.'|
 //           || IV ,','.|      || IX.'".'.|
 //           || V '..'.'|      || X .'..',|
 //           .\_________/      .\_________/
 //           
 //                ,   ,
 //               /////|
 //              ///// |
 //             /////  |
 //            |===| | |
 //            | B | |/|
 //            | I |/| |
 //            | B | | |
 //            | L | | |
 //            | I |  / 
 //            | A | /
 //            |===|/
 //            '---'
 //           
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getApiTemperaments } = require('./src/helpers/getApiDogs.js');







// Syncing all the models at once.
conn.sync({ force: true }).then( () => {
  
  // Precarga de toda la data de item temperament traidos  de la api a la DB --> schema Temperament 
  getApiTemperaments()
  
  server.listen(3001, () => {
   
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
