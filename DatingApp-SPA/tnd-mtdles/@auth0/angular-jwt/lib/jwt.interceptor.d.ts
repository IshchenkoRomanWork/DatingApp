import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { JwtHelperService } from './jwthelper.service';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare class JwtInterceptor implements HttpInterceptor {
    jwtHelper: JwtHelperService;
    tokenGetter: () => string | null | Promise<string | null>;
    headerName: string;
    authScheme: string;
    whitelistedDomains: Array<string | RegExp>;
    blacklistedRoutes: Array<string | RegExp>;
    throwNoTokenError: boolean;
    skipWhenExpired: boolean;
    constructor(config: any, jwtHelper: JwtHelperService);
    isWhitelistedDomain(request: HttpRequest<any>): boolean;
    isBlacklistedRoute(request: HttpRequest<any>): boolean;
    handleInterception(token: string | null, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<JwtInterceptor>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<JwtInterceptor>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmludGVyY2VwdG9yLmQudHMiLCJzb3VyY2VzIjpbImp3dC5pbnRlcmNlcHRvci5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQTsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSnd0SGVscGVyU2VydmljZSB9IGZyb20gJy4vand0aGVscGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuZXhwb3J0IGRlY2xhcmUgY2xhc3MgSnd0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICAgIGp3dEhlbHBlcjogSnd0SGVscGVyU2VydmljZTtcbiAgICB0b2tlbkdldHRlcjogKCkgPT4gc3RyaW5nIHwgbnVsbCB8IFByb21pc2U8c3RyaW5nIHwgbnVsbD47XG4gICAgaGVhZGVyTmFtZTogc3RyaW5nO1xuICAgIGF1dGhTY2hlbWU6IHN0cmluZztcbiAgICB3aGl0ZWxpc3RlZERvbWFpbnM6IEFycmF5PHN0cmluZyB8IFJlZ0V4cD47XG4gICAgYmxhY2tsaXN0ZWRSb3V0ZXM6IEFycmF5PHN0cmluZyB8IFJlZ0V4cD47XG4gICAgdGhyb3dOb1Rva2VuRXJyb3I6IGJvb2xlYW47XG4gICAgc2tpcFdoZW5FeHBpcmVkOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogYW55LCBqd3RIZWxwZXI6IEp3dEhlbHBlclNlcnZpY2UpO1xuICAgIGlzV2hpdGVsaXN0ZWREb21haW4ocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IGJvb2xlYW47XG4gICAgaXNCbGFja2xpc3RlZFJvdXRlKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBib29sZWFuO1xuICAgIGhhbmRsZUludGVyY2VwdGlvbih0b2tlbjogc3RyaW5nIHwgbnVsbCwgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PjtcbiAgICBpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+Pjtcbn1cbiJdfQ==