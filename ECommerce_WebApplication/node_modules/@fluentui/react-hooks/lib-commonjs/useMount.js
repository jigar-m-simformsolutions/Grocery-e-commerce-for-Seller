"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * Hook which asynchronously executes a callback once the component has been mounted.
 *
 * @param callback - Function to call before mount.
 */
exports.useMount = function (callback) {
    var mountRef = React.useRef(callback);
    mountRef.current = callback;
    React.useEffect(function () {
        var _a, _b;
        (_b = (_a = mountRef).current) === null || _b === void 0 ? void 0 : _b.call(_a);
    }, []);
};
//# sourceMappingURL=useMount.js.map