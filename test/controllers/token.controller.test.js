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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chai_2 = __importDefault(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const sinon_chai_1 = __importDefault(require("sinon-chai"));
const token_controller_1 = require("../../src/controllers/token.controller");
const token_service_1 = require("../../src/services/token.service");
chai_2.default.use(sinon_chai_1.default);
describe("TokenController", () => {
    let mockRequest;
    let mockResponse;
    let mockTokenService;
    let tokenController;
    beforeEach(() => {
        mockRequest = {
            body: { username: "", password: "" },
        };
        mockResponse = { status: sinon_1.default.stub().returnsThis(), json: sinon_1.default.stub() };
        mockTokenService = sinon_1.default.createStubInstance(token_service_1.TokenService);
        tokenController = new token_controller_1.TokenController(mockTokenService);
    });
    afterEach(() => {
        sinon_1.default.restore();
    });
    describe("getToken", () => {
        it("should call tokenService.getToken", () => __awaiter(void 0, void 0, void 0, function* () {
            yield tokenController.generateToken(mockRequest, mockResponse);
            (0, chai_1.expect)(mockTokenService.createToken).to.have.been.calledOnceWith({
                username: "",
                password: "",
            });
        }));
        it("should return a 200 status if token generated", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMessage = "token";
            mockTokenService.createToken.resolves(mockMessage);
            yield tokenController.generateToken(mockRequest, mockResponse);
            (0, chai_1.expect)(mockResponse.status).to.have.been.calledOnceWith(200);
            (0, chai_1.expect)(mockResponse.json).to.have.been.calledOnceWith({
                message: "Token was generated.",
            });
        }));
    });
});
