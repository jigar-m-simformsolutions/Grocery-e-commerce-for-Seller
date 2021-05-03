import * as React from 'react';

export declare const MenuContext: React.Context<MinimalMenuProps>;

/**
 * {@docCategory MenuContext}
 */
export declare type MinimalMenuProps = {
    hidden?: boolean;
    onDismiss?: () => void;
    target?: React.Ref<HTMLElement | undefined>;
};

export declare const useMenuContext: () => MinimalMenuProps;

export { }
