import { __assign } from "tslib";
import * as React from 'react';
import { Label } from '../../Label';
import { classNamesFunction, find, getNativeProps, divProperties, setFocusVisibility, } from '../../Utilities';
import { ChoiceGroupOption } from './ChoiceGroupOption/index';
import { useId, useControllableValue, useWarnings } from '@fluentui/react-hooks';
var getClassNames = classNamesFunction();
var getOptionId = function (option, id) {
    return id + "-" + option.key;
};
var findOption = function (options, key) {
    return key === undefined ? undefined : find(options, function (value) { return value.key === key; });
};
var useComponentRef = function (options, keyChecked, id, componentRef) {
    React.useImperativeHandle(componentRef, function () { return ({
        get checkedOption() {
            return findOption(options, keyChecked);
        },
        focus: function () {
            var optionToFocus = findOption(options, keyChecked) || options.filter(function (option) { return !option.disabled; })[0];
            var elementToFocus = optionToFocus && document.getElementById(getOptionId(optionToFocus, id));
            if (elementToFocus) {
                elementToFocus.focus();
                setFocusVisibility(true, elementToFocus);
            }
        },
    }); }, [options, keyChecked, id]);
};
var COMPONENT_NAME = 'ChoiceGroup';
export var ChoiceGroupBase = React.forwardRef(function (props, forwardedRef) {
    var className = props.className, theme = props.theme, styles = props.styles, _a = props.options, options = _a === void 0 ? [] : _a, label = props.label, required = props.required, disabled = props.disabled, name = props.name, defaultSelectedKey = props.defaultSelectedKey, componentRef = props.componentRef, onChange = props.onChange;
    var id = useId('ChoiceGroup');
    var labelId = useId('ChoiceGroupLabel');
    var divProps = getNativeProps(props, divProperties, [
        'onChange',
        'className',
        'required',
    ]);
    var classNames = getClassNames(styles, {
        theme: theme,
        className: className,
        optionsContainIconOrImage: options.some(function (option) { return !!(option.iconProps || option.imageSrc); }),
    });
    var ariaLabelledBy = props.ariaLabelledBy || (label ? labelId : props['aria-labelledby']);
    var _b = useControllableValue(props.selectedKey, defaultSelectedKey), keyChecked = _b[0], setKeyChecked = _b[1];
    var _c = React.useState(), keyFocused = _c[0], setKeyFocused = _c[1];
    useDebugWarnings(props);
    useComponentRef(options, keyChecked, id, componentRef);
    var onFocus = React.useCallback(function (ev, option) {
        var _a, _b;
        if (option) {
            setKeyFocused(option.itemKey);
            (_b = (_a = option).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, ev);
        }
    }, []);
    var onBlur = React.useCallback(function (ev, option) {
        var _a, _b, _c;
        setKeyFocused(undefined);
        (_c = (_a = option) === null || _a === void 0 ? void 0 : (_b = _a).onBlur) === null || _c === void 0 ? void 0 : _c.call(_b, ev);
    }, []);
    var onOptionChange = React.useCallback(function (evt, option) {
        var _a, _b, _c;
        if (!option) {
            return;
        }
        setKeyChecked(option.itemKey);
        (_b = (_a = option).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        (_c = onChange) === null || _c === void 0 ? void 0 : _c(evt, findOption(options, option.itemKey));
    }, [onChange, options, setKeyChecked]);
    return (React.createElement("div", __assign({ className: classNames.root }, divProps, { ref: forwardedRef }),
        React.createElement("div", __assign({ role: "radiogroup" }, (ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy })),
            label && (React.createElement(Label, { className: classNames.label, required: required, id: labelId, disabled: disabled }, label)),
            React.createElement("div", { className: classNames.flexContainer }, options.map(function (option) {
                return (React.createElement(ChoiceGroupOption, __assign({ key: option.key, itemKey: option.key }, option, { onBlur: onBlur, onFocus: onFocus, onChange: onOptionChange, focused: option.key === keyFocused, checked: option.key === keyChecked, disabled: option.disabled || disabled, id: getOptionId(option, id), labelId: option.labelId || labelId + "-" + option.key, name: name || id, required: required })));
            })))));
});
ChoiceGroupBase.displayName = COMPONENT_NAME;
function useDebugWarnings(props) {
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
        useWarnings({
            name: COMPONENT_NAME,
            props: props,
            mutuallyExclusive: {
                selectedKey: 'defaultSelectedKey',
            },
        });
    }
}
//# sourceMappingURL=ChoiceGroup.base.js.map