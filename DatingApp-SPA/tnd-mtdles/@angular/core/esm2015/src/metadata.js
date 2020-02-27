/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/metadata.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This indirection is needed to free up Component, etc symbols in the public API
 * to be used by the decorator versions of these annotations.
 */
export { Attribute } from './di';
export { ANALYZE_FOR_ENTRY_COMPONENTS, ContentChild, ContentChildren, Query, ViewChild, ViewChildren } from './metadata/di';
export { Component, Directive, HostBinding, HostListener, Input, Output, Pipe } from './metadata/directives';
export { NgModule } from './metadata/ng_module';
export { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from './metadata/schema';
export { ViewEncapsulation } from './metadata/view';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFDLDRCQUE0QixFQUFFLFlBQVksRUFBeUIsZUFBZSxFQUE0QixLQUFLLEVBQUUsU0FBUyxFQUFzQixZQUFZLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ3ROLE9BQU8sRUFBQyxTQUFTLEVBQXNCLFNBQVMsRUFBc0IsV0FBVyxFQUF3QixZQUFZLEVBQXlCLEtBQUssRUFBa0IsTUFBTSxFQUFtQixJQUFJLEVBQWdCLE1BQU0sdUJBQXVCLENBQUM7QUFDaFAsT0FBTyxFQUFtQyxRQUFRLEVBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDbkcsT0FBTyxFQUFDLHNCQUFzQixFQUFFLGdCQUFnQixFQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBQzNGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIFRoaXMgaW5kaXJlY3Rpb24gaXMgbmVlZGVkIHRvIGZyZWUgdXAgQ29tcG9uZW50LCBldGMgc3ltYm9scyBpbiB0aGUgcHVibGljIEFQSVxuICogdG8gYmUgdXNlZCBieSB0aGUgZGVjb3JhdG9yIHZlcnNpb25zIG9mIHRoZXNlIGFubm90YXRpb25zLlxuICovXG5cbmltcG9ydCB7QXR0cmlidXRlfSBmcm9tICcuL2RpJztcbmltcG9ydCB7Q29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZHJlbn0gZnJvbSAnLi9tZXRhZGF0YS9kaSc7XG5pbXBvcnQge0NvbXBvbmVudCwgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBQaXBlfSBmcm9tICcuL21ldGFkYXRhL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHtEb0Jvb3RzdHJhcCwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJy4vbWV0YWRhdGEvbmdfbW9kdWxlJztcbmltcG9ydCB7U2NoZW1hTWV0YWRhdGF9IGZyb20gJy4vbWV0YWRhdGEvc2NoZW1hJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4vbWV0YWRhdGEvdmlldyc7XG5cbmV4cG9ydCB7QXR0cmlidXRlfSBmcm9tICcuL2RpJztcbmV4cG9ydCB7QWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgRG9DaGVjaywgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnLi9pbnRlcmZhY2UvbGlmZWN5Y2xlX2hvb2tzJztcbmV4cG9ydCB7QU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGREZWNvcmF0b3IsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkcmVuRGVjb3JhdG9yLCBRdWVyeSwgVmlld0NoaWxkLCBWaWV3Q2hpbGREZWNvcmF0b3IsIFZpZXdDaGlsZHJlbiwgVmlld0NoaWxkcmVuRGVjb3JhdG9yfSBmcm9tICcuL21ldGFkYXRhL2RpJztcbmV4cG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnREZWNvcmF0b3IsIERpcmVjdGl2ZSwgRGlyZWN0aXZlRGVjb3JhdG9yLCBIb3N0QmluZGluZywgSG9zdEJpbmRpbmdEZWNvcmF0b3IsIEhvc3RMaXN0ZW5lciwgSG9zdExpc3RlbmVyRGVjb3JhdG9yLCBJbnB1dCwgSW5wdXREZWNvcmF0b3IsIE91dHB1dCwgT3V0cHV0RGVjb3JhdG9yLCBQaXBlLCBQaXBlRGVjb3JhdG9yfSBmcm9tICcuL21ldGFkYXRhL2RpcmVjdGl2ZXMnO1xuZXhwb3J0IHtEb0Jvb3RzdHJhcCwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE5nTW9kdWxlRGVjb3JhdG9yfSBmcm9tICcuL21ldGFkYXRhL25nX21vZHVsZSc7XG5leHBvcnQge0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUEsIFNjaGVtYU1ldGFkYXRhfSBmcm9tICcuL21ldGFkYXRhL3NjaGVtYSc7XG5leHBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuL21ldGFkYXRhL3ZpZXcnO1xuIl19