/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getClosureSafeProperty } from '../../util/property';
/**
 * Construct an `InjectableDef` which defines how a token will be constructed by the DI system, and
 * in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ɵprov` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
 *
 * @codeGenApi
 */
export function ɵɵdefineInjectable(opts) {
    return {
        token: opts.token, providedIn: opts.providedIn || null, factory: opts.factory,
        value: undefined,
    };
}
/**
 * @deprecated in v8, delete after v10. This API should be used only be generated code, and that
 * code should now use ɵɵdefineInjectable instead.
 * @publicApi
 */
export var defineInjectable = ɵɵdefineInjectable;
/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static injector def (`ɵinj`) field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `factory`: an `InjectorType` is an instantiable type, so a zero argument `factory` function to
 *   create the type must be provided. If that factory function needs to inject arguments, it can
 *   use the `inject` function.
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has a `ɵprov` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @publicApi
 */
export function ɵɵdefineInjector(options) {
    return {
        factory: options.factory, providers: options.providers || [], imports: options.imports || [],
    };
}
/**
 * Read the injectable def (`ɵprov`) for `type` in a way which is immune to accidentally reading
 * inherited value.
 *
 * @param type A type which may have its own (non-inherited) `ɵprov`.
 */
export function getInjectableDef(type) {
    return getOwnDefinition(type, type[NG_PROV_DEF]) ||
        getOwnDefinition(type, type[NG_INJECTABLE_DEF]);
}
/**
 * Return `def` only if it is defined directly on `type` and is not inherited from a base
 * class of `type`.
 *
 * The function `Object.hasOwnProperty` is not sufficient to distinguish this case because in older
 * browsers (e.g. IE10) static property inheritance is implemented by copying the properties.
 *
 * Instead, the definition's `token` is compared to the `type`, and if they don't match then the
 * property was not defined directly on the type itself, and was likely inherited. The definition
 * is only returned if the `type` matches the `def.token`.
 */
function getOwnDefinition(type, def) {
    return def && def.token === type ? def : null;
}
/**
 * Read the injectable def (`ɵprov`) for `type` or read the `ɵprov` from one of its ancestors.
 *
 * @param type A type which may have `ɵprov`, via inheritance.
 *
 * @deprecated Will be removed in v10, where an error will occur in the scenario if we find the
 * `ɵprov` on an ancestor only.
 */
export function getInheritedInjectableDef(type) {
    // See `jit/injectable.ts#compileInjectable` for context on NG_PROV_DEF_FALLBACK.
    var def = type && (type[NG_PROV_DEF] || type[NG_INJECTABLE_DEF] ||
        (type[NG_PROV_DEF_FALLBACK] && type[NG_PROV_DEF_FALLBACK]()));
    if (def) {
        var typeName = getTypeName(type);
        // TODO(FW-1307): Re-add ngDevMode when closure can handle it
        // ngDevMode &&
        console.warn("DEPRECATED: DI is instantiating a token \"" + typeName + "\" that inherits its @Injectable decorator but does not provide one itself.\n" +
            ("This will become an error in v10. Please add @Injectable() to the \"" + typeName + "\" class."));
        return def;
    }
    else {
        return null;
    }
}
/** Gets the name of a type, accounting for some cross-browser differences. */
function getTypeName(type) {
    // `Function.prototype.name` behaves differently between IE and other browsers. In most browsers
    // it'll always return the name of the function itself, no matter how many other functions it
    // inherits from. On IE the function doesn't have its own `name` property, but it takes it from
    // the lowest level in the prototype chain. E.g. if we have `class Foo extends Parent` most
    // browsers will evaluate `Foo.name` to `Foo` while IE will return `Parent`. We work around
    // the issue by converting the function to a string and parsing its name out that way via a regex.
    if (type.hasOwnProperty('name')) {
        return type.name;
    }
    var match = ('' + type).match(/^function\s*([^\s(]+)/);
    return match === null ? '' : match[1];
}
/**
 * Read the injector def type in a way which is immune to accidentally reading inherited value.
 *
 * @param type type which may have an injector def (`ɵinj`)
 */
export function getInjectorDef(type) {
    return type && (type.hasOwnProperty(NG_INJ_DEF) || type.hasOwnProperty(NG_INJECTOR_DEF)) ?
        type[NG_INJ_DEF] :
        null;
}
export var NG_PROV_DEF = getClosureSafeProperty({ ɵprov: getClosureSafeProperty });
export var NG_INJ_DEF = getClosureSafeProperty({ ɵinj: getClosureSafeProperty });
// On IE10 properties defined via `defineProperty` won't be inherited by child classes,
// which will break inheriting the injectable definition from a grandparent through an
// undecorated parent class. We work around it by defining a fallback method which will be
// used to retrieve the definition. This should only be a problem in JIT mode, because in
// AOT TypeScript seems to have a workaround for static properties. When inheriting from an
// undecorated parent is no longer supported in v10, this can safely be removed.
export var NG_PROV_DEF_FALLBACK = getClosureSafeProperty({ ɵprovFallback: getClosureSafeProperty });
// We need to keep these around so we can read off old defs if new defs are unavailable
export var NG_INJECTABLE_DEF = getClosureSafeProperty({ ngInjectableDef: getClosureSafeProperty });
export var NG_INJECTOR_DEF = getClosureSafeProperty({ ngInjectorDef: getClosureSafeProperty });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2ludGVyZmFjZS9kZWZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBbUgzRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUksSUFJckM7SUFDQyxPQUFRO1FBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFpQixJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87UUFDaEYsS0FBSyxFQUFFLFNBQVM7S0FDVyxDQUFDO0FBQ3BDLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUM7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBaUU7SUFFaEcsT0FBUTtRQUNOLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFO0tBQzdELENBQUM7QUFDcEMsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFJLElBQVM7SUFDM0MsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBSSxJQUFTLEVBQUUsR0FBdUI7SUFDN0QsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2hELENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLHlCQUF5QixDQUFJLElBQVM7SUFDcEQsaUZBQWlGO0lBQ2pGLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDNUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVuRixJQUFJLEdBQUcsRUFBRTtRQUNQLElBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyw2REFBNkQ7UUFDN0QsZUFBZTtRQUNmLE9BQU8sQ0FBQyxJQUFJLENBQ1IsK0NBQTRDLFFBQVEsa0ZBQThFO2FBQ2xJLHlFQUFzRSxRQUFRLGNBQVUsQ0FBQSxDQUFDLENBQUM7UUFDOUYsT0FBTyxHQUFHLENBQUM7S0FDWjtTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUFFRCw4RUFBOEU7QUFDOUUsU0FBUyxXQUFXLENBQUMsSUFBUztJQUM1QixnR0FBZ0c7SUFDaEcsNkZBQTZGO0lBQzdGLCtGQUErRjtJQUMvRiwyRkFBMkY7SUFDM0YsMkZBQTJGO0lBQzNGLGtHQUFrRztJQUNsRyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2xCO0lBRUQsSUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDekQsT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUksSUFBUztJQUN6QyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsSUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDO0FBQ1gsQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7QUFDbkYsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUVqRix1RkFBdUY7QUFDdkYsc0ZBQXNGO0FBQ3RGLDBGQUEwRjtBQUMxRix5RkFBeUY7QUFDekYsMkZBQTJGO0FBQzNGLGdGQUFnRjtBQUNoRixNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLGFBQWEsRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7QUFFcEcsdUZBQXVGO0FBQ3ZGLE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFHLHNCQUFzQixDQUFDLEVBQUMsZUFBZSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUNuRyxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxhQUFhLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7Z2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0gZnJvbSAnLi4vLi4vdXRpbC9wcm9wZXJ0eSc7XG5pbXBvcnQge0NsYXNzUHJvdmlkZXIsIENvbnN0cnVjdG9yUHJvdmlkZXIsIEV4aXN0aW5nUHJvdmlkZXIsIEZhY3RvcnlQcm92aWRlciwgU3RhdGljQ2xhc3NQcm92aWRlciwgVmFsdWVQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XG5cblxuXG4vKipcbiAqIEluZm9ybWF0aW9uIGFib3V0IGhvdyBhIHR5cGUgb3IgYEluamVjdGlvblRva2VuYCBpbnRlcmZhY2VzIHdpdGggdGhlIERJIHN5c3RlbS5cbiAqXG4gKiBBdCBhIG1pbmltdW0sIHRoaXMgaW5jbHVkZXMgYSBgZmFjdG9yeWAgd2hpY2ggZGVmaW5lcyBob3cgdG8gY3JlYXRlIHRoZSBnaXZlbiB0eXBlIGBUYCwgcG9zc2libHlcbiAqIHJlcXVlc3RpbmcgaW5qZWN0aW9uIG9mIG90aGVyIHR5cGVzIGlmIG5lY2Vzc2FyeS5cbiAqXG4gKiBPcHRpb25hbGx5LCBhIGBwcm92aWRlZEluYCBwYXJhbWV0ZXIgc3BlY2lmaWVzIHRoYXQgdGhlIGdpdmVuIHR5cGUgYmVsb25ncyB0byBhIHBhcnRpY3VsYXJcbiAqIGBJbmplY3RvckRlZmAsIGBOZ01vZHVsZWAsIG9yIGEgc3BlY2lhbCBzY29wZSAoZS5nLiBgJ3Jvb3QnYCkuIEEgdmFsdWUgb2YgYG51bGxgIGluZGljYXRlc1xuICogdGhhdCB0aGUgaW5qZWN0YWJsZSBkb2VzIG5vdCBiZWxvbmcgdG8gYW55IHNjb3BlLlxuICpcbiAqIE5PVEU6IFRoaXMgaXMgYSBwcml2YXRlIHR5cGUgYW5kIHNob3VsZCBub3QgYmUgZXhwb3J0ZWRcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgybXJtUluamVjdGFibGVEZWY8VD4ge1xuICAvKipcbiAgICogU3BlY2lmaWVzIHRoYXQgdGhlIGdpdmVuIHR5cGUgYmVsb25ncyB0byBhIHBhcnRpY3VsYXIgaW5qZWN0b3I6XG4gICAqIC0gYEluamVjdG9yVHlwZWAgc3VjaCBhcyBgTmdNb2R1bGVgLFxuICAgKiAtIGAncm9vdCdgIHRoZSByb290IGluamVjdG9yXG4gICAqIC0gYCdhbnknYCBhbGwgaW5qZWN0b3JzLlxuICAgKiAtIGBudWxsYCwgZG9lcyBub3QgYmVsb25nIHRvIGFueSBpbmplY3Rvci4gTXVzdCBiZSBleHBsaWNpdGx5IGxpc3RlZCBpbiB0aGUgaW5qZWN0b3JcbiAgICogICBgcHJvdmlkZXJzYC5cbiAgICovXG4gIHByb3ZpZGVkSW46IEluamVjdG9yVHlwZTxhbnk+fCdyb290J3wncGxhdGZvcm0nfCdhbnknfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSB0b2tlbiB0byB3aGljaCB0aGlzIGRlZmluaXRpb24gYmVsb25ncy5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgbWF5IG5vdCBiZSB0aGUgc2FtZSBhcyB0aGUgdHlwZSB0aGF0IHRoZSBgZmFjdG9yeWAgd2lsbCBjcmVhdGUuXG4gICAqL1xuICB0b2tlbjogdW5rbm93bjtcblxuICAvKipcbiAgICogRmFjdG9yeSBtZXRob2QgdG8gZXhlY3V0ZSB0byBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGluamVjdGFibGUuXG4gICAqL1xuICBmYWN0b3J5OiAodD86IFR5cGU8YW55PikgPT4gVDtcblxuICAvKipcbiAgICogSW4gYSBjYXNlIG9mIG5vIGV4cGxpY2l0IGluamVjdG9yLCBhIGxvY2F0aW9uIHdoZXJlIHRoZSBpbnN0YW5jZSBvZiB0aGUgaW5qZWN0YWJsZSBpcyBzdG9yZWQuXG4gICAqL1xuICB2YWx1ZTogVHx1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogSW5mb3JtYXRpb24gYWJvdXQgdGhlIHByb3ZpZGVycyB0byBiZSBpbmNsdWRlZCBpbiBhbiBgSW5qZWN0b3JgIGFzIHdlbGwgYXMgaG93IHRoZSBnaXZlbiB0eXBlXG4gKiB3aGljaCBjYXJyaWVzIHRoZSBpbmZvcm1hdGlvbiBzaG91bGQgYmUgY3JlYXRlZCBieSB0aGUgREkgc3lzdGVtLlxuICpcbiAqIEFuIGBJbmplY3RvckRlZmAgY2FuIGltcG9ydCBvdGhlciB0eXBlcyB3aGljaCBoYXZlIGBJbmplY3RvckRlZnNgLCBmb3JtaW5nIGEgZGVlcCBuZXN0ZWRcbiAqIHN0cnVjdHVyZSBvZiBwcm92aWRlcnMgd2l0aCBhIGRlZmluZWQgcHJpb3JpdHkgKGlkZW50aWNhbGx5IHRvIGhvdyBgTmdNb2R1bGVgcyBhbHNvIGhhdmVcbiAqIGFuIGltcG9ydC9kZXBlbmRlbmN5IHN0cnVjdHVyZSkuXG4gKlxuICogTk9URTogVGhpcyBpcyBhIHByaXZhdGUgdHlwZSBhbmQgc2hvdWxkIG5vdCBiZSBleHBvcnRlZFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSDJtcm1SW5qZWN0b3JEZWY8VD4ge1xuICBmYWN0b3J5OiAoKSA9PiBUO1xuXG4gIC8vIFRPRE8oYWx4aHViKTogTmFycm93IGRvd24gdGhlIHR5cGUgaGVyZSBvbmNlIGRlY29yYXRvcnMgcHJvcGVybHkgY2hhbmdlIHRoZSByZXR1cm4gdHlwZSBvZiB0aGVcbiAgLy8gY2xhc3MgdGhleSBhcmUgZGVjb3JhdGluZyAodG8gYWRkIHRoZSDJtXByb3YgcHJvcGVydHkgZm9yIGV4YW1wbGUpLlxuICBwcm92aWRlcnM6IChUeXBlPGFueT58VmFsdWVQcm92aWRlcnxFeGlzdGluZ1Byb3ZpZGVyfEZhY3RvcnlQcm92aWRlcnxDb25zdHJ1Y3RvclByb3ZpZGVyfFxuICAgICAgICAgICAgICBTdGF0aWNDbGFzc1Byb3ZpZGVyfENsYXNzUHJvdmlkZXJ8YW55W10pW107XG5cbiAgaW1wb3J0czogKEluamVjdG9yVHlwZTxhbnk+fEluamVjdG9yVHlwZVdpdGhQcm92aWRlcnM8YW55PilbXTtcbn1cblxuLyoqXG4gKiBBIGBUeXBlYCB3aGljaCBoYXMgYW4gYEluamVjdGFibGVEZWZgIHN0YXRpYyBmaWVsZC5cbiAqXG4gKiBgSW5qZWN0YWJsZURlZlR5cGVgcyBjb250YWluIHRoZWlyIG93biBEZXBlbmRlbmN5IEluamVjdGlvbiBtZXRhZGF0YSBhbmQgYXJlIHVzYWJsZSBpbiBhblxuICogYEluamVjdG9yRGVmYC1iYXNlZCBgU3RhdGljSW5qZWN0b3IuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7XG4gIC8qKlxuICAgKiBPcGFxdWUgdHlwZSB3aG9zZSBzdHJ1Y3R1cmUgaXMgaGlnaGx5IHZlcnNpb24gZGVwZW5kZW50LiBEbyBub3QgcmVseSBvbiBhbnkgcHJvcGVydGllcy5cbiAgICovXG4gIMm1cHJvdjogbmV2ZXI7XG59XG5cbi8qKlxuICogQSB0eXBlIHdoaWNoIGhhcyBhbiBgSW5qZWN0b3JEZWZgIHN0YXRpYyBmaWVsZC5cbiAqXG4gKiBgSW5qZWN0b3JEZWZUeXBlc2AgY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIGEgYFN0YXRpY0luamVjdG9yYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0b3JUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7XG4gIC8qKlxuICAgKiBPcGFxdWUgdHlwZSB3aG9zZSBzdHJ1Y3R1cmUgaXMgaGlnaGx5IHZlcnNpb24gZGVwZW5kZW50LiBEbyBub3QgcmVseSBvbiBhbnkgcHJvcGVydGllcy5cbiAgICovXG4gIMm1aW5qOiBuZXZlcjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGBJbmplY3RvckRlZmAgZXF1aXZhbGVudCBvZiBhIGBNb2R1bGVXaXRoUHJvdmlkZXJzYCwgYW4gYEluamVjdG9yRGVmVHlwZWAgd2l0aCBhblxuICogYXNzb2NpYXRlZCBhcnJheSBvZiBwcm92aWRlcnMuXG4gKlxuICogT2JqZWN0cyBvZiB0aGlzIHR5cGUgY2FuIGJlIGxpc3RlZCBpbiB0aGUgaW1wb3J0cyBzZWN0aW9uIG9mIGFuIGBJbmplY3RvckRlZmAuXG4gKlxuICogTk9URTogVGhpcyBpcyBhIHByaXZhdGUgdHlwZSBhbmQgc2hvdWxkIG5vdCBiZSBleHBvcnRlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdG9yVHlwZVdpdGhQcm92aWRlcnM8VD4ge1xuICBuZ01vZHVsZTogSW5qZWN0b3JUeXBlPFQ+O1xuICBwcm92aWRlcnM/OiAoVHlwZTxhbnk+fFZhbHVlUHJvdmlkZXJ8RXhpc3RpbmdQcm92aWRlcnxGYWN0b3J5UHJvdmlkZXJ8Q29uc3RydWN0b3JQcm92aWRlcnxcbiAgICAgICAgICAgICAgIFN0YXRpY0NsYXNzUHJvdmlkZXJ8Q2xhc3NQcm92aWRlcnxhbnlbXSlbXTtcbn1cblxuXG4vKipcbiAqIENvbnN0cnVjdCBhbiBgSW5qZWN0YWJsZURlZmAgd2hpY2ggZGVmaW5lcyBob3cgYSB0b2tlbiB3aWxsIGJlIGNvbnN0cnVjdGVkIGJ5IHRoZSBESSBzeXN0ZW0sIGFuZFxuICogaW4gd2hpY2ggaW5qZWN0b3JzIChpZiBhbnkpIGl0IHdpbGwgYmUgYXZhaWxhYmxlLlxuICpcbiAqIFRoaXMgc2hvdWxkIGJlIGFzc2lnbmVkIHRvIGEgc3RhdGljIGDJtXByb3ZgIGZpZWxkIG9uIGEgdHlwZSwgd2hpY2ggd2lsbCB0aGVuIGJlIGFuXG4gKiBgSW5qZWN0YWJsZVR5cGVgLlxuICpcbiAqIE9wdGlvbnM6XG4gKiAqIGBwcm92aWRlZEluYCBkZXRlcm1pbmVzIHdoaWNoIGluamVjdG9ycyB3aWxsIGluY2x1ZGUgdGhlIGluamVjdGFibGUsIGJ5IGVpdGhlciBhc3NvY2lhdGluZyBpdFxuICogICB3aXRoIGFuIGBATmdNb2R1bGVgIG9yIG90aGVyIGBJbmplY3RvclR5cGVgLCBvciBieSBzcGVjaWZ5aW5nIHRoYXQgdGhpcyBpbmplY3RhYmxlIHNob3VsZCBiZVxuICogICBwcm92aWRlZCBpbiB0aGUgYCdyb290J2AgaW5qZWN0b3IsIHdoaWNoIHdpbGwgYmUgdGhlIGFwcGxpY2F0aW9uLWxldmVsIGluamVjdG9yIGluIG1vc3QgYXBwcy5cbiAqICogYGZhY3RvcnlgIGdpdmVzIHRoZSB6ZXJvIGFyZ3VtZW50IGZ1bmN0aW9uIHdoaWNoIHdpbGwgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBpbmplY3RhYmxlLlxuICogICBUaGUgZmFjdG9yeSBjYW4gY2FsbCBgaW5qZWN0YCB0byBhY2Nlc3MgdGhlIGBJbmplY3RvcmAgYW5kIHJlcXVlc3QgaW5qZWN0aW9uIG9mIGRlcGVuZGVuY2llcy5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWRlZmluZUluamVjdGFibGU8VD4ob3B0czoge1xuICB0b2tlbjogdW5rbm93bixcbiAgcHJvdmlkZWRJbj86IFR5cGU8YW55PnwgJ3Jvb3QnIHwgJ3BsYXRmb3JtJyB8ICdhbnknIHwgbnVsbCxcbiAgZmFjdG9yeTogKCkgPT4gVCxcbn0pOiBuZXZlciB7XG4gIHJldHVybiAoe1xuICAgIHRva2VuOiBvcHRzLnRva2VuLCBwcm92aWRlZEluOiBvcHRzLnByb3ZpZGVkSW4gYXMgYW55IHx8IG51bGwsIGZhY3Rvcnk6IG9wdHMuZmFjdG9yeSxcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgfSBhcyDJtcm1SW5qZWN0YWJsZURlZjxUPikgYXMgbmV2ZXI7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgaW4gdjgsIGRlbGV0ZSBhZnRlciB2MTAuIFRoaXMgQVBJIHNob3VsZCBiZSB1c2VkIG9ubHkgYmUgZ2VuZXJhdGVkIGNvZGUsIGFuZCB0aGF0XG4gKiBjb2RlIHNob3VsZCBub3cgdXNlIMm1ybVkZWZpbmVJbmplY3RhYmxlIGluc3RlYWQuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVJbmplY3RhYmxlID0gybXJtWRlZmluZUluamVjdGFibGU7XG5cbi8qKlxuICogQ29uc3RydWN0IGFuIGBJbmplY3RvckRlZmAgd2hpY2ggY29uZmlndXJlcyBhbiBpbmplY3Rvci5cbiAqXG4gKiBUaGlzIHNob3VsZCBiZSBhc3NpZ25lZCB0byBhIHN0YXRpYyBpbmplY3RvciBkZWYgKGDJtWluamApIGZpZWxkIG9uIGEgdHlwZSwgd2hpY2ggd2lsbCB0aGVuIGJlIGFuXG4gKiBgSW5qZWN0b3JUeXBlYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICogYGZhY3RvcnlgOiBhbiBgSW5qZWN0b3JUeXBlYCBpcyBhbiBpbnN0YW50aWFibGUgdHlwZSwgc28gYSB6ZXJvIGFyZ3VtZW50IGBmYWN0b3J5YCBmdW5jdGlvbiB0b1xuICogICBjcmVhdGUgdGhlIHR5cGUgbXVzdCBiZSBwcm92aWRlZC4gSWYgdGhhdCBmYWN0b3J5IGZ1bmN0aW9uIG5lZWRzIHRvIGluamVjdCBhcmd1bWVudHMsIGl0IGNhblxuICogICB1c2UgdGhlIGBpbmplY3RgIGZ1bmN0aW9uLlxuICogKiBgcHJvdmlkZXJzYDogYW4gb3B0aW9uYWwgYXJyYXkgb2YgcHJvdmlkZXJzIHRvIGFkZCB0byB0aGUgaW5qZWN0b3IuIEVhY2ggcHJvdmlkZXIgbXVzdFxuICogICBlaXRoZXIgaGF2ZSBhIGZhY3Rvcnkgb3IgcG9pbnQgdG8gYSB0eXBlIHdoaWNoIGhhcyBhIGDJtXByb3ZgIHN0YXRpYyBwcm9wZXJ0eSAodGhlXG4gKiAgIHR5cGUgbXVzdCBiZSBhbiBgSW5qZWN0YWJsZVR5cGVgKS5cbiAqICogYGltcG9ydHNgOiBhbiBvcHRpb25hbCBhcnJheSBvZiBpbXBvcnRzIG9mIG90aGVyIGBJbmplY3RvclR5cGVgcyBvciBgSW5qZWN0b3JUeXBlV2l0aE1vZHVsZWBzXG4gKiAgIHdob3NlIHByb3ZpZGVycyB3aWxsIGFsc28gYmUgYWRkZWQgdG8gdGhlIGluamVjdG9yLiBMb2NhbGx5IHByb3ZpZGVkIHR5cGVzIHdpbGwgb3ZlcnJpZGVcbiAqICAgcHJvdmlkZXJzIGZyb20gaW1wb3J0cy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZGVmaW5lSW5qZWN0b3Iob3B0aW9uczoge2ZhY3Rvcnk6ICgpID0+IGFueSwgcHJvdmlkZXJzPzogYW55W10sIGltcG9ydHM/OiBhbnlbXX0pOlxuICAgIG5ldmVyIHtcbiAgcmV0dXJuICh7XG4gICAgZmFjdG9yeTogb3B0aW9ucy5mYWN0b3J5LCBwcm92aWRlcnM6IG9wdGlvbnMucHJvdmlkZXJzIHx8IFtdLCBpbXBvcnRzOiBvcHRpb25zLmltcG9ydHMgfHwgW10sXG4gIH0gYXMgybXJtUluamVjdG9yRGVmPGFueT4pIGFzIG5ldmVyO1xufVxuXG4vKipcbiAqIFJlYWQgdGhlIGluamVjdGFibGUgZGVmIChgybVwcm92YCkgZm9yIGB0eXBlYCBpbiBhIHdheSB3aGljaCBpcyBpbW11bmUgdG8gYWNjaWRlbnRhbGx5IHJlYWRpbmdcbiAqIGluaGVyaXRlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gdHlwZSBBIHR5cGUgd2hpY2ggbWF5IGhhdmUgaXRzIG93biAobm9uLWluaGVyaXRlZCkgYMm1cHJvdmAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmplY3RhYmxlRGVmPFQ+KHR5cGU6IGFueSk6IMm1ybVJbmplY3RhYmxlRGVmPFQ+fG51bGwge1xuICByZXR1cm4gZ2V0T3duRGVmaW5pdGlvbih0eXBlLCB0eXBlW05HX1BST1ZfREVGXSkgfHxcbiAgICAgIGdldE93bkRlZmluaXRpb24odHlwZSwgdHlwZVtOR19JTkpFQ1RBQkxFX0RFRl0pO1xufVxuXG4vKipcbiAqIFJldHVybiBgZGVmYCBvbmx5IGlmIGl0IGlzIGRlZmluZWQgZGlyZWN0bHkgb24gYHR5cGVgIGFuZCBpcyBub3QgaW5oZXJpdGVkIGZyb20gYSBiYXNlXG4gKiBjbGFzcyBvZiBgdHlwZWAuXG4gKlxuICogVGhlIGZ1bmN0aW9uIGBPYmplY3QuaGFzT3duUHJvcGVydHlgIGlzIG5vdCBzdWZmaWNpZW50IHRvIGRpc3Rpbmd1aXNoIHRoaXMgY2FzZSBiZWNhdXNlIGluIG9sZGVyXG4gKiBicm93c2VycyAoZS5nLiBJRTEwKSBzdGF0aWMgcHJvcGVydHkgaW5oZXJpdGFuY2UgaXMgaW1wbGVtZW50ZWQgYnkgY29weWluZyB0aGUgcHJvcGVydGllcy5cbiAqXG4gKiBJbnN0ZWFkLCB0aGUgZGVmaW5pdGlvbidzIGB0b2tlbmAgaXMgY29tcGFyZWQgdG8gdGhlIGB0eXBlYCwgYW5kIGlmIHRoZXkgZG9uJ3QgbWF0Y2ggdGhlbiB0aGVcbiAqIHByb3BlcnR5IHdhcyBub3QgZGVmaW5lZCBkaXJlY3RseSBvbiB0aGUgdHlwZSBpdHNlbGYsIGFuZCB3YXMgbGlrZWx5IGluaGVyaXRlZC4gVGhlIGRlZmluaXRpb25cbiAqIGlzIG9ubHkgcmV0dXJuZWQgaWYgdGhlIGB0eXBlYCBtYXRjaGVzIHRoZSBgZGVmLnRva2VuYC5cbiAqL1xuZnVuY3Rpb24gZ2V0T3duRGVmaW5pdGlvbjxUPih0eXBlOiBhbnksIGRlZjogybXJtUluamVjdGFibGVEZWY8VD4pOiDJtcm1SW5qZWN0YWJsZURlZjxUPnxudWxsIHtcbiAgcmV0dXJuIGRlZiAmJiBkZWYudG9rZW4gPT09IHR5cGUgPyBkZWYgOiBudWxsO1xufVxuXG4vKipcbiAqIFJlYWQgdGhlIGluamVjdGFibGUgZGVmIChgybVwcm92YCkgZm9yIGB0eXBlYCBvciByZWFkIHRoZSBgybVwcm92YCBmcm9tIG9uZSBvZiBpdHMgYW5jZXN0b3JzLlxuICpcbiAqIEBwYXJhbSB0eXBlIEEgdHlwZSB3aGljaCBtYXkgaGF2ZSBgybVwcm92YCwgdmlhIGluaGVyaXRhbmNlLlxuICpcbiAqIEBkZXByZWNhdGVkIFdpbGwgYmUgcmVtb3ZlZCBpbiB2MTAsIHdoZXJlIGFuIGVycm9yIHdpbGwgb2NjdXIgaW4gdGhlIHNjZW5hcmlvIGlmIHdlIGZpbmQgdGhlXG4gKiBgybVwcm92YCBvbiBhbiBhbmNlc3RvciBvbmx5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5oZXJpdGVkSW5qZWN0YWJsZURlZjxUPih0eXBlOiBhbnkpOiDJtcm1SW5qZWN0YWJsZURlZjxUPnxudWxsIHtcbiAgLy8gU2VlIGBqaXQvaW5qZWN0YWJsZS50cyNjb21waWxlSW5qZWN0YWJsZWAgZm9yIGNvbnRleHQgb24gTkdfUFJPVl9ERUZfRkFMTEJBQ0suXG4gIGNvbnN0IGRlZiA9IHR5cGUgJiYgKHR5cGVbTkdfUFJPVl9ERUZdIHx8IHR5cGVbTkdfSU5KRUNUQUJMRV9ERUZdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlW05HX1BST1ZfREVGX0ZBTExCQUNLXSAmJiB0eXBlW05HX1BST1ZfREVGX0ZBTExCQUNLXSgpKSk7XG5cbiAgaWYgKGRlZikge1xuICAgIGNvbnN0IHR5cGVOYW1lID0gZ2V0VHlwZU5hbWUodHlwZSk7XG4gICAgLy8gVE9ETyhGVy0xMzA3KTogUmUtYWRkIG5nRGV2TW9kZSB3aGVuIGNsb3N1cmUgY2FuIGhhbmRsZSBpdFxuICAgIC8vIG5nRGV2TW9kZSAmJlxuICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYERFUFJFQ0FURUQ6IERJIGlzIGluc3RhbnRpYXRpbmcgYSB0b2tlbiBcIiR7dHlwZU5hbWV9XCIgdGhhdCBpbmhlcml0cyBpdHMgQEluamVjdGFibGUgZGVjb3JhdG9yIGJ1dCBkb2VzIG5vdCBwcm92aWRlIG9uZSBpdHNlbGYuXFxuYCArXG4gICAgICAgIGBUaGlzIHdpbGwgYmVjb21lIGFuIGVycm9yIGluIHYxMC4gUGxlYXNlIGFkZCBASW5qZWN0YWJsZSgpIHRvIHRoZSBcIiR7dHlwZU5hbWV9XCIgY2xhc3MuYCk7XG4gICAgcmV0dXJuIGRlZjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKiogR2V0cyB0aGUgbmFtZSBvZiBhIHR5cGUsIGFjY291bnRpbmcgZm9yIHNvbWUgY3Jvc3MtYnJvd3NlciBkaWZmZXJlbmNlcy4gKi9cbmZ1bmN0aW9uIGdldFR5cGVOYW1lKHR5cGU6IGFueSk6IHN0cmluZyB7XG4gIC8vIGBGdW5jdGlvbi5wcm90b3R5cGUubmFtZWAgYmVoYXZlcyBkaWZmZXJlbnRseSBiZXR3ZWVuIElFIGFuZCBvdGhlciBicm93c2Vycy4gSW4gbW9zdCBicm93c2Vyc1xuICAvLyBpdCdsbCBhbHdheXMgcmV0dXJuIHRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiBpdHNlbGYsIG5vIG1hdHRlciBob3cgbWFueSBvdGhlciBmdW5jdGlvbnMgaXRcbiAgLy8gaW5oZXJpdHMgZnJvbS4gT24gSUUgdGhlIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIGBuYW1lYCBwcm9wZXJ0eSwgYnV0IGl0IHRha2VzIGl0IGZyb21cbiAgLy8gdGhlIGxvd2VzdCBsZXZlbCBpbiB0aGUgcHJvdG90eXBlIGNoYWluLiBFLmcuIGlmIHdlIGhhdmUgYGNsYXNzIEZvbyBleHRlbmRzIFBhcmVudGAgbW9zdFxuICAvLyBicm93c2VycyB3aWxsIGV2YWx1YXRlIGBGb28ubmFtZWAgdG8gYEZvb2Agd2hpbGUgSUUgd2lsbCByZXR1cm4gYFBhcmVudGAuIFdlIHdvcmsgYXJvdW5kXG4gIC8vIHRoZSBpc3N1ZSBieSBjb252ZXJ0aW5nIHRoZSBmdW5jdGlvbiB0byBhIHN0cmluZyBhbmQgcGFyc2luZyBpdHMgbmFtZSBvdXQgdGhhdCB3YXkgdmlhIGEgcmVnZXguXG4gIGlmICh0eXBlLmhhc093blByb3BlcnR5KCduYW1lJykpIHtcbiAgICByZXR1cm4gdHlwZS5uYW1lO1xuICB9XG5cbiAgY29uc3QgbWF0Y2ggPSAoJycgKyB0eXBlKS5tYXRjaCgvXmZ1bmN0aW9uXFxzKihbXlxccyhdKykvKTtcbiAgcmV0dXJuIG1hdGNoID09PSBudWxsID8gJycgOiBtYXRjaFsxXTtcbn1cblxuLyoqXG4gKiBSZWFkIHRoZSBpbmplY3RvciBkZWYgdHlwZSBpbiBhIHdheSB3aGljaCBpcyBpbW11bmUgdG8gYWNjaWRlbnRhbGx5IHJlYWRpbmcgaW5oZXJpdGVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB0eXBlIHR5cGUgd2hpY2ggbWF5IGhhdmUgYW4gaW5qZWN0b3IgZGVmIChgybVpbmpgKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5qZWN0b3JEZWY8VD4odHlwZTogYW55KTogybXJtUluamVjdG9yRGVmPFQ+fG51bGwge1xuICByZXR1cm4gdHlwZSAmJiAodHlwZS5oYXNPd25Qcm9wZXJ0eShOR19JTkpfREVGKSB8fCB0eXBlLmhhc093blByb3BlcnR5KE5HX0lOSkVDVE9SX0RFRikpID9cbiAgICAgICh0eXBlIGFzIGFueSlbTkdfSU5KX0RFRl0gOlxuICAgICAgbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IE5HX1BST1ZfREVGID0gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eSh7ybVwcm92OiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5leHBvcnQgY29uc3QgTkdfSU5KX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe8m1aW5qOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5cbi8vIE9uIElFMTAgcHJvcGVydGllcyBkZWZpbmVkIHZpYSBgZGVmaW5lUHJvcGVydHlgIHdvbid0IGJlIGluaGVyaXRlZCBieSBjaGlsZCBjbGFzc2VzLFxuLy8gd2hpY2ggd2lsbCBicmVhayBpbmhlcml0aW5nIHRoZSBpbmplY3RhYmxlIGRlZmluaXRpb24gZnJvbSBhIGdyYW5kcGFyZW50IHRocm91Z2ggYW5cbi8vIHVuZGVjb3JhdGVkIHBhcmVudCBjbGFzcy4gV2Ugd29yayBhcm91bmQgaXQgYnkgZGVmaW5pbmcgYSBmYWxsYmFjayBtZXRob2Qgd2hpY2ggd2lsbCBiZVxuLy8gdXNlZCB0byByZXRyaWV2ZSB0aGUgZGVmaW5pdGlvbi4gVGhpcyBzaG91bGQgb25seSBiZSBhIHByb2JsZW0gaW4gSklUIG1vZGUsIGJlY2F1c2UgaW5cbi8vIEFPVCBUeXBlU2NyaXB0IHNlZW1zIHRvIGhhdmUgYSB3b3JrYXJvdW5kIGZvciBzdGF0aWMgcHJvcGVydGllcy4gV2hlbiBpbmhlcml0aW5nIGZyb20gYW5cbi8vIHVuZGVjb3JhdGVkIHBhcmVudCBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGluIHYxMCwgdGhpcyBjYW4gc2FmZWx5IGJlIHJlbW92ZWQuXG5leHBvcnQgY29uc3QgTkdfUFJPVl9ERUZfRkFMTEJBQ0sgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHvJtXByb3ZGYWxsYmFjazogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuXG4vLyBXZSBuZWVkIHRvIGtlZXAgdGhlc2UgYXJvdW5kIHNvIHdlIGNhbiByZWFkIG9mZiBvbGQgZGVmcyBpZiBuZXcgZGVmcyBhcmUgdW5hdmFpbGFibGVcbmV4cG9ydCBjb25zdCBOR19JTkpFQ1RBQkxFX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe25nSW5qZWN0YWJsZURlZjogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuZXhwb3J0IGNvbnN0IE5HX0lOSkVDVE9SX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe25nSW5qZWN0b3JEZWY6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbiJdfQ==