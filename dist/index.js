"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/index.ts
const server_1 = __importDefault(require("./api/server"));
exports.app = server_1.default;
const PORT = process.env.PORT || 3002;
server_1.default.listen(PORT, () => {
    console.log(`BaZi Calculator API server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map