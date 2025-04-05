"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
class TokenController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    generateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.body.username;
                const password = req.body.password;
                if ((yield this.tokenService.createToken({ username, password })) ===
                    "token") {
                    res.status(200).json({ message: "Token was generated." });
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : "An unknown error occured.",
                });
            }
        });
    }
}
exports.TokenController = TokenController;
