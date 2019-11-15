import {ExtractJwt, Strategy} from "passport-jwt";

export default class passportSocketIoTs {

    constructor() {};

    public authorize(options : any, verify : any, cb: any = null) {
        // --- Begin strategy augmentation ala passport
        let strategy : Strategy = new Strategy(options, verify);

        return (socket : any, accept : any) => {
            strategy.success = function success(user) {
                socket.handshake.user = user;
                accept();
                cb();
            }

            strategy.fail = (info : any) =>{ 
                accept(new Error(info));
                cb(new Error(info));
            }

            strategy.error = (error: any)  => {
                accept(error);
                cb(error);
            }
            // --- End strategy augmentation

            strategy.authenticate(socket.request, {})
        }
    }
}