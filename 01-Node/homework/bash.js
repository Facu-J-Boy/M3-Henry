const commands = require("./commands");
// Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
  var args = data.toString().trim().split(" "); // remueve la nueva línea
  // ['echo','de','siempre'] --> ['de','siempre']
  var cmd = args.shift(); // 'echo'
  function write(data) {
    process.stdout.write(data);
    process.stdout.write("\nprompt > ");
  }
  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](args, write);
  } else {
    write('not found')
  }

  //   if ("pwd" === cmd[0]) {
  //     pwd(cmd,write)
  //   }
  //   if ("date" === cmd[0]) {
  //     date(cmd,write);

  //   }
  //  // console.log(cmd)
  //   if("echo"===cmd[0]){
  //     cmd.shift()
  //     write(cmd.join(" "))
  //   }
});