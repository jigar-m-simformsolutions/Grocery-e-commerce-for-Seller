"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderThemeProvider_1 = require("./renderThemeProvider");
var useThemeProviderState_1 = require("./useThemeProviderState");
var utilities_1 = require("@fluentui/utilities");
/**
 * Returns the ThemeProvider render function and calculated state, given user input, ref, and
 * a set of default prop values.
 */
exports.useThemeProvider = function (props, defaultProps) {
    var state = utilities_1.getPropsWithDefaults(defaultProps, props);
    // Apply changes to state.
    useThemeProviderState_1.useThemeProviderState(state);
    return {
        state: state,
        render: renderThemeProvider_1.renderThemeProvider,
    };
};
//# sourceMappingURL=useThemeProvider.js.map