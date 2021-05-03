import * as React from 'react';
import { getWindow } from '@fluentui/utilities';
import { useOnEvent } from '@fluentui/react-hooks';
import { getResponsiveMode, getInitialResponsiveMode } from '../decorators/withResponsiveMode';
import { useWindow } from '../../WindowProvider';
/**
 * Hook to get the current responsive mode (window size category).
 * @param elementRef - Use this element's parent window when determining the responsive mode.
 */
export var useResponsiveMode = function (elementRef) {
    var _a = React.useState(getInitialResponsiveMode), lastResponsiveMode = _a[0], setLastResponsiveMode = _a[1];
    var onResize = React.useCallback(function () {
        var newResponsiveMode = getResponsiveMode(getWindow(elementRef.current));
        // Setting the same value should not cause a re-render.
        if (lastResponsiveMode !== newResponsiveMode) {
            setLastResponsiveMode(newResponsiveMode);
        }
    }, [elementRef, lastResponsiveMode]);
    var win = useWindow();
    useOnEvent(win, 'resize', onResize);
    // Call resize function initially on mount.
    React.useEffect(function () {
        onResize();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only meant to run on mount
    }, []);
    return lastResponsiveMode;
};
//# sourceMappingURL=useResponsiveMode.js.map