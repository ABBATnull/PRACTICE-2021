const cheerio = require("cheerio"); 
const axios = require("axios");  
const fs = require("fs")


 if (fs.existsSync('restaurant_images.json') && (fs.existsSync('restaurant_names.json'))) {
  fs.unlinkSync('restaurant_images.json');
  fs.unlinkSync('restaurant_names.json');
 }

axios.get('https://www.delivery-club.ru/krasnoyarsk').then(urlResponse => {
const $ = cheerio.load (urlResponse.data);

        $('a.vendor-item__link').each((i, element) => {
       
            const restaurantImageBuffer = $(element)
           .find('span.vendor-item__cover')
           .attr ('data-src');

          restaurantImage = restaurantImageBuffer.slice (0, restaurantImageBuffer.indexOf ('?'));
         
      fs.appendFileSync('restaurant_images.json', `\n${restaurantImage}`); //записываем ссылки на фото ресторанов в файл
      });

      $('span.vendor-item__wrap').each((i, element) => {

          const restaurantName = $(element)
          .find ('h3.vendor-item__title-text')
          .text(); 

        fs.appendFileSync('restaurant_names.json', `\n${restaurantName}`); //записываем названия ресторанов в файл
        });
});
