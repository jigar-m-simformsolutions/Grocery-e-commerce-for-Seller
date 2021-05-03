"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * Hook which synchronously executes a callback when the component is about to unmount.
 *
 * @param callback - Function to call during unmount.
 */
exports.useUnmount = function (callback) {
    var unmountRef = React.useRef(callback);
    unmountRef.current = callback;
    React.useEffect(function () { return function () {
        var _a, _b;
        (_b = (_a = unmountRef).current) === null || _b === void 0 ? void 0 : _b.call(_a);
    }; }, []);
};
//# sourceMappingURL=useUnmount.js.map