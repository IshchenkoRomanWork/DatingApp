import { ModuleWithProviders, Provider } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export interface JwtModuleOptions {
    jwtOptionsProvider?: Provider;
    config?: {
        tokenGetter?: () => string | null | Promise<string | null>;
        headerName?: string;
        authScheme?: string;
        whitelistedDomains?: Array<string | RegExp>;
        blacklistedRoutes?: Array<string | RegExp>;
        throwNoTokenError?: boolean;
        skipWhenExpired?: boolean;
    };
}
export declare class JwtModule {
    constructor(parentModule: JwtModule);
    static forRoot(options: JwtModuleOptions): ModuleWithProviders<JwtModule>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<JwtModule, never, never, never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<JwtModule>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1qd3QubW9kdWxlLmQudHMiLCJzb3VyY2VzIjpbImFuZ3VsYXItand0Lm1vZHVsZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgaW50ZXJmYWNlIEp3dE1vZHVsZU9wdGlvbnMge1xuICAgIGp3dE9wdGlvbnNQcm92aWRlcj86IFByb3ZpZGVyO1xuICAgIGNvbmZpZz86IHtcbiAgICAgICAgdG9rZW5HZXR0ZXI/OiAoKSA9PiBzdHJpbmcgfCBudWxsIHwgUHJvbWlzZTxzdHJpbmcgfCBudWxsPjtcbiAgICAgICAgaGVhZGVyTmFtZT86IHN0cmluZztcbiAgICAgICAgYXV0aFNjaGVtZT86IHN0cmluZztcbiAgICAgICAgd2hpdGVsaXN0ZWREb21haW5zPzogQXJyYXk8c3RyaW5nIHwgUmVnRXhwPjtcbiAgICAgICAgYmxhY2tsaXN0ZWRSb3V0ZXM/OiBBcnJheTxzdHJpbmcgfCBSZWdFeHA+O1xuICAgICAgICB0aHJvd05vVG9rZW5FcnJvcj86IGJvb2xlYW47XG4gICAgICAgIHNraXBXaGVuRXhwaXJlZD86IGJvb2xlYW47XG4gICAgfTtcbn1cbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEp3dE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IocGFyZW50TW9kdWxlOiBKd3RNb2R1bGUpO1xuICAgIHN0YXRpYyBmb3JSb290KG9wdGlvbnM6IEp3dE1vZHVsZU9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEp3dE1vZHVsZT47XG59XG4iXX0=