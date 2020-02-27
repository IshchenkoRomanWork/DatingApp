import * as ɵngcc0 from '@angular/core';
export declare class JwtHelperService {
    tokenGetter: () => string;
    constructor(config?: any);
    urlBase64Decode(str: string): string;
    private b64decode;
    private b64DecodeUnicode;
    decodeToken(token?: string): any;
    getTokenExpirationDate(token?: string): Date | null;
    isTokenExpired(token?: string, offsetSeconds?: number): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<JwtHelperService>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<JwtHelperService>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0aGVscGVyLnNlcnZpY2UuZC50cyIsInNvdXJjZXMiOlsiand0aGVscGVyLnNlcnZpY2UuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7O0FBU0E7Iiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlY2xhcmUgY2xhc3MgSnd0SGVscGVyU2VydmljZSB7XG4gICAgdG9rZW5HZXR0ZXI6ICgpID0+IHN0cmluZztcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc/OiBhbnkpO1xuICAgIHVybEJhc2U2NERlY29kZShzdHI6IHN0cmluZyk6IHN0cmluZztcbiAgICBwcml2YXRlIGI2NGRlY29kZTtcbiAgICBwcml2YXRlIGI2NERlY29kZVVuaWNvZGU7XG4gICAgZGVjb2RlVG9rZW4odG9rZW4/OiBzdHJpbmcpOiBhbnk7XG4gICAgZ2V0VG9rZW5FeHBpcmF0aW9uRGF0ZSh0b2tlbj86IHN0cmluZyk6IERhdGUgfCBudWxsO1xuICAgIGlzVG9rZW5FeHBpcmVkKHRva2VuPzogc3RyaW5nLCBvZmZzZXRTZWNvbmRzPzogbnVtYmVyKTogYm9vbGVhbjtcbn1cbiJdfQ==