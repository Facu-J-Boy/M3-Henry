const fs = require("fs");
const request = require("request");


module.exports = {
  date: function (arg, write) {
    write(Date());
  },
  pwd: function (arg, write) {
    write(process.cwd());
  },
  echo: function (arg, write) {
    write(arg.join(" "));
  },
  ls: function (arg, write) {
    // todos los archivos que hay en nuestra carpeta
    fs.readdir(".", function (err, files) {
      // console.log(files)
      var output = "";
      if (err) return err;
      files.forEach((file, i) => {
        output += file.toString() + "\n";
        // process.stdout.write("\n" + file.toString())
      });
      write(output);
    });
    // console.log(output)

    // var fs = require('fs');
    // Usá fs.readdir
    /*
    [
  'bash.js',
  'commands',
  'package-lock.json',
  'package.json',
  'README.md'
]
    */
  },
  cat: function (arg, write) {
    // obtener todas las líneas de un determinado archivo
    fs.readFile(arg[0], "utf8", (err, data) => {
      if (err) return err;
      write(data);
    });
  },
  head: function (arg, write) {
    // obtener las primeras líneas de un determinado archivo
    fs.readFile(arg[0], "utf8", (err, data) => {
      if (err) return err;
      const lines = data.split("\n"); // ["const commands = require("./commands")", "// Output un prompt"]
      write(lines.slice(0, 4).join("\n"));
    });
  },
  tail: function (arg, write) {
    // obtener las últimas líneas de un determinado archivo
    fs.readFile(arg[0], "utf8", (err, data) => {
      if (err) return err;
      const lines = data.split("\n"); // ["const commands = require("./commands")", "// Output un prompt"]
      write(lines.slice(-4).join("\n"));
    });
  },
  curl: function (arg, write) { // http://www.google.com
    // npm install --save request
    request(arg[0],(err,resp,data)=>{
        if (err) return err;
        write(data)
    })
   // curl le pasamos una url y aplicamos request que nos trae toda
    // la data del doc html
  },
};