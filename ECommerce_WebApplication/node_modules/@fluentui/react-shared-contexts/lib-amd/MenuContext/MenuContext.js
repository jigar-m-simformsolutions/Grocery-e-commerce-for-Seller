define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuContext = React.createContext({});
    exports.useMenuContext = function () {
        return React.useContext(exports.MenuContext);
    };
});
//# sourceMappingURL=MenuContext.js.map