/**
 * @license Angular v9.0.3
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

import { ComponentRef } from '@angular/core';
import { DebugElement } from '@angular/core';
import { DebugNode } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { GetTestability } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { Injector } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { NgProbeToken } from '@angular/core';
import { NgZone } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { PlatformRef } from '@angular/core';
import { Predicate } from '@angular/core';
import { Provider } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { RendererFactory2 } from '@angular/core';
import { RendererType2 } from '@angular/core';
import { Sanitizer } from '@angular/core';
import { SecurityContext } from '@angular/core';
import { StaticProvider } from '@angular/core';
import { Testability } from '@angular/core';
import { TestabilityRegistry } from '@angular/core';
import { Type } from '@angular/core';
import { Version } from '@angular/core';
import { ɵConsole } from '@angular/core';
import { ɵDomAdapter } from '@angular/common';
import { ɵgetDOM } from '@angular/common';

/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare class BrowserModule {
    constructor(parentModule: BrowserModule | null);
    /**
     * Configures a browser-based app to transition from a server-rendered app, if
     * one is present on the page.
     *
     * @param params An object containing an identifier for the app to transition.
     * The ID must match between the client and server versions of the app.
     * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
     */
    static withServerTransition(params: {
        appId: string;
    }): ModuleWithProviders<BrowserModule>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<BrowserModule, never, never, [typeof ɵngcc1.CommonModule, typeof ɵngcc0.ApplicationModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<BrowserModule>;
}

/**
 * NgModule to install on the client side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @publicApi
 */
export declare class BrowserTransferStateModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<BrowserTransferStateModule, never, never, never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<BrowserTransferStateModule>;
}

/**
 * Predicates for use with {@link DebugElement}'s query functions.
 *
 * @publicApi
 */
export declare class By {
    /**
     * Match all nodes.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
     */
    static all(): Predicate<DebugNode>;
    /**
     * Match elements by the given CSS selector.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
     */
    static css(selector: string): Predicate<DebugElement>;
    /**
     * Match nodes that have the given directive present.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
     */
    static directive(type: Type<any>): Predicate<DebugNode>;
}

/**
 * Disables Angular tools.
 *
 * @publicApi
 */
export declare function disableDebugTools(): void;

/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](http://g.co/ng/security).
 *
 * @publicApi
 */
export declare abstract class DomSanitizer implements Sanitizer {
    /**
     * Sanitizes a value for use in the given SecurityContext.
     *
     * If value is trusted for the context, this method will unwrap the contained safe value and use
     * it directly. Otherwise, value will be sanitized to be safe in the given context, for example
     * by replacing URLs that have an unsafe protocol part (such as `javascript:`). The implementation
     * is responsible to make sure that the value can definitely be safely used in the given context.
     */
    abstract sanitize(context: SecurityContext, value: SafeValue | string | null): string | null;
    /**
     * Bypass security and trust the given value to be safe HTML. Only use this when the bound HTML
     * is unsafe (e.g. contains `<script>` tags) and the code should be executed. The sanitizer will
     * leave safe HTML intact, so in most situations this method should not be used.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     */
    abstract bypassSecurityTrustHtml(value: string): SafeHtml;
    /**
     * Bypass security and trust the given value to be safe style value (CSS).
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     */
    abstract bypassSecurityTrustStyle(value: string): SafeStyle;
    /**
     * Bypass security and trust the given value to be safe JavaScript.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     */
    abstract bypassSecurityTrustScript(value: string): SafeScript;
    /**
     * Bypass security and trust the given value to be a safe style URL, i.e. a value that can be used
     * in hyperlinks or `<img src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     */
    abstract bypassSecurityTrustUrl(value: string): SafeUrl;
    /**
     * Bypass security and trust the given value to be a safe resource URL, i.e. a location that may
     * be used to load executable code from, like `<script src>`, or `<iframe src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     */
    abstract bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DomSanitizer>;
}

/**
 * Enabled Angular debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 * @publicApi
 */
export declare function enableDebugTools<T>(ref: ComponentRef<T>): ComponentRef<T>;

/**
 * The injection token for the event-manager plug-in service.
 *
 * @publicApi
 */
export declare const EVENT_MANAGER_PLUGINS: InjectionToken<ɵangular_packages_platform_browser_platform_browser_g[]>;

/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */
export declare class EventManager {
    private _zone;
    private _plugins;
    private _eventNameToPlugin;
    /**
     * Initializes an instance of the event-manager service.
     */
    constructor(plugins: ɵangular_packages_platform_browser_platform_browser_g[], _zone: NgZone);
    /**
     * Registers a handler for a specific element and event.
     *
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns  A callback function that can be used to remove the handler.
     */
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    /**
     * Registers a global handler for an event in a target view.
     *
     * @param target A target for global event notifications. One of "window", "document", or "body".
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns A callback function that can be used to remove the handler.
     */
    addGlobalEventListener(target: string, eventName: string, handler: Function): Function;
    /**
     * Retrieves the compilation zone in which event listeners are registered.
     */
    getZone(): NgZone;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<EventManager>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<EventManager>;
}

/**
 * DI token for providing [HammerJS](http://hammerjs.github.io/) support to Angular.
 * @see `HammerGestureConfig`
 *
 * @ngModule HammerModule
 * @publicApi
 */
export declare const HAMMER_GESTURE_CONFIG: InjectionToken<HammerGestureConfig>;

/**
 * Injection token used to provide a {@link HammerLoader} to Angular.
 *
 * @publicApi
 */
export declare const HAMMER_LOADER: InjectionToken<HammerLoader>;

/**
 * An injectable [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
 * for gesture recognition. Configures specific event recognition.
 * @publicApi
 */
export declare class HammerGestureConfig {
    /**
     * A set of supported event names for gestures to be used in Angular.
     * Angular supports all built-in recognizers, as listed in
     * [HammerJS documentation](http://hammerjs.github.io/).
     */
    events: string[];
    /**
    * Maps gesture event names to a set of configuration options
    * that specify overrides to the default values for specific properties.
    *
    * The key is a supported event name to be configured,
    * and the options object contains a set of properties, with override values
    * to be applied to the named recognizer event.
    * For example, to disable recognition of the rotate event, specify
    *  `{"rotate": {"enable": false}}`.
    *
    * Properties that are not present take the HammerJS default values.
    * For information about which properties are supported for which events,
    * and their allowed and default values, see
    * [HammerJS documentation](http://hammerjs.github.io/).
    *
    */
    overrides: {
        [key: string]: Object;
    };
    /**
     * Properties whose default values can be overridden for a given event.
     * Different sets of properties apply to different events.
     * For information about which properties are supported for which events,
     * and their allowed and default values, see
     * [HammerJS documentation](http://hammerjs.github.io/).
     */
    options?: {
        cssProps?: any;
        domEvents?: boolean;
        enable?: boolean | ((manager: any) => boolean);
        preset?: any[];
        touchAction?: string;
        recognizers?: any[];
        inputClass?: any;
        inputTarget?: EventTarget;
    };
    /**
     * Creates a [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
     * and attaches it to a given HTML element.
     * @param element The element that will recognize gestures.
     * @returns A HammerJS event-manager object.
     */
    buildHammer(element: HTMLElement): HammerInstance;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<HammerGestureConfig>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<HammerGestureConfig>;
}

declare interface HammerInstance {
    on(eventName: string, callback?: Function): void;
    off(eventName: string, callback?: Function): void;
    destroy?(): void;
}

/**
 * Function that loads HammerJS, returning a promise that is resolved once HammerJs is loaded.
 *
 * @publicApi
 */
export declare type HammerLoader = () => Promise<void>;

/**
 * Adds support for HammerJS.
 *
 * Import this module at the root of your application so that Angular can work with
 * HammerJS to detect gesture events.
 *
 * Note that applications still need to include the HammerJS script itself. This module
 * simply sets up the coordination layer between HammerJS and Angular's EventManager.
 *
 * @publicApi
 */
export declare class HammerModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<HammerModule, never, never, never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<HammerModule>;
}

/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * Example:
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */
export declare function makeStateKey<T = void>(key: string): StateKey<T>;

/**
 * A service that can be used to get and add meta tags.
 *
 * @publicApi
 */
export declare class Meta {
    private _doc;
    private _dom;
    constructor(_doc: any);
    addTag(tag: MetaDefinition, forceCreation?: boolean): HTMLMetaElement | null;
    addTags(tags: MetaDefinition[], forceCreation?: boolean): HTMLMetaElement[];
    getTag(attrSelector: string): HTMLMetaElement | null;
    getTags(attrSelector: string): HTMLMetaElement[];
    updateTag(tag: MetaDefinition, selector?: string): HTMLMetaElement | null;
    removeTag(attrSelector: string): void;
    removeTagElement(meta: HTMLMetaElement): void;
    private _getOrCreateElement;
    private _setMetaElementAttributes;
    private _parseSelector;
    private _containsAttributes;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Meta>;
}


/**
 * Represents a meta element.
 *
 * @publicApi
 */
export declare type MetaDefinition = {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    id?: string;
    itemprop?: string;
    name?: string;
    property?: string;
    scheme?: string;
    url?: string;
} & {
    [prop: string]: string;
};

/**
 * @publicApi
 */
export declare const platformBrowser: (extraProviders?: StaticProvider[]) => PlatformRef;

/**
 * Marker interface for a value that's safe to use as HTML.
 *
 * @publicApi
 */
export declare interface SafeHtml extends SafeValue {
}

/**
 * Marker interface for a value that's safe to use as a URL to load executable code from.
 *
 * @publicApi
 */
export declare interface SafeResourceUrl extends SafeValue {
}

/**
 * Marker interface for a value that's safe to use as JavaScript.
 *
 * @publicApi
 */
export declare interface SafeScript extends SafeValue {
}

/**
 * Marker interface for a value that's safe to use as style (CSS).
 *
 * @publicApi
 */
export declare interface SafeStyle extends SafeValue {
}

/**
 * Marker interface for a value that's safe to use as a URL linking to a document.
 *
 * @publicApi
 */
export declare interface SafeUrl extends SafeValue {
}

/**
 * Marker interface for a value that's safe to use in a particular context.
 *
 * @publicApi
 */
export declare interface SafeValue {
}

/**
 * A type-safe key to use with `TransferState`.
 *
 * Example:
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */
export declare type StateKey<T> = string & {
    __not_a_string: never;
};

/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * @publicApi
 */
export declare class Title {
    private _doc;
    constructor(_doc: any);
    /**
     * Get the title of the current HTML document.
     */
    getTitle(): string;
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    setTitle(newTitle: string): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Title>;
}

/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * `TransferState` will be available as an injectable token. To use it import
 * `ServerTransferStateModule` on the server and `BrowserTransferStateModule` on the client.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialzied in a
 * non-lossy manner.
 *
 * @publicApi
 */
export declare class TransferState {
    private store;
    private onSerializeCallbacks;
    /**
     * Get the value corresponding to a key. Return `defaultValue` if key is not found.
     */
    get<T>(key: StateKey<T>, defaultValue: T): T;
    /**
     * Set the value corresponding to a key.
     */
    set<T>(key: StateKey<T>, value: T): void;
    /**
     * Remove a key from the store.
     */
    remove<T>(key: StateKey<T>): void;
    /**
     * Test whether a key exists in the store.
     */
    hasKey<T>(key: StateKey<T>): boolean;
    /**
     * Register a callback to provide the value for a key when `toJson` is called.
     */
    onSerialize<T>(key: StateKey<T>, callback: () => T): void;
    /**
     * Serialize the current state of the store to JSON.
     */
    toJson(): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TransferState>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<TransferState>;
}

/**
 * @publicApi
 */
export declare const VERSION: Version;

export declare function ɵangular_packages_platform_browser_platform_browser_a(): ErrorHandler;

export declare function ɵangular_packages_platform_browser_platform_browser_b(): any;

export declare const ɵangular_packages_platform_browser_platform_browser_c: StaticProvider[];

/**
 * Factory to create Meta service.
 */
export declare function ɵangular_packages_platform_browser_platform_browser_d(): Meta;


/**
 * Factory to create Title service.
 */
export declare function ɵangular_packages_platform_browser_platform_browser_e(): Title;

export declare function ɵangular_packages_platform_browser_platform_browser_f(doc: Document, appId: string): TransferState;

export declare abstract class ɵangular_packages_platform_browser_platform_browser_g {
    private _doc;
    constructor(_doc: any);
    manager: EventManager;
    abstract supports(eventName: string): boolean;
    abstract addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    addGlobalEventListener(element: string, eventName: string, handler: Function): Function;
}

/**
 * In View Engine, support for Hammer gestures is built-in by default.
 */
export declare const ɵangular_packages_platform_browser_platform_browser_h: Provider[];

export declare const ɵangular_packages_platform_browser_platform_browser_i: Provider[];

export declare function ɵangular_packages_platform_browser_platform_browser_j(injector: Injector): ɵDomSanitizerImpl;

export declare function ɵangular_packages_platform_browser_platform_browser_k(transitionId: string, document: any, injector: Injector): () => void;

export declare const ɵangular_packages_platform_browser_platform_browser_l: StaticProvider[];

export declare function ɵangular_packages_platform_browser_platform_browser_m(coreTokens: NgProbeToken[]): any;

/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
export declare const ɵangular_packages_platform_browser_platform_browser_n: Provider[];

/**
 * Provides DOM operations in any browser environment.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
export declare abstract class ɵangular_packages_platform_browser_platform_browser_o extends ɵDomAdapter {
    constructor();
    supportsDOMEvents(): boolean;
}

/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @publicApi
 */
export declare const ɵBROWSER_SANITIZATION_PROVIDERS: StaticProvider[];

export declare const ɵBROWSER_SANITIZATION_PROVIDERS__POST_R3__: never[];

/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
export declare class ɵBrowserDomAdapter extends ɵangular_packages_platform_browser_platform_browser_o {
    static makeCurrent(): void;
    getProperty(el: Node, name: string): any;
    log(error: string): void;
    logGroup(error: string): void;
    logGroupEnd(): void;
    onAndCancel(el: Node, evt: any, listener: any): Function;
    dispatchEvent(el: Node, evt: any): void;
    remove(node: Node): Node;
    getValue(el: any): string;
    createElement(tagName: string, doc?: Document): HTMLElement;
    createHtmlDocument(): HTMLDocument;
    getDefaultDocument(): Document;
    isElementNode(node: Node): boolean;
    isShadowRoot(node: any): boolean;
    getGlobalEventTarget(doc: Document, target: string): EventTarget | null;
    getHistory(): History;
    getLocation(): Location;
    getBaseHref(doc: Document): string | null;
    resetBaseElement(): void;
    getUserAgent(): string;
    performanceNow(): number;
    supportsCookies(): boolean;
    getCookie(name: string): string | null;
}

export declare class ɵBrowserGetTestability implements GetTestability {
    static init(): void;
    addToWindow(registry: TestabilityRegistry): void;
    findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean): Testability | null;
}

export declare class ɵDomEventsPlugin extends ɵangular_packages_platform_browser_platform_browser_g {
    constructor(doc: any);
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    removeEventListener(target: any, eventName: string, callback: Function): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ɵDomEventsPlugin>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ɵDomEventsPlugin>;
}

export declare class ɵDomRendererFactory2 implements RendererFactory2 {
    private eventManager;
    private sharedStylesHost;
    private appId;
    private rendererByCompId;
    private defaultRenderer;
    constructor(eventManager: EventManager, sharedStylesHost: ɵDomSharedStylesHost, appId: string);
    createRenderer(element: any, type: RendererType2 | null): Renderer2;
    begin(): void;
    end(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ɵDomRendererFactory2>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ɵDomRendererFactory2>;
}

export declare class ɵDomSanitizerImpl extends DomSanitizer {
    private _doc;
    constructor(_doc: any);
    sanitize(ctx: SecurityContext, value: SafeValue | string | null): string | null;
    bypassSecurityTrustHtml(value: string): SafeHtml;
    bypassSecurityTrustStyle(value: string): SafeStyle;
    bypassSecurityTrustScript(value: string): SafeScript;
    bypassSecurityTrustUrl(value: string): SafeUrl;
    bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ɵDomSanitizerImpl>;
}

export declare class ɵDomSharedStylesHost extends ɵSharedStylesHost implements OnDestroy {
    private _doc;
    private _hostNodes;
    private _styleNodes;
    constructor(_doc: any);
    private _addStylesToHost;
    addHost(hostNode: Node): void;
    removeHost(hostNode: Node): void;
    onStylesAdded(additions: Set<string>): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ɵDomSharedStylesHost>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ɵDomSharedStylesHost>;
}

export declare const ɵELEMENT_PROBE_PROVIDERS: Provider[];

/**
 * In Ivy, we don't support NgProbe because we have our own set of testing utilities
 * with more robust functionality.
 *
 * We shouldn't bring in NgProbe because it prevents DebugNode and friends from
 * tree-shaking properly.
 */
export declare const ɵELEMENT_PROBE_PROVIDERS__POST_R3__: never[];


export declare function ɵescapeHtml(text: string): string;

export declare function ɵflattenStyles(compId: string, styles: Array<any | any[]>, target: string[]): string[];
export { ɵgetDOM }

/**
 * In Ivy, support for Hammer gestures is optional, so applications must
 * import the `HammerModule` at root to turn on support. This means that
 * Hammer-specific code can be tree-shaken away if not needed.
 */
export declare const ɵHAMMER_PROVIDERS__POST_R3__: never[];

/**
 * Event plugin that adds Hammer support to an application.
 *
 * @ngModule HammerModule
 */
export declare class ɵHammerGesturesPlugin extends ɵangular_packages_platform_browser_platform_browser_g {
    private _config;
    private console;
    private loader?;
    constructor(doc: any, _config: HammerGestureConfig, console: ɵConsole, loader?: HammerLoader | null | undefined);
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    isCustomEvent(eventName: string): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ɵHammerGesturesPlugin>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ɵHammerGesturesPlugin>;
}

export declare function ɵinitDomAdapter(): void;

export declare const ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS: StaticProvider[];

/**
 * @publicApi
 * A browser plug-in that provides support for handling of key events in Angular.
 */
export declare class ɵKeyEventsPlugin extends ɵangular_packages_platform_browser_platform_browser_g {
    /**
     * Initializes an instance of the browser plug-in.
     * @param doc The document in which key events will be detected.
     */
    constructor(doc: any);
    /**
      * Reports whether a named key event is supported.
      * @param eventName The event name to query.
      * @return True if the named key event is supported.
     */
    supports(eventName: string): boolean;
    /**
     * Registers a handler for a specific element and key event.
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the key event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns The key event that was registered.
    */
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    static parseEventName(eventName: string): {
        [key: string]: string;
    } | null;
    static getEventFullKey(event: KeyboardEvent): string;
    /**
     * Configures a handler callback for a key event.
     * @param fullKey The event name that combines all simultaneous keystrokes.
     * @param handler The function that responds to the key event.
     * @param zone The zone in which the event occurred.
     * @returns A callback function.
     */
    static eventCallback(fullKey: any, handler: Function, zone: NgZone): Function;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ɵKeyEventsPlugin>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ɵKeyEventsPlugin>;
}

export declare const ɵNAMESPACE_URIS: {
    [ns: string]: string;
};

export declare class ɵSharedStylesHost {
    addStyles(styles: string[]): void;
    onStylesAdded(additions: Set<string>): void;
    getAllStyles(): string[];
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ɵSharedStylesHost>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<ɵSharedStylesHost>;
}

export declare function ɵshimContentAttribute(componentShortId: string): string;

export declare function ɵshimHostAttribute(componentShortId: string): string;

/**
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
 */
export declare const ɵTRANSITION_ID: InjectionToken<unknown>;

export { }

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tYnJvd3Nlci5kLnRzIiwic291cmNlcyI6WyJwbGF0Zm9ybS1icm93c2VyLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJDQTs7Ozs7Ozs7Ozs7Ozs7O0FBYUE7Ozs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEhBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOERBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5RUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUhBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVIQTs7Ozs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQ0E7Ozs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7Ozs7OyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2UgQW5ndWxhciB2OS4wLjNcbiAqIChjKSAyMDEwLTIwMjAgR29vZ2xlIExMQy4gaHR0cHM6Ly9hbmd1bGFyLmlvL1xuICogTGljZW5zZTogTUlUXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERlYnVnRWxlbWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEZWJ1Z05vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXJyb3JIYW5kbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdldFRlc3RhYmlsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdQcm9iZVRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGxhdGZvcm1SZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUHJlZGljYXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZW5kZXJlckZhY3RvcnkyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlbmRlcmVyVHlwZTIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlY3VyaXR5Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdGF0aWNQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUZXN0YWJpbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUZXN0YWJpbGl0eVJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmVyc2lvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyDJtUNvbnNvbGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgybVEb21BZGFwdGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgybVnZXRET00gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuLyoqXHJcbiAqIEV4cG9ydHMgcmVxdWlyZWQgaW5mcmFzdHJ1Y3R1cmUgZm9yIGFsbCBBbmd1bGFyIGFwcHMuXHJcbiAqIEluY2x1ZGVkIGJ5IGRlZmF1bHQgaW4gYWxsIEFuZ3VsYXIgYXBwcyBjcmVhdGVkIHdpdGggdGhlIENMSVxyXG4gKiBgbmV3YCBjb21tYW5kLlxyXG4gKiBSZS1leHBvcnRzIGBDb21tb25Nb2R1bGVgIGFuZCBgQXBwbGljYXRpb25Nb2R1bGVgLCBtYWtpbmcgdGhlaXJcclxuICogZXhwb3J0cyBhbmQgcHJvdmlkZXJzIGF2YWlsYWJsZSB0byBhbGwgYXBwcy5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQnJvd3Nlck1vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnRNb2R1bGU6IEJyb3dzZXJNb2R1bGUgfCBudWxsKTtcclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlcyBhIGJyb3dzZXItYmFzZWQgYXBwIHRvIHRyYW5zaXRpb24gZnJvbSBhIHNlcnZlci1yZW5kZXJlZCBhcHAsIGlmXHJcbiAgICAgKiBvbmUgaXMgcHJlc2VudCBvbiB0aGUgcGFnZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIEFuIG9iamVjdCBjb250YWluaW5nIGFuIGlkZW50aWZpZXIgZm9yIHRoZSBhcHAgdG8gdHJhbnNpdGlvbi5cclxuICAgICAqIFRoZSBJRCBtdXN0IG1hdGNoIGJldHdlZW4gdGhlIGNsaWVudCBhbmQgc2VydmVyIHZlcnNpb25zIG9mIHRoZSBhcHAuXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcmVjb25maWd1cmVkIGBCcm93c2VyTW9kdWxlYCB0byBpbXBvcnQgaW50byB0aGUgYXBwJ3Mgcm9vdCBgQXBwTW9kdWxlYC5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHdpdGhTZXJ2ZXJUcmFuc2l0aW9uKHBhcmFtczoge1xyXG4gICAgICAgIGFwcElkOiBzdHJpbmc7XHJcbiAgICB9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxCcm93c2VyTW9kdWxlPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIE5nTW9kdWxlIHRvIGluc3RhbGwgb24gdGhlIGNsaWVudCBzaWRlIHdoaWxlIHVzaW5nIHRoZSBgVHJhbnNmZXJTdGF0ZWAgdG8gdHJhbnNmZXIgc3RhdGUgZnJvbVxyXG4gKiBzZXJ2ZXIgdG8gY2xpZW50LlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBCcm93c2VyVHJhbnNmZXJTdGF0ZU1vZHVsZSB7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcmVkaWNhdGVzIGZvciB1c2Ugd2l0aCB7QGxpbmsgRGVidWdFbGVtZW50fSdzIHF1ZXJ5IGZ1bmN0aW9ucy5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgQnkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBNYXRjaCBhbGwgbm9kZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHVzYWdlTm90ZXNcclxuICAgICAqICMjIyBFeGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICoge0BleGFtcGxlIHBsYXRmb3JtLWJyb3dzZXIvZG9tL2RlYnVnL3RzL2J5L2J5LnRzIHJlZ2lvbj0nYnlfYWxsJ31cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFsbCgpOiBQcmVkaWNhdGU8RGVidWdOb2RlPjtcclxuICAgIC8qKlxyXG4gICAgICogTWF0Y2ggZWxlbWVudHMgYnkgdGhlIGdpdmVuIENTUyBzZWxlY3Rvci5cclxuICAgICAqXHJcbiAgICAgKiBAdXNhZ2VOb3Rlc1xyXG4gICAgICogIyMjIEV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiB7QGV4YW1wbGUgcGxhdGZvcm0tYnJvd3Nlci9kb20vZGVidWcvdHMvYnkvYnkudHMgcmVnaW9uPSdieV9jc3MnfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3NzKHNlbGVjdG9yOiBzdHJpbmcpOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50PjtcclxuICAgIC8qKlxyXG4gICAgICogTWF0Y2ggbm9kZXMgdGhhdCBoYXZlIHRoZSBnaXZlbiBkaXJlY3RpdmUgcHJlc2VudC5cclxuICAgICAqXHJcbiAgICAgKiBAdXNhZ2VOb3Rlc1xyXG4gICAgICogIyMjIEV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiB7QGV4YW1wbGUgcGxhdGZvcm0tYnJvd3Nlci9kb20vZGVidWcvdHMvYnkvYnkudHMgcmVnaW9uPSdieV9kaXJlY3RpdmUnfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGlyZWN0aXZlKHR5cGU6IFR5cGU8YW55Pik6IFByZWRpY2F0ZTxEZWJ1Z05vZGU+O1xyXG59XHJcblxyXG4vKipcclxuICogRGlzYWJsZXMgQW5ndWxhciB0b29scy5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZGlzYWJsZURlYnVnVG9vbHMoKTogdm9pZDtcclxuXHJcbi8qKlxyXG4gKiBEb21TYW5pdGl6ZXIgaGVscHMgcHJldmVudGluZyBDcm9zcyBTaXRlIFNjcmlwdGluZyBTZWN1cml0eSBidWdzIChYU1MpIGJ5IHNhbml0aXppbmdcclxuICogdmFsdWVzIHRvIGJlIHNhZmUgdG8gdXNlIGluIHRoZSBkaWZmZXJlbnQgRE9NIGNvbnRleHRzLlxyXG4gKlxyXG4gKiBGb3IgZXhhbXBsZSwgd2hlbiBiaW5kaW5nIGEgVVJMIGluIGFuIGA8YSBbaHJlZl09XCJzb21lVmFsdWVcIj5gIGh5cGVybGluaywgYHNvbWVWYWx1ZWAgd2lsbCBiZVxyXG4gKiBzYW5pdGl6ZWQgc28gdGhhdCBhbiBhdHRhY2tlciBjYW5ub3QgaW5qZWN0IGUuZy4gYSBgamF2YXNjcmlwdDpgIFVSTCB0aGF0IHdvdWxkIGV4ZWN1dGUgY29kZSBvblxyXG4gKiB0aGUgd2Vic2l0ZS5cclxuICpcclxuICogSW4gc3BlY2lmaWMgc2l0dWF0aW9ucywgaXQgbWlnaHQgYmUgbmVjZXNzYXJ5IHRvIGRpc2FibGUgc2FuaXRpemF0aW9uLCBmb3IgZXhhbXBsZSBpZiB0aGVcclxuICogYXBwbGljYXRpb24gZ2VudWluZWx5IG5lZWRzIHRvIHByb2R1Y2UgYSBgamF2YXNjcmlwdDpgIHN0eWxlIGxpbmsgd2l0aCBhIGR5bmFtaWMgdmFsdWUgaW4gaXQuXHJcbiAqIFVzZXJzIGNhbiBieXBhc3Mgc2VjdXJpdHkgYnkgY29uc3RydWN0aW5nIGEgdmFsdWUgd2l0aCBvbmUgb2YgdGhlIGBieXBhc3NTZWN1cml0eVRydXN0Li4uYFxyXG4gKiBtZXRob2RzLCBhbmQgdGhlbiBiaW5kaW5nIHRvIHRoYXQgdmFsdWUgZnJvbSB0aGUgdGVtcGxhdGUuXHJcbiAqXHJcbiAqIFRoZXNlIHNpdHVhdGlvbnMgc2hvdWxkIGJlIHZlcnkgcmFyZSwgYW5kIGV4dHJhb3JkaW5hcnkgY2FyZSBtdXN0IGJlIHRha2VuIHRvIGF2b2lkIGNyZWF0aW5nIGFcclxuICogQ3Jvc3MgU2l0ZSBTY3JpcHRpbmcgKFhTUykgc2VjdXJpdHkgYnVnIVxyXG4gKlxyXG4gKiBXaGVuIHVzaW5nIGBieXBhc3NTZWN1cml0eVRydXN0Li4uYCwgbWFrZSBzdXJlIHRvIGNhbGwgdGhlIG1ldGhvZCBhcyBlYXJseSBhcyBwb3NzaWJsZSBhbmQgYXNcclxuICogY2xvc2UgYXMgcG9zc2libGUgdG8gdGhlIHNvdXJjZSBvZiB0aGUgdmFsdWUsIHRvIG1ha2UgaXQgZWFzeSB0byB2ZXJpZnkgbm8gc2VjdXJpdHkgYnVnIGlzXHJcbiAqIGNyZWF0ZWQgYnkgaXRzIHVzZS5cclxuICpcclxuICogSXQgaXMgbm90IHJlcXVpcmVkIChhbmQgbm90IHJlY29tbWVuZGVkKSB0byBieXBhc3Mgc2VjdXJpdHkgaWYgdGhlIHZhbHVlIGlzIHNhZmUsIGUuZy4gYSBVUkwgdGhhdFxyXG4gKiBkb2VzIG5vdCBzdGFydCB3aXRoIGEgc3VzcGljaW91cyBwcm90b2NvbCwgb3IgYW4gSFRNTCBzbmlwcGV0IHRoYXQgZG9lcyBub3QgY29udGFpbiBkYW5nZXJvdXNcclxuICogY29kZS4gVGhlIHNhbml0aXplciBsZWF2ZXMgc2FmZSB2YWx1ZXMgaW50YWN0LlxyXG4gKlxyXG4gKiBAc2VjdXJpdHkgQ2FsbGluZyBhbnkgb2YgdGhlIGBieXBhc3NTZWN1cml0eVRydXN0Li4uYCBBUElzIGRpc2FibGVzIEFuZ3VsYXIncyBidWlsdC1pblxyXG4gKiBzYW5pdGl6YXRpb24gZm9yIHRoZSB2YWx1ZSBwYXNzZWQgaW4uIENhcmVmdWxseSBjaGVjayBhbmQgYXVkaXQgYWxsIHZhbHVlcyBhbmQgY29kZSBwYXRocyBnb2luZ1xyXG4gKiBpbnRvIHRoaXMgY2FsbC4gTWFrZSBzdXJlIGFueSB1c2VyIGRhdGEgaXMgYXBwcm9wcmlhdGVseSBlc2NhcGVkIGZvciB0aGlzIHNlY3VyaXR5IGNvbnRleHQuXHJcbiAqIEZvciBtb3JlIGRldGFpbCwgc2VlIHRoZSBbU2VjdXJpdHkgR3VpZGVdKGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5KS5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgYWJzdHJhY3QgY2xhc3MgRG9tU2FuaXRpemVyIGltcGxlbWVudHMgU2FuaXRpemVyIHtcclxuICAgIC8qKlxyXG4gICAgICogU2FuaXRpemVzIGEgdmFsdWUgZm9yIHVzZSBpbiB0aGUgZ2l2ZW4gU2VjdXJpdHlDb250ZXh0LlxyXG4gICAgICpcclxuICAgICAqIElmIHZhbHVlIGlzIHRydXN0ZWQgZm9yIHRoZSBjb250ZXh0LCB0aGlzIG1ldGhvZCB3aWxsIHVud3JhcCB0aGUgY29udGFpbmVkIHNhZmUgdmFsdWUgYW5kIHVzZVxyXG4gICAgICogaXQgZGlyZWN0bHkuIE90aGVyd2lzZSwgdmFsdWUgd2lsbCBiZSBzYW5pdGl6ZWQgdG8gYmUgc2FmZSBpbiB0aGUgZ2l2ZW4gY29udGV4dCwgZm9yIGV4YW1wbGVcclxuICAgICAqIGJ5IHJlcGxhY2luZyBVUkxzIHRoYXQgaGF2ZSBhbiB1bnNhZmUgcHJvdG9jb2wgcGFydCAoc3VjaCBhcyBgamF2YXNjcmlwdDpgKS4gVGhlIGltcGxlbWVudGF0aW9uXHJcbiAgICAgKiBpcyByZXNwb25zaWJsZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgdmFsdWUgY2FuIGRlZmluaXRlbHkgYmUgc2FmZWx5IHVzZWQgaW4gdGhlIGdpdmVuIGNvbnRleHQuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHNhbml0aXplKGNvbnRleHQ6IFNlY3VyaXR5Q29udGV4dCwgdmFsdWU6IFNhZmVWYWx1ZSB8IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBzYWZlIEhUTUwuIE9ubHkgdXNlIHRoaXMgd2hlbiB0aGUgYm91bmQgSFRNTFxyXG4gICAgICogaXMgdW5zYWZlIChlLmcuIGNvbnRhaW5zIGA8c2NyaXB0PmAgdGFncykgYW5kIHRoZSBjb2RlIHNob3VsZCBiZSBleGVjdXRlZC4gVGhlIHNhbml0aXplciB3aWxsXHJcbiAgICAgKiBsZWF2ZSBzYWZlIEhUTUwgaW50YWN0LCBzbyBpbiBtb3N0IHNpdHVhdGlvbnMgdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxyXG4gICAgICpcclxuICAgICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXHJcbiAgICAgKiBzZWN1cml0eSByaXNrcyFcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodmFsdWU6IHN0cmluZyk6IFNhZmVIdG1sO1xyXG4gICAgLyoqXHJcbiAgICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBzYWZlIHN0eWxlIHZhbHVlIChDU1MpLlxyXG4gICAgICpcclxuICAgICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXHJcbiAgICAgKiBzZWN1cml0eSByaXNrcyFcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHZhbHVlOiBzdHJpbmcpOiBTYWZlU3R5bGU7XHJcbiAgICAvKipcclxuICAgICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIHNhZmUgSmF2YVNjcmlwdC5cclxuICAgICAqXHJcbiAgICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xyXG4gICAgICogc2VjdXJpdHkgcmlza3MhXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RTY3JpcHQodmFsdWU6IHN0cmluZyk6IFNhZmVTY3JpcHQ7XHJcbiAgICAvKipcclxuICAgICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIGEgc2FmZSBzdHlsZSBVUkwsIGkuZS4gYSB2YWx1ZSB0aGF0IGNhbiBiZSB1c2VkXHJcbiAgICAgKiBpbiBoeXBlcmxpbmtzIG9yIGA8aW1nIHNyYz5gLlxyXG4gICAgICpcclxuICAgICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXHJcbiAgICAgKiBzZWN1cml0eSByaXNrcyFcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh2YWx1ZTogc3RyaW5nKTogU2FmZVVybDtcclxuICAgIC8qKlxyXG4gICAgICogQnlwYXNzIHNlY3VyaXR5IGFuZCB0cnVzdCB0aGUgZ2l2ZW4gdmFsdWUgdG8gYmUgYSBzYWZlIHJlc291cmNlIFVSTCwgaS5lLiBhIGxvY2F0aW9uIHRoYXQgbWF5XHJcbiAgICAgKiBiZSB1c2VkIHRvIGxvYWQgZXhlY3V0YWJsZSBjb2RlIGZyb20sIGxpa2UgYDxzY3JpcHQgc3JjPmAsIG9yIGA8aWZyYW1lIHNyYz5gLlxyXG4gICAgICpcclxuICAgICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXHJcbiAgICAgKiBzZWN1cml0eSByaXNrcyFcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHZhbHVlOiBzdHJpbmcpOiBTYWZlUmVzb3VyY2VVcmw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbmFibGVkIEFuZ3VsYXIgZGVidWcgdG9vbHMgdGhhdCBhcmUgYWNjZXNzaWJsZSB2aWEgeW91ciBicm93c2VyJ3NcclxuICogZGV2ZWxvcGVyIGNvbnNvbGUuXHJcbiAqXHJcbiAqIFVzYWdlOlxyXG4gKlxyXG4gKiAxLiBPcGVuIGRldmVsb3BlciBjb25zb2xlIChlLmcuIGluIENocm9tZSBDdHJsICsgU2hpZnQgKyBqKVxyXG4gKiAxLiBUeXBlIGBuZy5gICh1c3VhbGx5IHRoZSBjb25zb2xlIHdpbGwgc2hvdyBhdXRvLWNvbXBsZXRlIHN1Z2dlc3Rpb24pXHJcbiAqIDEuIFRyeSB0aGUgY2hhbmdlIGRldGVjdGlvbiBwcm9maWxlciBgbmcucHJvZmlsZXIudGltZUNoYW5nZURldGVjdGlvbigpYFxyXG4gKiAgICB0aGVuIGhpdCBFbnRlci5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gZW5hYmxlRGVidWdUb29sczxUPihyZWY6IENvbXBvbmVudFJlZjxUPik6IENvbXBvbmVudFJlZjxUPjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgaW5qZWN0aW9uIHRva2VuIGZvciB0aGUgZXZlbnQtbWFuYWdlciBwbHVnLWluIHNlcnZpY2UuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IEVWRU5UX01BTkFHRVJfUExVR0lOUzogSW5qZWN0aW9uVG9rZW48ybVhbmd1bGFyX3BhY2thZ2VzX3BsYXRmb3JtX2Jyb3dzZXJfcGxhdGZvcm1fYnJvd3Nlcl9nW10+O1xyXG5cclxuLyoqXHJcbiAqIEFuIGluamVjdGFibGUgc2VydmljZSB0aGF0IHByb3ZpZGVzIGV2ZW50IG1hbmFnZW1lbnQgZm9yIEFuZ3VsYXJcclxuICogdGhyb3VnaCBhIGJyb3dzZXIgcGx1Zy1pbi5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgRXZlbnRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgX3pvbmU7XHJcbiAgICBwcml2YXRlIF9wbHVnaW5zO1xyXG4gICAgcHJpdmF0ZSBfZXZlbnROYW1lVG9QbHVnaW47XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGFuIGluc3RhbmNlIG9mIHRoZSBldmVudC1tYW5hZ2VyIHNlcnZpY2UuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBsdWdpbnM6IMm1YW5ndWxhcl9wYWNrYWdlc19wbGF0Zm9ybV9icm93c2VyX3BsYXRmb3JtX2Jyb3dzZXJfZ1tdLCBfem9uZTogTmdab25lKTtcclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIGEgaGFuZGxlciBmb3IgYSBzcGVjaWZpYyBlbGVtZW50IGFuZCBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgSFRNTCBlbGVtZW50IHRvIHJlY2VpdmUgZXZlbnQgbm90aWZpY2F0aW9ucy5cclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiBmb3IuXHJcbiAgICAgKiBAcGFyYW0gaGFuZGxlciBBIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgbm90aWZpY2F0aW9uIG9jY3Vycy4gUmVjZWl2ZXMgdGhlXHJcbiAgICAgKiBldmVudCBvYmplY3QgYXMgYW4gYXJndW1lbnQuXHJcbiAgICAgKiBAcmV0dXJucyAgQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlbW92ZSB0aGUgaGFuZGxlci5cclxuICAgICAqL1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb247XHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyBhIGdsb2JhbCBoYW5kbGVyIGZvciBhbiBldmVudCBpbiBhIHRhcmdldCB2aWV3LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgQSB0YXJnZXQgZm9yIGdsb2JhbCBldmVudCBub3RpZmljYXRpb25zLiBPbmUgb2YgXCJ3aW5kb3dcIiwgXCJkb2N1bWVudFwiLCBvciBcImJvZHlcIi5cclxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiBmb3IuXHJcbiAgICAgKiBAcGFyYW0gaGFuZGxlciBBIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgbm90aWZpY2F0aW9uIG9jY3Vycy4gUmVjZWl2ZXMgdGhlXHJcbiAgICAgKiBldmVudCBvYmplY3QgYXMgYW4gYXJndW1lbnQuXHJcbiAgICAgKiBAcmV0dXJucyBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVtb3ZlIHRoZSBoYW5kbGVyLlxyXG4gICAgICovXHJcbiAgICBhZGRHbG9iYWxFdmVudExpc3RlbmVyKHRhcmdldDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbjtcclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmVzIHRoZSBjb21waWxhdGlvbiB6b25lIGluIHdoaWNoIGV2ZW50IGxpc3RlbmVycyBhcmUgcmVnaXN0ZXJlZC5cclxuICAgICAqL1xyXG4gICAgZ2V0Wm9uZSgpOiBOZ1pvbmU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBESSB0b2tlbiBmb3IgcHJvdmlkaW5nIFtIYW1tZXJKU10oaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby8pIHN1cHBvcnQgdG8gQW5ndWxhci5cclxuICogQHNlZSBgSGFtbWVyR2VzdHVyZUNvbmZpZ2BcclxuICpcclxuICogQG5nTW9kdWxlIEhhbW1lck1vZHVsZVxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjb25zdCBIQU1NRVJfR0VTVFVSRV9DT05GSUc6IEluamVjdGlvblRva2VuPEhhbW1lckdlc3R1cmVDb25maWc+O1xyXG5cclxuLyoqXHJcbiAqIEluamVjdGlvbiB0b2tlbiB1c2VkIHRvIHByb3ZpZGUgYSB7QGxpbmsgSGFtbWVyTG9hZGVyfSB0byBBbmd1bGFyLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjb25zdCBIQU1NRVJfTE9BREVSOiBJbmplY3Rpb25Ub2tlbjxIYW1tZXJMb2FkZXI+O1xyXG5cclxuLyoqXHJcbiAqIEFuIGluamVjdGFibGUgW0hhbW1lckpTIE1hbmFnZXJdKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vYXBpLyNoYW1tZXIubWFuYWdlcilcclxuICogZm9yIGdlc3R1cmUgcmVjb2duaXRpb24uIENvbmZpZ3VyZXMgc3BlY2lmaWMgZXZlbnQgcmVjb2duaXRpb24uXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEhhbW1lckdlc3R1cmVDb25maWcge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBIHNldCBvZiBzdXBwb3J0ZWQgZXZlbnQgbmFtZXMgZm9yIGdlc3R1cmVzIHRvIGJlIHVzZWQgaW4gQW5ndWxhci5cclxuICAgICAqIEFuZ3VsYXIgc3VwcG9ydHMgYWxsIGJ1aWx0LWluIHJlY29nbml6ZXJzLCBhcyBsaXN0ZWQgaW5cclxuICAgICAqIFtIYW1tZXJKUyBkb2N1bWVudGF0aW9uXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvLykuXHJcbiAgICAgKi9cclxuICAgIGV2ZW50czogc3RyaW5nW107XHJcbiAgICAvKipcclxuICAgICogTWFwcyBnZXN0dXJlIGV2ZW50IG5hbWVzIHRvIGEgc2V0IG9mIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xyXG4gICAgKiB0aGF0IHNwZWNpZnkgb3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHZhbHVlcyBmb3Igc3BlY2lmaWMgcHJvcGVydGllcy5cclxuICAgICpcclxuICAgICogVGhlIGtleSBpcyBhIHN1cHBvcnRlZCBldmVudCBuYW1lIHRvIGJlIGNvbmZpZ3VyZWQsXHJcbiAgICAqIGFuZCB0aGUgb3B0aW9ucyBvYmplY3QgY29udGFpbnMgYSBzZXQgb2YgcHJvcGVydGllcywgd2l0aCBvdmVycmlkZSB2YWx1ZXNcclxuICAgICogdG8gYmUgYXBwbGllZCB0byB0aGUgbmFtZWQgcmVjb2duaXplciBldmVudC5cclxuICAgICogRm9yIGV4YW1wbGUsIHRvIGRpc2FibGUgcmVjb2duaXRpb24gb2YgdGhlIHJvdGF0ZSBldmVudCwgc3BlY2lmeVxyXG4gICAgKiAgYHtcInJvdGF0ZVwiOiB7XCJlbmFibGVcIjogZmFsc2V9fWAuXHJcbiAgICAqXHJcbiAgICAqIFByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHByZXNlbnQgdGFrZSB0aGUgSGFtbWVySlMgZGVmYXVsdCB2YWx1ZXMuXHJcbiAgICAqIEZvciBpbmZvcm1hdGlvbiBhYm91dCB3aGljaCBwcm9wZXJ0aWVzIGFyZSBzdXBwb3J0ZWQgZm9yIHdoaWNoIGV2ZW50cyxcclxuICAgICogYW5kIHRoZWlyIGFsbG93ZWQgYW5kIGRlZmF1bHQgdmFsdWVzLCBzZWVcclxuICAgICogW0hhbW1lckpTIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vKS5cclxuICAgICpcclxuICAgICovXHJcbiAgICBvdmVycmlkZXM6IHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBPYmplY3Q7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9wZXJ0aWVzIHdob3NlIGRlZmF1bHQgdmFsdWVzIGNhbiBiZSBvdmVycmlkZGVuIGZvciBhIGdpdmVuIGV2ZW50LlxyXG4gICAgICogRGlmZmVyZW50IHNldHMgb2YgcHJvcGVydGllcyBhcHBseSB0byBkaWZmZXJlbnQgZXZlbnRzLlxyXG4gICAgICogRm9yIGluZm9ybWF0aW9uIGFib3V0IHdoaWNoIHByb3BlcnRpZXMgYXJlIHN1cHBvcnRlZCBmb3Igd2hpY2ggZXZlbnRzLFxyXG4gICAgICogYW5kIHRoZWlyIGFsbG93ZWQgYW5kIGRlZmF1bHQgdmFsdWVzLCBzZWVcclxuICAgICAqIFtIYW1tZXJKUyBkb2N1bWVudGF0aW9uXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvLykuXHJcbiAgICAgKi9cclxuICAgIG9wdGlvbnM/OiB7XHJcbiAgICAgICAgY3NzUHJvcHM/OiBhbnk7XHJcbiAgICAgICAgZG9tRXZlbnRzPzogYm9vbGVhbjtcclxuICAgICAgICBlbmFibGU/OiBib29sZWFuIHwgKChtYW5hZ2VyOiBhbnkpID0+IGJvb2xlYW4pO1xyXG4gICAgICAgIHByZXNldD86IGFueVtdO1xyXG4gICAgICAgIHRvdWNoQWN0aW9uPzogc3RyaW5nO1xyXG4gICAgICAgIHJlY29nbml6ZXJzPzogYW55W107XHJcbiAgICAgICAgaW5wdXRDbGFzcz86IGFueTtcclxuICAgICAgICBpbnB1dFRhcmdldD86IEV2ZW50VGFyZ2V0O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIFtIYW1tZXJKUyBNYW5hZ2VyXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2FwaS8jaGFtbWVyLm1hbmFnZXIpXHJcbiAgICAgKiBhbmQgYXR0YWNoZXMgaXQgdG8gYSBnaXZlbiBIVE1MIGVsZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgcmVjb2duaXplIGdlc3R1cmVzLlxyXG4gICAgICogQHJldHVybnMgQSBIYW1tZXJKUyBldmVudC1tYW5hZ2VyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgYnVpbGRIYW1tZXIoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIYW1tZXJJbnN0YW5jZTtcclxufVxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgSGFtbWVySW5zdGFuY2Uge1xyXG4gICAgb24oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkO1xyXG4gICAgb2ZmKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZDtcclxuICAgIGRlc3Ryb3k/KCk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiB0aGF0IGxvYWRzIEhhbW1lckpTLCByZXR1cm5pbmcgYSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgb25jZSBIYW1tZXJKcyBpcyBsb2FkZWQuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIHR5cGUgSGFtbWVyTG9hZGVyID0gKCkgPT4gUHJvbWlzZTx2b2lkPjtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIHN1cHBvcnQgZm9yIEhhbW1lckpTLlxyXG4gKlxyXG4gKiBJbXBvcnQgdGhpcyBtb2R1bGUgYXQgdGhlIHJvb3Qgb2YgeW91ciBhcHBsaWNhdGlvbiBzbyB0aGF0IEFuZ3VsYXIgY2FuIHdvcmsgd2l0aFxyXG4gKiBIYW1tZXJKUyB0byBkZXRlY3QgZ2VzdHVyZSBldmVudHMuXHJcbiAqXHJcbiAqIE5vdGUgdGhhdCBhcHBsaWNhdGlvbnMgc3RpbGwgbmVlZCB0byBpbmNsdWRlIHRoZSBIYW1tZXJKUyBzY3JpcHQgaXRzZWxmLiBUaGlzIG1vZHVsZVxyXG4gKiBzaW1wbHkgc2V0cyB1cCB0aGUgY29vcmRpbmF0aW9uIGxheWVyIGJldHdlZW4gSGFtbWVySlMgYW5kIEFuZ3VsYXIncyBFdmVudE1hbmFnZXIuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEhhbW1lck1vZHVsZSB7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBgU3RhdGVLZXk8VD5gIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgdmFsdWUgb2YgdHlwZSBUIHdpdGggYFRyYW5zZmVyU3RhdGVgLlxyXG4gKlxyXG4gKiBFeGFtcGxlOlxyXG4gKlxyXG4gKiBgYGBcclxuICogY29uc3QgQ09VTlRFUl9LRVkgPSBtYWtlU3RhdGVLZXk8bnVtYmVyPignY291bnRlcicpO1xyXG4gKiBsZXQgdmFsdWUgPSAxMDtcclxuICpcclxuICogdHJhbnNmZXJTdGF0ZS5zZXQoQ09VTlRFUl9LRVksIHZhbHVlKTtcclxuICogYGBgXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIG1ha2VTdGF0ZUtleTxUID0gdm9pZD4oa2V5OiBzdHJpbmcpOiBTdGF0ZUtleTxUPjtcclxuXHJcbi8qKlxyXG4gKiBBIHNlcnZpY2UgdGhhdCBjYW4gYmUgdXNlZCB0byBnZXQgYW5kIGFkZCBtZXRhIHRhZ3MuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1ldGEge1xyXG4gICAgcHJpdmF0ZSBfZG9jO1xyXG4gICAgcHJpdmF0ZSBfZG9tO1xyXG4gICAgY29uc3RydWN0b3IoX2RvYzogYW55KTtcclxuICAgIGFkZFRhZyh0YWc6IE1ldGFEZWZpbml0aW9uLCBmb3JjZUNyZWF0aW9uPzogYm9vbGVhbik6IEhUTUxNZXRhRWxlbWVudCB8IG51bGw7XHJcbiAgICBhZGRUYWdzKHRhZ3M6IE1ldGFEZWZpbml0aW9uW10sIGZvcmNlQ3JlYXRpb24/OiBib29sZWFuKTogSFRNTE1ldGFFbGVtZW50W107XHJcbiAgICBnZXRUYWcoYXR0clNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MTWV0YUVsZW1lbnQgfCBudWxsO1xyXG4gICAgZ2V0VGFncyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxNZXRhRWxlbWVudFtdO1xyXG4gICAgdXBkYXRlVGFnKHRhZzogTWV0YURlZmluaXRpb24sIHNlbGVjdG9yPzogc3RyaW5nKTogSFRNTE1ldGFFbGVtZW50IHwgbnVsbDtcclxuICAgIHJlbW92ZVRhZyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICByZW1vdmVUYWdFbGVtZW50KG1ldGE6IEhUTUxNZXRhRWxlbWVudCk6IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9nZXRPckNyZWF0ZUVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF9zZXRNZXRhRWxlbWVudEF0dHJpYnV0ZXM7XHJcbiAgICBwcml2YXRlIF9wYXJzZVNlbGVjdG9yO1xyXG4gICAgcHJpdmF0ZSBfY29udGFpbnNBdHRyaWJ1dGVzO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBtZXRhIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIHR5cGUgTWV0YURlZmluaXRpb24gPSB7XHJcbiAgICBjaGFyc2V0Pzogc3RyaW5nO1xyXG4gICAgY29udGVudD86IHN0cmluZztcclxuICAgIGh0dHBFcXVpdj86IHN0cmluZztcclxuICAgIGlkPzogc3RyaW5nO1xyXG4gICAgaXRlbXByb3A/OiBzdHJpbmc7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gICAgcHJvcGVydHk/OiBzdHJpbmc7XHJcbiAgICBzY2hlbWU/OiBzdHJpbmc7XHJcbiAgICB1cmw/OiBzdHJpbmc7XHJcbn0gJiB7XHJcbiAgICBbcHJvcDogc3RyaW5nXTogc3RyaW5nO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IHBsYXRmb3JtQnJvd3NlcjogKGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXSkgPT4gUGxhdGZvcm1SZWY7XHJcblxyXG4vKipcclxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgSFRNTC5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFNhZmVIdG1sIGV4dGVuZHMgU2FmZVZhbHVlIHtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIGEgVVJMIHRvIGxvYWQgZXhlY3V0YWJsZSBjb2RlIGZyb20uXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBTYWZlUmVzb3VyY2VVcmwgZXh0ZW5kcyBTYWZlVmFsdWUge1xyXG59XHJcblxyXG4vKipcclxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgSmF2YVNjcmlwdC5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFNhZmVTY3JpcHQgZXh0ZW5kcyBTYWZlVmFsdWUge1xyXG59XHJcblxyXG4vKipcclxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgc3R5bGUgKENTUykuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBTYWZlU3R5bGUgZXh0ZW5kcyBTYWZlVmFsdWUge1xyXG59XHJcblxyXG4vKipcclxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgYSBVUkwgbGlua2luZyB0byBhIGRvY3VtZW50LlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgU2FmZVVybCBleHRlbmRzIFNhZmVWYWx1ZSB7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBpbiBhIHBhcnRpY3VsYXIgY29udGV4dC5cclxuICpcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFNhZmVWYWx1ZSB7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHR5cGUtc2FmZSBrZXkgdG8gdXNlIHdpdGggYFRyYW5zZmVyU3RhdGVgLlxyXG4gKlxyXG4gKiBFeGFtcGxlOlxyXG4gKlxyXG4gKiBgYGBcclxuICogY29uc3QgQ09VTlRFUl9LRVkgPSBtYWtlU3RhdGVLZXk8bnVtYmVyPignY291bnRlcicpO1xyXG4gKiBsZXQgdmFsdWUgPSAxMDtcclxuICpcclxuICogdHJhbnNmZXJTdGF0ZS5zZXQoQ09VTlRFUl9LRVksIHZhbHVlKTtcclxuICogYGBgXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIHR5cGUgU3RhdGVLZXk8VD4gPSBzdHJpbmcgJiB7XHJcbiAgICBfX25vdF9hX3N0cmluZzogbmV2ZXI7XHJcbn07XHJcblxyXG4vKipcclxuICogQSBzZXJ2aWNlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IGFuZCBzZXQgdGhlIHRpdGxlIG9mIGEgY3VycmVudCBIVE1MIGRvY3VtZW50LlxyXG4gKlxyXG4gKiBTaW5jZSBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIGNhbid0IGJlIGJvb3RzdHJhcHBlZCBvbiB0aGUgZW50aXJlIEhUTUwgZG9jdW1lbnQgKGA8aHRtbD5gIHRhZylcclxuICogaXQgaXMgbm90IHBvc3NpYmxlIHRvIGJpbmQgdG8gdGhlIGB0ZXh0YCBwcm9wZXJ0eSBvZiB0aGUgYEhUTUxUaXRsZUVsZW1lbnRgIGVsZW1lbnRzXHJcbiAqIChyZXByZXNlbnRpbmcgdGhlIGA8dGl0bGU+YCB0YWcpLiBJbnN0ZWFkLCB0aGlzIHNlcnZpY2UgY2FuIGJlIHVzZWQgdG8gc2V0IGFuZCBnZXQgdGhlIGN1cnJlbnRcclxuICogdGl0bGUgdmFsdWUuXHJcbiAqXHJcbiAqIEBwdWJsaWNBcGlcclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFRpdGxlIHtcclxuICAgIHByaXZhdGUgX2RvYztcclxuICAgIGNvbnN0cnVjdG9yKF9kb2M6IGFueSk7XHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdGl0bGUgb2YgdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cclxuICAgICAqL1xyXG4gICAgZ2V0VGl0bGUoKTogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHRpdGxlIG9mIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gbmV3VGl0bGVcclxuICAgICAqL1xyXG4gICAgc2V0VGl0bGUobmV3VGl0bGU6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGtleSB2YWx1ZSBzdG9yZSB0aGF0IGlzIHRyYW5zZmVycmVkIGZyb20gdGhlIGFwcGxpY2F0aW9uIG9uIHRoZSBzZXJ2ZXIgc2lkZSB0byB0aGUgYXBwbGljYXRpb25cclxuICogb24gdGhlIGNsaWVudCBzaWRlLlxyXG4gKlxyXG4gKiBgVHJhbnNmZXJTdGF0ZWAgd2lsbCBiZSBhdmFpbGFibGUgYXMgYW4gaW5qZWN0YWJsZSB0b2tlbi4gVG8gdXNlIGl0IGltcG9ydFxyXG4gKiBgU2VydmVyVHJhbnNmZXJTdGF0ZU1vZHVsZWAgb24gdGhlIHNlcnZlciBhbmQgYEJyb3dzZXJUcmFuc2ZlclN0YXRlTW9kdWxlYCBvbiB0aGUgY2xpZW50LlxyXG4gKlxyXG4gKiBUaGUgdmFsdWVzIGluIHRoZSBzdG9yZSBhcmUgc2VyaWFsaXplZC9kZXNlcmlhbGl6ZWQgdXNpbmcgSlNPTi5zdHJpbmdpZnkvSlNPTi5wYXJzZS4gU28gb25seVxyXG4gKiBib29sZWFuLCBudW1iZXIsIHN0cmluZywgbnVsbCBhbmQgbm9uLWNsYXNzIG9iamVjdHMgd2lsbCBiZSBzZXJpYWxpemVkIGFuZCBkZXNlcmlhbHppZWQgaW4gYVxyXG4gKiBub24tbG9zc3kgbWFubmVyLlxyXG4gKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBUcmFuc2ZlclN0YXRlIHtcclxuICAgIHByaXZhdGUgc3RvcmU7XHJcbiAgICBwcml2YXRlIG9uU2VyaWFsaXplQ2FsbGJhY2tzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gYSBrZXkuIFJldHVybiBgZGVmYXVsdFZhbHVlYCBpZiBrZXkgaXMgbm90IGZvdW5kLlxyXG4gICAgICovXHJcbiAgICBnZXQ8VD4oa2V5OiBTdGF0ZUtleTxUPiwgZGVmYXVsdFZhbHVlOiBUKTogVDtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIGEga2V5LlxyXG4gICAgICovXHJcbiAgICBzZXQ8VD4oa2V5OiBTdGF0ZUtleTxUPiwgdmFsdWU6IFQpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBrZXkgZnJvbSB0aGUgc3RvcmUuXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZTxUPihrZXk6IFN0YXRlS2V5PFQ+KTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogVGVzdCB3aGV0aGVyIGEga2V5IGV4aXN0cyBpbiB0aGUgc3RvcmUuXHJcbiAgICAgKi9cclxuICAgIGhhc0tleTxUPihrZXk6IFN0YXRlS2V5PFQ+KTogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0byBwcm92aWRlIHRoZSB2YWx1ZSBmb3IgYSBrZXkgd2hlbiBgdG9Kc29uYCBpcyBjYWxsZWQuXHJcbiAgICAgKi9cclxuICAgIG9uU2VyaWFsaXplPFQ+KGtleTogU3RhdGVLZXk8VD4sIGNhbGxiYWNrOiAoKSA9PiBUKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogU2VyaWFsaXplIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBzdG9yZSB0byBKU09OLlxyXG4gICAgICovXHJcbiAgICB0b0pzb24oKTogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgVkVSU0lPTjogVmVyc2lvbjtcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIMm1YW5ndWxhcl9wYWNrYWdlc19wbGF0Zm9ybV9icm93c2VyX3BsYXRmb3JtX2Jyb3dzZXJfYSgpOiBFcnJvckhhbmRsZXI7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiDJtWFuZ3VsYXJfcGFja2FnZXNfcGxhdGZvcm1fYnJvd3Nlcl9wbGF0Zm9ybV9icm93c2VyX2IoKTogYW55O1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgybVhbmd1bGFyX3BhY2thZ2VzX3BsYXRmb3JtX2Jyb3dzZXJfcGxhdGZvcm1fYnJvd3Nlcl9jOiBTdGF0aWNQcm92aWRlcltdO1xyXG5cclxuLyoqXHJcbiAqIEZhY3RvcnkgdG8gY3JlYXRlIE1ldGEgc2VydmljZS5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIMm1YW5ndWxhcl9wYWNrYWdlc19wbGF0Zm9ybV9icm93c2VyX3BsYXRmb3JtX2Jyb3dzZXJfZCgpOiBNZXRhO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IHRvIGNyZWF0ZSBUaXRsZSBzZXJ2aWNlLlxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gybVhbmd1bGFyX3BhY2thZ2VzX3BsYXRmb3JtX2Jyb3dzZXJfcGxhdGZvcm1fYnJvd3Nlcl9lKCk6IFRpdGxlO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gybVhbmd1bGFyX3BhY2thZ2VzX3BsYXRmb3JtX2Jyb3dzZXJfcGxhdGZvcm1fYnJvd3Nlcl9mKGRvYzogRG9jdW1lbnQsIGFwcElkOiBzdHJpbmcpOiBUcmFuc2ZlclN0YXRlO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgYWJzdHJhY3QgY2xhc3MgybVhbmd1bGFyX3BhY2thZ2VzX3BsYXRmb3JtX2Jyb3dzZXJfcGxhdGZvcm1fYnJvd3Nlcl9nIHtcclxuICAgIHByaXZhdGUgX2RvYztcclxuICAgIGNvbnN0cnVjdG9yKF9kb2M6IGFueSk7XHJcbiAgICBtYW5hZ2VyOiBFdmVudE1hbmFnZXI7XHJcbiAgICBhYnN0cmFjdCBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICBhYnN0cmFjdCBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbjtcclxuICAgIGFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoZWxlbWVudDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluIFZpZXcgRW5naW5lLCBzdXBwb3J0IGZvciBIYW1tZXIgZ2VzdHVyZXMgaXMgYnVpbHQtaW4gYnkgZGVmYXVsdC5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IMm1YW5ndWxhcl9wYWNrYWdlc19wbGF0Zm9ybV9icm93c2VyX3BsYXRmb3JtX2Jyb3dzZXJfaDogUHJvdmlkZXJbXTtcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IMm1YW5ndWxhcl9wYWNrYWdlc19wbGF0Zm9ybV9icm93c2VyX3BsYXRmb3JtX2Jyb3dzZXJfaTogUHJvdmlkZXJbXTtcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIMm1YW5ndWxhcl9wYWNrYWdlc19wbGF0Zm9ybV9icm93c2VyX3BsYXRmb3JtX2Jyb3dzZXJfaihpbmplY3RvcjogSW5qZWN0b3IpOiDJtURvbVNhbml0aXplckltcGw7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiDJtWFuZ3VsYXJfcGFja2FnZXNfcGxhdGZvcm1fYnJvd3Nlcl9wbGF0Zm9ybV9icm93c2VyX2sodHJhbnNpdGlvbklkOiBzdHJpbmcsIGRvY3VtZW50OiBhbnksIGluamVjdG9yOiBJbmplY3Rvcik6ICgpID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjb25zdCDJtWFuZ3VsYXJfcGFja2FnZXNfcGxhdGZvcm1fYnJvd3Nlcl9wbGF0Zm9ybV9icm93c2VyX2w6IFN0YXRpY1Byb3ZpZGVyW107XHJcblxyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiDJtWFuZ3VsYXJfcGFja2FnZXNfcGxhdGZvcm1fYnJvd3Nlcl9wbGF0Zm9ybV9icm93c2VyX20oY29yZVRva2VuczogTmdQcm9iZVRva2VuW10pOiBhbnk7XHJcblxyXG4vKipcclxuICogUHJvdmlkZXJzIHdoaWNoIHN1cHBvcnQgZGVidWdnaW5nIEFuZ3VsYXIgYXBwbGljYXRpb25zIChlLmcuIHZpYSBgbmcucHJvYmVgKS5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IMm1YW5ndWxhcl9wYWNrYWdlc19wbGF0Zm9ybV9icm93c2VyX3BsYXRmb3JtX2Jyb3dzZXJfbjogUHJvdmlkZXJbXTtcclxuXHJcbi8qKlxyXG4gKiBQcm92aWRlcyBET00gb3BlcmF0aW9ucyBpbiBhbnkgYnJvd3NlciBlbnZpcm9ubWVudC5cclxuICpcclxuICogQHNlY3VyaXR5IFRyZWFkIGNhcmVmdWxseSEgSW50ZXJhY3Rpbmcgd2l0aCB0aGUgRE9NIGRpcmVjdGx5IGlzIGRhbmdlcm91cyBhbmRcclxuICogY2FuIGludHJvZHVjZSBYU1Mgcmlza3MuXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBhYnN0cmFjdCBjbGFzcyDJtWFuZ3VsYXJfcGFja2FnZXNfcGxhdGZvcm1fYnJvd3Nlcl9wbGF0Zm9ybV9icm93c2VyX28gZXh0ZW5kcyDJtURvbUFkYXB0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKTtcclxuICAgIHN1cHBvcnRzRE9NRXZlbnRzKCk6IGJvb2xlYW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAc2VjdXJpdHkgUmVwbGFjaW5nIGJ1aWx0LWluIHNhbml0aXphdGlvbiBwcm92aWRlcnMgZXhwb3NlcyB0aGUgYXBwbGljYXRpb24gdG8gWFNTIHJpc2tzLlxyXG4gKiBBdHRhY2tlci1jb250cm9sbGVkIGRhdGEgaW50cm9kdWNlZCBieSBhbiB1bnNhbml0aXplZCBwcm92aWRlciBjb3VsZCBleHBvc2UgeW91clxyXG4gKiBhcHBsaWNhdGlvbiB0byBYU1Mgcmlza3MuIEZvciBtb3JlIGRldGFpbCwgc2VlIHRoZSBbU2VjdXJpdHkgR3VpZGVdKGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5KS5cclxuICogQHB1YmxpY0FwaVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgybVCUk9XU0VSX1NBTklUSVpBVElPTl9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW107XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjb25zdCDJtUJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSU19fUE9TVF9SM19fOiBuZXZlcltdO1xyXG5cclxuLyoqXHJcbiAqIEEgYERvbUFkYXB0ZXJgIHBvd2VyZWQgYnkgZnVsbCBicm93c2VyIERPTSBBUElzLlxyXG4gKlxyXG4gKiBAc2VjdXJpdHkgVHJlYWQgY2FyZWZ1bGx5ISBJbnRlcmFjdGluZyB3aXRoIHRoZSBET00gZGlyZWN0bHkgaXMgZGFuZ2Vyb3VzIGFuZFxyXG4gKiBjYW4gaW50cm9kdWNlIFhTUyByaXNrcy5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1QnJvd3NlckRvbUFkYXB0ZXIgZXh0ZW5kcyDJtWFuZ3VsYXJfcGFja2FnZXNfcGxhdGZvcm1fYnJvd3Nlcl9wbGF0Zm9ybV9icm93c2VyX28ge1xyXG4gICAgc3RhdGljIG1ha2VDdXJyZW50KCk6IHZvaWQ7XHJcbiAgICBnZXRQcm9wZXJ0eShlbDogTm9kZSwgbmFtZTogc3RyaW5nKTogYW55O1xyXG4gICAgbG9nKGVycm9yOiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgbG9nR3JvdXAoZXJyb3I6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBsb2dHcm91cEVuZCgpOiB2b2lkO1xyXG4gICAgb25BbmRDYW5jZWwoZWw6IE5vZGUsIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KTogRnVuY3Rpb247XHJcbiAgICBkaXNwYXRjaEV2ZW50KGVsOiBOb2RlLCBldnQ6IGFueSk6IHZvaWQ7XHJcbiAgICByZW1vdmUobm9kZTogTm9kZSk6IE5vZGU7XHJcbiAgICBnZXRWYWx1ZShlbDogYW55KTogc3RyaW5nO1xyXG4gICAgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBzdHJpbmcsIGRvYz86IERvY3VtZW50KTogSFRNTEVsZW1lbnQ7XHJcbiAgICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50O1xyXG4gICAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50O1xyXG4gICAgaXNFbGVtZW50Tm9kZShub2RlOiBOb2RlKTogYm9vbGVhbjtcclxuICAgIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuO1xyXG4gICAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBFdmVudFRhcmdldCB8IG51bGw7XHJcbiAgICBnZXRIaXN0b3J5KCk6IEhpc3Rvcnk7XHJcbiAgICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbjtcclxuICAgIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgfCBudWxsO1xyXG4gICAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkO1xyXG4gICAgZ2V0VXNlckFnZW50KCk6IHN0cmluZztcclxuICAgIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlcjtcclxuICAgIHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuO1xyXG4gICAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1QnJvd3NlckdldFRlc3RhYmlsaXR5IGltcGxlbWVudHMgR2V0VGVzdGFiaWxpdHkge1xyXG4gICAgc3RhdGljIGluaXQoKTogdm9pZDtcclxuICAgIGFkZFRvV2luZG93KHJlZ2lzdHJ5OiBUZXN0YWJpbGl0eVJlZ2lzdHJ5KTogdm9pZDtcclxuICAgIGZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSwgZWxlbTogYW55LCBmaW5kSW5BbmNlc3RvcnM6IGJvb2xlYW4pOiBUZXN0YWJpbGl0eSB8IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1RG9tRXZlbnRzUGx1Z2luIGV4dGVuZHMgybVhbmd1bGFyX3BhY2thZ2VzX3BsYXRmb3JtX2Jyb3dzZXJfcGxhdGZvcm1fYnJvd3Nlcl9nIHtcclxuICAgIGNvbnN0cnVjdG9yKGRvYzogYW55KTtcclxuICAgIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbjtcclxuICAgIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uO1xyXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1RG9tUmVuZGVyZXJGYWN0b3J5MiBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xyXG4gICAgcHJpdmF0ZSBldmVudE1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHNoYXJlZFN0eWxlc0hvc3Q7XHJcbiAgICBwcml2YXRlIGFwcElkO1xyXG4gICAgcHJpdmF0ZSByZW5kZXJlckJ5Q29tcElkO1xyXG4gICAgcHJpdmF0ZSBkZWZhdWx0UmVuZGVyZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdDogybVEb21TaGFyZWRTdHlsZXNIb3N0LCBhcHBJZDogc3RyaW5nKTtcclxuICAgIGNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMiB8IG51bGwpOiBSZW5kZXJlcjI7XHJcbiAgICBiZWdpbigpOiB2b2lkO1xyXG4gICAgZW5kKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1RG9tU2FuaXRpemVySW1wbCBleHRlbmRzIERvbVNhbml0aXplciB7XHJcbiAgICBwcml2YXRlIF9kb2M7XHJcbiAgICBjb25zdHJ1Y3RvcihfZG9jOiBhbnkpO1xyXG4gICAgc2FuaXRpemUoY3R4OiBTZWN1cml0eUNvbnRleHQsIHZhbHVlOiBTYWZlVmFsdWUgfCBzdHJpbmcgfCBudWxsKTogc3RyaW5nIHwgbnVsbDtcclxuICAgIGJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlOiBzdHJpbmcpOiBTYWZlSHRtbDtcclxuICAgIGJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh2YWx1ZTogc3RyaW5nKTogU2FmZVN0eWxlO1xyXG4gICAgYnlwYXNzU2VjdXJpdHlUcnVzdFNjcmlwdCh2YWx1ZTogc3RyaW5nKTogU2FmZVNjcmlwdDtcclxuICAgIGJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVVcmw7XHJcbiAgICBieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVSZXNvdXJjZVVybDtcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgybVEb21TaGFyZWRTdHlsZXNIb3N0IGV4dGVuZHMgybVTaGFyZWRTdHlsZXNIb3N0IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgX2RvYztcclxuICAgIHByaXZhdGUgX2hvc3ROb2RlcztcclxuICAgIHByaXZhdGUgX3N0eWxlTm9kZXM7XHJcbiAgICBjb25zdHJ1Y3RvcihfZG9jOiBhbnkpO1xyXG4gICAgcHJpdmF0ZSBfYWRkU3R5bGVzVG9Ib3N0O1xyXG4gICAgYWRkSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQ7XHJcbiAgICByZW1vdmVIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZDtcclxuICAgIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPik6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjb25zdCDJtUVMRU1FTlRfUFJPQkVfUFJPVklERVJTOiBQcm92aWRlcltdO1xyXG5cclxuLyoqXHJcbiAqIEluIEl2eSwgd2UgZG9uJ3Qgc3VwcG9ydCBOZ1Byb2JlIGJlY2F1c2Ugd2UgaGF2ZSBvdXIgb3duIHNldCBvZiB0ZXN0aW5nIHV0aWxpdGllc1xyXG4gKiB3aXRoIG1vcmUgcm9idXN0IGZ1bmN0aW9uYWxpdHkuXHJcbiAqXHJcbiAqIFdlIHNob3VsZG4ndCBicmluZyBpbiBOZ1Byb2JlIGJlY2F1c2UgaXQgcHJldmVudHMgRGVidWdOb2RlIGFuZCBmcmllbmRzIGZyb21cclxuICogdHJlZS1zaGFraW5nIHByb3Blcmx5LlxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgybVFTEVNRU5UX1BST0JFX1BST1ZJREVSU19fUE9TVF9SM19fOiBuZXZlcltdO1xyXG5cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIMm1ZXNjYXBlSHRtbCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiDJtWZsYXR0ZW5TdHlsZXMoY29tcElkOiBzdHJpbmcsIHN0eWxlczogQXJyYXk8YW55IHwgYW55W10+LCB0YXJnZXQ6IHN0cmluZ1tdKTogc3RyaW5nW107XHJcbmV4cG9ydCB7IMm1Z2V0RE9NIH1cclxuXHJcbi8qKlxyXG4gKiBJbiBJdnksIHN1cHBvcnQgZm9yIEhhbW1lciBnZXN0dXJlcyBpcyBvcHRpb25hbCwgc28gYXBwbGljYXRpb25zIG11c3RcclxuICogaW1wb3J0IHRoZSBgSGFtbWVyTW9kdWxlYCBhdCByb290IHRvIHR1cm4gb24gc3VwcG9ydC4gVGhpcyBtZWFucyB0aGF0XHJcbiAqIEhhbW1lci1zcGVjaWZpYyBjb2RlIGNhbiBiZSB0cmVlLXNoYWtlbiBhd2F5IGlmIG5vdCBuZWVkZWQuXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjb25zdCDJtUhBTU1FUl9QUk9WSURFUlNfX1BPU1RfUjNfXzogbmV2ZXJbXTtcclxuXHJcbi8qKlxyXG4gKiBFdmVudCBwbHVnaW4gdGhhdCBhZGRzIEhhbW1lciBzdXBwb3J0IHRvIGFuIGFwcGxpY2F0aW9uLlxyXG4gKlxyXG4gKiBAbmdNb2R1bGUgSGFtbWVyTW9kdWxlXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyDJtUhhbW1lckdlc3R1cmVzUGx1Z2luIGV4dGVuZHMgybVhbmd1bGFyX3BhY2thZ2VzX3BsYXRmb3JtX2Jyb3dzZXJfcGxhdGZvcm1fYnJvd3Nlcl9nIHtcclxuICAgIHByaXZhdGUgX2NvbmZpZztcclxuICAgIHByaXZhdGUgY29uc29sZTtcclxuICAgIHByaXZhdGUgbG9hZGVyPztcclxuICAgIGNvbnN0cnVjdG9yKGRvYzogYW55LCBfY29uZmlnOiBIYW1tZXJHZXN0dXJlQ29uZmlnLCBjb25zb2xlOiDJtUNvbnNvbGUsIGxvYWRlcj86IEhhbW1lckxvYWRlciB8IG51bGwgfCB1bmRlZmluZWQpO1xyXG4gICAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuO1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb247XHJcbiAgICBpc0N1c3RvbUV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gybVpbml0RG9tQWRhcHRlcigpOiB2b2lkO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgybVJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXTtcclxuXHJcbi8qKlxyXG4gKiBAcHVibGljQXBpXHJcbiAqIEEgYnJvd3NlciBwbHVnLWluIHRoYXQgcHJvdmlkZXMgc3VwcG9ydCBmb3IgaGFuZGxpbmcgb2Yga2V5IGV2ZW50cyBpbiBBbmd1bGFyLlxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgybVLZXlFdmVudHNQbHVnaW4gZXh0ZW5kcyDJtWFuZ3VsYXJfcGFja2FnZXNfcGxhdGZvcm1fYnJvd3Nlcl9wbGF0Zm9ybV9icm93c2VyX2cge1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBhbiBpbnN0YW5jZSBvZiB0aGUgYnJvd3NlciBwbHVnLWluLlxyXG4gICAgICogQHBhcmFtIGRvYyBUaGUgZG9jdW1lbnQgaW4gd2hpY2gga2V5IGV2ZW50cyB3aWxsIGJlIGRldGVjdGVkLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihkb2M6IGFueSk7XHJcbiAgICAvKipcclxuICAgICAgKiBSZXBvcnRzIHdoZXRoZXIgYSBuYW1lZCBrZXkgZXZlbnQgaXMgc3VwcG9ydGVkLlxyXG4gICAgICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIGV2ZW50IG5hbWUgdG8gcXVlcnkuXHJcbiAgICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBuYW1lZCBrZXkgZXZlbnQgaXMgc3VwcG9ydGVkLlxyXG4gICAgICovXHJcbiAgICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyBhIGhhbmRsZXIgZm9yIGEgc3BlY2lmaWMgZWxlbWVudCBhbmQga2V5IGV2ZW50LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgVGhlIEhUTUwgZWxlbWVudCB0byByZWNlaXZlIGV2ZW50IG5vdGlmaWNhdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBrZXkgZXZlbnQgdG8gbGlzdGVuIGZvci5cclxuICAgICAqIEBwYXJhbSBoYW5kbGVyIEEgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBub3RpZmljYXRpb24gb2NjdXJzLiBSZWNlaXZlcyB0aGVcclxuICAgICAqIGV2ZW50IG9iamVjdCBhcyBhbiBhcmd1bWVudC5cclxuICAgICAqIEByZXR1cm5zIFRoZSBrZXkgZXZlbnQgdGhhdCB3YXMgcmVnaXN0ZXJlZC5cclxuICAgICovXHJcbiAgICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbjtcclxuICAgIHN0YXRpYyBwYXJzZUV2ZW50TmFtZShldmVudE5hbWU6IHN0cmluZyk6IHtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XHJcbiAgICB9IHwgbnVsbDtcclxuICAgIHN0YXRpYyBnZXRFdmVudEZ1bGxLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIENvbmZpZ3VyZXMgYSBoYW5kbGVyIGNhbGxiYWNrIGZvciBhIGtleSBldmVudC5cclxuICAgICAqIEBwYXJhbSBmdWxsS2V5IFRoZSBldmVudCBuYW1lIHRoYXQgY29tYmluZXMgYWxsIHNpbXVsdGFuZW91cyBrZXlzdHJva2VzLlxyXG4gICAgICogQHBhcmFtIGhhbmRsZXIgVGhlIGZ1bmN0aW9uIHRoYXQgcmVzcG9uZHMgdG8gdGhlIGtleSBldmVudC5cclxuICAgICAqIEBwYXJhbSB6b25lIFRoZSB6b25lIGluIHdoaWNoIHRoZSBldmVudCBvY2N1cnJlZC5cclxuICAgICAqIEByZXR1cm5zIEEgY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBldmVudENhbGxiYWNrKGZ1bGxLZXk6IGFueSwgaGFuZGxlcjogRnVuY3Rpb24sIHpvbmU6IE5nWm9uZSk6IEZ1bmN0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBjb25zdCDJtU5BTUVTUEFDRV9VUklTOiB7XHJcbiAgICBbbnM6IHN0cmluZ106IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIMm1U2hhcmVkU3R5bGVzSG9zdCB7XHJcbiAgICBhZGRTdHlsZXMoc3R5bGVzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pOiB2b2lkO1xyXG4gICAgZ2V0QWxsU3R5bGVzKCk6IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiDJtXNoaW1Db250ZW50QXR0cmlidXRlKGNvbXBvbmVudFNob3J0SWQ6IHN0cmluZyk6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIMm1c2hpbUhvc3RBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nO1xyXG5cclxuLyoqXHJcbiAqIEFuIGlkIHRoYXQgaWRlbnRpZmllcyBhIHBhcnRpY3VsYXIgYXBwbGljYXRpb24gYmVpbmcgYm9vdHN0cmFwcGVkLCB0aGF0IHNob3VsZFxyXG4gKiBtYXRjaCBhY3Jvc3MgdGhlIGNsaWVudC9zZXJ2ZXIgYm91bmRhcnkuXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjb25zdCDJtVRSQU5TSVRJT05fSUQ6IEluamVjdGlvblRva2VuPHVua25vd24+O1xyXG5cclxuZXhwb3J0IHsgfVxyXG4iXX0=