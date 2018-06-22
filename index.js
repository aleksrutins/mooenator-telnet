const Telnet = require('ranvier-telnet');
const server = new Telnet.TelnetServer(rawSocket => {
  const telnetSocket = new Telnet.TelnetSocket();
  telnetSocket.attach(rawSocket);
  let username = new Buffer(""), password = new Buffer("");
  telnetSocket.write("Username: ");
  username = telnetSocket.input(username);
  telnetSocket.write("Password: ");
  password = telnetSocket.input(password);
  if(!(username.toString() === "Master Cow" && password.toString() == "ishallmoo")) {
    telnetSocket.write("Authentication failed.");
    telnetSocket.destroy();
    return;
  }
  telnetSocket.write(`Welcome to my Telnet server!\n
The prompt is based on the original Apple 1 system monitor prompt, although the commands are nothing like in the system monitor:\n
moo     help    ?   quit    exit\n`)
  telnetSocket.write('\\\n')
  telnetSocket.on('data', data => {
    switch(data.toString()) {
        case "moo":
            telnetSocket.write("Right back at ya!\n");
            break;
        case "?":
        case "help":
            telnetSocket.write("Type 'moo', 'quit', or 'exit'.\n")
            break;
        case "quit":
        case "exit":
        telnetSocket.write('Remember to have a healthy moo at 4:20 each day! See ya later, mooenator!');
            telnetSocket.destroy();
            return;
    }
    telnetSocket.write('\\\n')
  });
}).netServer;
 
server.listen(4000);
