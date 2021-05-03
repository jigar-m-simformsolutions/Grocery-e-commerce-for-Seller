define(["require", "exports", "react", "@fluentui/utilities", "@fluentui/react-hooks", "../decorators/withResponsiveMode", "../../WindowProvider"], function (require, exports, React, utilities_1, react_hooks_1, withResponsiveMode_1, WindowProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Hook to get the current responsive mode (window size category).
     * @param elementRef - Use this element's parent window when determining the responsive mode.
     */
    exports.useResponsiveMode = function (elementRef) {
        var _a = React.useState(withResponsiveMode_1.getInitialResponsiveMode), lastResponsiveMode = _a[0], setLastResponsiveMode = _a[1];
        var onResize = React.useCallback(function () {
            var newResponsiveMode = withResponsiveMode_1.getResponsiveMode(utilities_1.getWindow(elementRef.current));
            // Setting the same value should not cause a re-render.
            if (lastResponsiveMode !== newResponsiveMode) {
                setLastResponsiveMode(newResponsiveMode);
            }
        }, [elementRef, lastResponsiveMode]);
        var win = WindowProvider_1.useWindow();
        react_hooks_1.useOnEvent(win, 'resize', onResize);
        // Call resize function initially on mount.
        React.useEffect(function () {
            onResize();
            // eslint-disable-next-line react-hooks/exhaustive-deps -- only meant to run on mount
        }, []);
        return lastResponsiveMode;
    };
});
//# sourceMappingURL=useResponsiveMode.js.map