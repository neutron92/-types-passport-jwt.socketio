import {ExtractJwt, Strategy, StrategyOptions, VerifyCallback} from "passport-jwt";

export default class passportSocketIoTs {

    constructor() {};

    public authorize(opt: StrategyOptions, verify: VerifyCallback, cb: any = null) {
        // --- Begin strategy augmentation ala passport
        let strategy : Strategy = new Strategy(opt, verify);

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

            strategy.error = (error: Error)  => {
                accept(error);
                cb(error);
            }
            // --- End strategy augmentation

            strategy.authenticate(socket.request, {})
        }
    }
}