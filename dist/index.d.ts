import { StrategyOptions, VerifyCallback } from "passport-jwt";
export default class passportSocketIoTs {
    constructor();
    authorize(opt: StrategyOptions, verify: VerifyCallback, cb?: any): (socket: any, accept: any) => void;
}
