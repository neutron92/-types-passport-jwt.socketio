A [Socket.IO](https://socket.io/) middleware for authenticating with a [JSON Web Token](http://jwt.io) based on [passport-jwt](https://github.com/themikenicholson/passport-jwt).

This module lets you authenticate socket.io endpoints using a JSON web token. It is
intended to be used to secure endpoints without sessions.

## Example usage


```javascript
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

const passportSocketJWT:passportSocketIoTs = new passportSocketIoTs(options, (jwtPayload : any, done : any) {
  // token is valid 
  // we still can verify the token
    // jwtPayload contains the user ID
  // the user passed is set to socket.request.user

  //You can do what you want
}))

// set the authorization middleware
io.use(passportSocketJWT.authorize(socket, accept));

//if token is valid it will access here 

ioSocket.on('connection', function (socket) {
    // Connection now authenticated to receive further events
    socket.on('ping', function (message) {
        socket.emit('pong', message);
    });
});

```

## Tests

    npm install
    npm test

## Inspiration

* [passport-jwt.socketio](https://github.com/erreina/passport-jwt.socketio)

## Contribute

You are always welcome to open an issue or provide a pull-request!

## License

The [GPL-3.0-or-later](https://www.gnu.org/licenses/gpl-3.0.fr.html)
