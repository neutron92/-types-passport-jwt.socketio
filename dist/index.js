"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport_jwt_1 = require("passport-jwt");
var passportSocketIoTs = /** @class */ (function () {
    function passportSocketIoTs() {
    }
    ;
    passportSocketIoTs.prototype.authorize = function (options, verify, cb) {
        if (cb === void 0) { cb = null; }
        // --- Begin strategy augmentation ala passport
        var strategy = new passport_jwt_1.Strategy(options, verify);
        return function (socket, accept) {
            strategy.success = function success(user) {
                socket.handshake.user = user;
                accept();
                cb();
            };
            strategy.fail = function (info) {
                accept(new Error(info));
                cb(new Error(info));
            };
            strategy.error = function (error) {
                accept(error);
                cb(error);
            };
            // --- End strategy augmentation
            strategy.authenticate(socket.request, {});
        };
    };
    return passportSocketIoTs;
}());
exports.default = passportSocketIoTs;
