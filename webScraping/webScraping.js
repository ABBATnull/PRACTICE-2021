const cheerio = require("cheerio"); 
const axios = require("axios");  


axios.get('https://www.delivery-club.ru/krasnoyarsk').then(urlResponse => {
const $ = cheerio.load (urlResponse.data);

 $('a.vendor-item__link').each((i, element) => {
   
     const restaurantLinkBuffer = $(element)
      .attr ('href');

      restaurantLink = 'https://www.delivery-club.ru' + restaurantLinkBuffer;
    const restaurantImageBuffer = $(element)
      .find('span.vendor-item__cover')
      .attr ('data-src');

      restaurantImage = restaurantImageBuffer.slice (
        0, restaurantImageBuffer.indexOf ('?')
        );

    console.log (restaurantImage + '\n' + restaurantLink);
    console.log ('-------------------\n');
  });

  $('span.vendor-item__wrap').each((i, element) => {

    const restaurantName = $(element)
      .find ('h3.vendor-item__title-text')
      .text(); 

    console.log (restaurantName);
    console.log ('-------------------\n');
  });
});
