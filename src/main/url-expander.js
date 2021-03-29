const expandURL = (url) =>{

    request(
      {
        uri: url,
        followRedirect: false,
      },
      function(err, httpResponse) {
        if (err) {
          return console.error(err)
        }
        console.log(httpResponse.headers.location || uri)
      }
    )
    }
    
    exports.expandURL = expandURL