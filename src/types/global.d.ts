export {};

declare global {
    type AnalyticsEventArgs = [event: string, ...args: unknown[]];

    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: Record<string, unknown>[];
        ttq?: {
            track: (...args: AnalyticsEventArgs) => void;
        };
        karrotPixel?: {
            init: (id: string) => void;
            track: (...args: AnalyticsEventArgs) => void;
        };
        wcs_add?: Record<string, any>;
        _nasa?: Record<string, unknown>;
        wcs?: {
            trans?: (conv: { type: string }) => void; // 기존 타입
            inflow?: (domain: string) => void; // 내가 쓰려는 inflow
            cnv?: (type: string, value: string) => unknown;
            do?: () => void;
        };
        wcs_do?: () => void;
    }
}
