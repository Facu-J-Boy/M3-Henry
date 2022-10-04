var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]


function readFile(filename) {
  return new Promise((res, rej) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}
const not_found = fs.readFileSync(__dirname + "/not_found.html");
http
  .createServer(function (req, res) {
    if (req.url === "/") {
      return readFile("./index.html").then((html) => {
        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(html);
      });
    }
    if (req.url === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(beatles));
    }
    // console.log(req.url.substring(0,5))
    if (req.url.substring(0, 5) === "/api/") {
      const search = req.url.split("/", 3).pop();
      const beatle = beatles.filter((e) => encodeURI(e.name) === search); // John Lennon --> John%20Lennon
      if (beatle) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(beatle));
      }
    }
    if (req.url[0] === "/" && req.url.length > 1) {
      // console.log('template beatle')
      const search = req.url.split("/", 2).pop();
      // const beatle = beatles.filter((e) => encodeURI(e.name) === search);// [{}]
      const beatle = beatles.find((e) => encodeURI(e.name) === search);// {}
      console.log(beatle)
      if (!beatle) { // este es para el find
      // if (!beatle.length>0) { // este es para el filter
        // console.log('in error')
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(not_found);
      } else {
        return readFile("./beatle.html").then((html) => {
          // console.log(beatle[0].name);
          // console.log(html);
          // html = html.replace("{name}", beatle[0].name);// este es para el filter
          // html = html.replace("{cumple}", beatle[0].birthdate);
          // html = html.replace("{img}", beatle[0].profilePic);
          html = html.replace("{name}", beatle.name);// este es para el find
          html = html.replace("{cumple}", beatle.birthdate);
          html = html.replace("{img}", beatle.profilePic);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(html);
        });
      }
    }
    // res.writeHead(200, { "Content-Type": "text/plain" });
    // return res.end("the beatles");
  })
  .listen(5040, () => {
    console.log("o|O_O|o robot Σωκράτης listening at 5040");
  });
/*
localhost:1337/ --> info de los beatle (about)
localhost:1337/api --> beatles [{},{},{},{}]  <-- json
localhost:1337/api/George Harrison {name: "George Harrison",...} <-- json
localhost:1337/George Harrison --> template name img
​
*/
