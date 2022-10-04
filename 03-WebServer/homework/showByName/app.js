var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor

const not_found = fs.readFileSync(__dirname + "/not_found.html");
// Modelo function readFile tipo promise
function readFile(filename) {
  return new Promise((res, rej) => {
    fs.readFile("./images/" + filename, function (err, data) {
      if (err) {
        rej({
          data: not_found,
          contentType: "text/html",
          status: 404,
        });
      } else {
        res({
          data: data,
          contentType: "image/jpeg",
          status: 200,
        });
      }
    });
  });
}
// Escribí acá tu servidor
http
  .createServer(function (req, res) {
    const url = req.url.split("/", 3).pop();
    const error_url = req.url.split("/");
    console.log(url);
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("OK");
    }
    if (error_url.length > 3) {
      res.writeHead(400);
      res.end(not_found);
    } else {
      readFile(url)
        .then((data) => {
          //{data: data,contentType: "image/jpeg",status: 200,}
          res.writeHead(data.status, { "Content-Type": data.contentType });
          res.end(data.data);
        })
        .catch((err) => {
          // {data: "not found",contentType: "text/plain",status: 404,}
          res.writeHead(err.status, { "Content-Type": err.contentType });
          res.end(err.data);
        });
    }
    // if("code_doge.jpg"===url){
    //     const dog = fs.readFileSync(__dirname+'/images/code_doge.jpg')
    //     res.writeHead(200,{'Content-Type':'image/jpeg'})
    //     res.end(dog)
    // }
    // else {
    //   res.writeHead(404, { "Content-Type": "text/plain" });
    //   res.end("not found");
    // }
  })
  .listen(5040, () => {
    console.log("o|O_O|o robot Σωκράτης listening at 5040");
  });
​
// /images/code_doge.jpg