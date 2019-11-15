A [Socket.IO](https://socket.io/) middleware for authenticating with a [JSON Web Token](http://jwt.io) based on [passport-jwt](https://github.com/themikenicholson/passport-jwt) and [typeScript](https://github.com/microsoft/TypeScript) .

This module lets you authenticate socket.io endpoints using a JSON web token. It is
intended to be used to secure endpoints without sessions.

## Example usage

### Server
```TypeScript
// Initialize our modules
import socketIO from 'socket.io';
import passportSocketIoTs from "passport-jwt.socketio.ts";

const server = http.createServer(router);

export const ioSocket : socketIO.Server = socketIO(server);

// set the passport-jwt options
const options = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: secret
}

let passSocketIo: passportSocketIoTs = new passportSocketIoTs();

function verify(jwtPayload : any, done : any) {
    // token is valid we still can verify the token
    console.log('jwtPayload', jwtPayload)
    // the user passed is set to socket.request.user
    done(null, jwtPayload)
}

// set the authorization middleware
 ioSocket.use(passSocketIo.authorize(options,verify,(err: any) => {
    // calllback to log errors
 }));

ioSocket.on('connection', function (socket) {
    // Connection now authenticated to receive further events
    socket.on('ping', function (message) {
        socket.emit('pong', message);
    });
});

```

### Client
```html
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
</head>

<body>
    <button onClick="sendMsg()">Hit Me</button>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
    <script>
        const jwt = 'eyJhbGciOiJIU...';

        const socket = io.connect('http://localhost:3001', {
            query: {
                token: jwt // your token
            }
        });

        function sendMsg() {
            socket.emit('messages', 'hello!');
            socket.on('messages', (data) => {
                console.log('authenticate', data)
            });
        }
    </script>
</body>

</html>

```

## Tests

    npm install

## Inspiration

* [passport-jwt.socketio](https://github.com/erreina/passport-jwt.socketio)

## Contribute

You are always welcome to open an issue or provide a pull-request!

## License

The [GPL-3.0-or-later](https://www.gnu.org/licenses/gpl-3.0.fr.html)
