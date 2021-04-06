const request = require('request')

module.exports = {

    //expand short URL
     expandURL : (url) =>{

        request(
          {
            uri: url,
            followRedirect: false,
          },
          function(err, httpResponse) {
            if (err) {
              throw new Error(err)
            }
            return httpResponse.headers.location || uri
          }
        )
        },



    //trim white space
    trimURL : (url) => {
        return url.replace(/^\s+|\s+$/gm,'');
      }

}