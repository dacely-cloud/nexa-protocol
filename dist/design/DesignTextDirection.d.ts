/** Base paragraph direction is independent of physical left/center/right alignment. */
export declare const DesignTextDirection: {
    readonly Auto: 'auto';
    readonly Ltr: 'ltr';
    readonly Rtl: 'rtl';
};
export type DesignTextDirection = (typeof DesignTextDirection)[keyof typeof DesignTextDirection];
/** Individual visual runs always have a concrete shaping direction. */
export type DesignResolvedTextDirection = Exclude<DesignTextDirection, typeof DesignTextDirection.Auto>;
