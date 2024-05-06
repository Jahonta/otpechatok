type WritableCSSProperties = {
    [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends string ? K : never
}[Extract<keyof CSSStyleDeclaration, string>]

type WritableCSSStyles = Partial<Pick<CSSStyleDeclaration, WritableCSSProperties>>

type Preset = [style?: WritableCSSStyles, text?: string]

/**
 * We use m or w because these two characters take up the maximum width.
 * Also there are a couple of ligatures.
 */
const defaultText = 'mmMwWLliI0fiflO&1'

/**
 * Settings of text blocks to measure. The keys are random but persistent words.
 */
export const presets: Record<string, Preset> = {
    /**
     * The default font. User can change it in desktop Chrome, desktop Firefox, IE 11,
     * Android Chrome (but only when the size is ≥ than the default) and Android Firefox.
     */
    default: [],
    /** OS font on macOS. User can change its size and weight. Applies after Safari restart. */
    apple: [{ font: '-apple-system-body' }],
    /** User can change it in desktop Chrome and desktop Firefox. */
    serif: [{ fontFamily: 'serif' }],
    /** User can change it in desktop Chrome and desktop Firefox. */
    sans: [{ fontFamily: 'sans-serif' }],
    /** User can change it in desktop Chrome and desktop Firefox. */
    mono: [{ fontFamily: 'monospace' }],
    /**
     * Check the smallest allowed font size. User can change it in desktop Chrome, desktop Firefox and desktop Safari.
     * The height can be 0 in Chrome on a retina display.
     */
    min: [{ fontSize: '1px' }],
    /** Tells one OS from another in desktop Chrome. */
    system: [{ fontFamily: 'system-ui' }],
}

/**
 * The result is a dictionary of the width of the text samples.
 * Heights aren't included because they give no extra entropy and are unstable.
 *
 * The result is very stable in IE 11, Edge 18 and Safari 14.
 * The result changes when the OS pixel density changes in Chromium 87. The real pixel density is required to solve,
 * but seems like it's impossible: https://stackoverflow.com/q/1713771/1118709.
 * The "min" and the "mono" (only on Windows) value may change when the page is zoomed in Firefox 87.
 */
export default function getFontPreferences(): Promise<Record<string, number>> {
    return withNaturalFonts((document, container) => {
        const elements: Record<string, HTMLElement> = {}
        const sizes: Record<string, number> = {}

        // First create all elements to measure. If the DOM steps below are done in a single cycle,
        // browser will alternate tree modification and layout reading, that is very slow.
        for (const key of Object.keys(presets)) {
            const [style = {}, text = defaultText] = presets[key]

            const element = document.createElement('span')
            element.textContent = text
            element.style.whiteSpace = 'nowrap'

            for (const name of Object.keys(style) as Array<keyof typeof style>) {
                const value = style[name]
                if (value !== undefined) {
                    element.style[name] = value
                }
            }

            elements[key] = element
            container.append(document.createElement('br'), element)
        }

        // Then measure the created elements
        for (const key of Object.keys(presets)) {
            sizes[key] = elements[key].getBoundingClientRect().width
        }

        return sizes
    })
}

/**
 * Creates a DOM environment that provides the most natural font available, including Android OS font.
 * Measurements of the elements are zoom-independent.
 * Don't put a content to measure inside an absolutely positioned element.
 */
function withNaturalFonts<T>(
    action: (document: Document, container: HTMLElement) => Promise<T> | T,
    containerWidthPx = 4000,
): Promise<T> {
    /*
     * Requirements for Android Chrome to apply the system font size to a text inside an iframe:
     * - The iframe mustn't have a `display: none;` style;
     * - The text mustn't be positioned absolutely;
     * - The text block must be wide enough.
     *   2560px on some devices in portrait orientation for the biggest font size option (32px);
     * - There must be much enough text to form a few lines (I don't know the exact numbers);
     * - The text must have the `text-size-adjust: none` style. Otherwise the text will scale in "Desktop site" mode;
     *
     * Requirements for Android Firefox to apply the system font size to a text inside an iframe:
     * - The iframe document must have a header: `<meta name="viewport" content="width=device-width, initial-scale=1" />`.
     *   The only way to set it is to use the `srcdoc` attribute of the iframe;
     * - The iframe content must get loaded before adding extra content with JavaScript;
     *
     * https://example.com as the iframe target always inherits Android font settings so it can be used as a reference.
     *
     * Observations on how page zoom affects the measurements:
     * - macOS Safari 11.1, 12.1, 13.1, 14.0: zoom reset + offsetWidth = 100% reliable;
     * - macOS Safari 11.1, 12.1, 13.1, 14.0: zoom reset + getBoundingClientRect = 100% reliable;
     * - macOS Safari 14.0: offsetWidth = 5% fluctuation;
     * - macOS Safari 14.0: getBoundingClientRect = 5% fluctuation;
     * - iOS Safari 9, 10, 11.0, 12.0: haven't found a way to zoom a page (pinch doesn't change layout);
     * - iOS Safari 13.1, 14.0: zoom reset + offsetWidth = 100% reliable;
     * - iOS Safari 13.1, 14.0: zoom reset + getBoundingClientRect = 100% reliable;
     * - iOS Safari 14.0: offsetWidth = 100% reliable;
     * - iOS Safari 14.0: getBoundingClientRect = 100% reliable;
     * - Chrome 42, 65, 80, 87: zoom 1/devicePixelRatio + offsetWidth = 1px fluctuation;
     * - Chrome 42, 65, 80, 87: zoom 1/devicePixelRatio + getBoundingClientRect = 100% reliable;
     * - Chrome 87: offsetWidth = 1px fluctuation;
     * - Chrome 87: getBoundingClientRect = 0.7px fluctuation;
     * - Firefox 48, 51: offsetWidth = 10% fluctuation;
     * - Firefox 48, 51: getBoundingClientRect = 10% fluctuation;
     * - Firefox 52, 53, 57, 62, 66, 67, 68, 71, 75, 80, 84: offsetWidth = width 100% reliable, height 10% fluctuation;
     * - Firefox 52, 53, 57, 62, 66, 67, 68, 71, 75, 80, 84: getBoundingClientRect = width 100% reliable, height 10%
     *   fluctuation;
     * - Android Chrome 86: haven't found a way to zoom a page (pinch doesn't change layout);
     * - Android Firefox 84: font size in accessibility settings changes all the CSS sizes, but offsetWidth and
     *   getBoundingClientRect keep measuring with regular units, so the size reflects the font size setting and doesn't
     *   fluctuate;
     * - IE 11, Edge 18: zoom 1/devicePixelRatio + offsetWidth = 100% reliable;
     * - IE 11, Edge 18: zoom 1/devicePixelRatio + getBoundingClientRect = reflects the zoom level;
     * - IE 11, Edge 18: offsetWidth = 100% reliable;
     * - IE 11, Edge 18: getBoundingClientRect = 100% reliable;
     */
    return withIframe((_, iframeWindow) => {
        const iframeDocument = iframeWindow.document
        const iframeBody = iframeDocument.body

        const bodyStyle = iframeBody.style
        bodyStyle.width = `${containerWidthPx}px`
        // @ts-ignore
        bodyStyle.webkitTextSizeAdjust = bodyStyle.textSizeAdjust = 'none'

        // See the big comment above
        const linesOfText = iframeDocument.createElement('div')
        linesOfText.textContent = [...Array((containerWidthPx / 20) << 0)].map(() => 'word').join(' ')
        iframeBody.appendChild(linesOfText)

        return action(iframeDocument, iframeBody)
    }, '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')
}

async function withIframe<T>(
    action: (iframe: HTMLIFrameElement, iWindow: typeof window) => Promise<T> | T,
    initialHtml?: string,
    domPollInterval = 50,
): Promise<T> {
    const d = document

    // document.body can be null while the page is loading
    while (!d.body) {
        await wait(domPollInterval)
    }

    const iframe = d.createElement('iframe')

    try {
        await new Promise<void>((_resolve, _reject) => {
            let isComplete = false
            const resolve = () => {
                isComplete = true
                _resolve()
            }
            const reject = (error: unknown) => {
                isComplete = true
                _reject(error)
            }

            iframe.onload = resolve
            iframe.onerror = reject
            const { style } = iframe
            style.setProperty('display', 'block', 'important') // Required for browsers to calculate the layout
            style.position = 'absolute'
            style.top = '0'
            style.left = '0'
            style.visibility = 'hidden'
            if (initialHtml && 'srcdoc' in iframe) {
                iframe.srcdoc = initialHtml
            } else {
                iframe.src = 'about:blank'
            }
            d.body.appendChild(iframe)

            // WebKit in WeChat doesn't fire the iframe's `onload` for some reason.
            // This code checks for the loading state manually.
            // See https://github.com/fingerprintjs/fingerprintjs/issues/645
            const checkReadyState = () => {
                // The ready state may never become 'complete' in Firefox despite the 'load' event being fired.
                // So an infinite setTimeout loop can happen without this check.
                // See https://github.com/fingerprintjs/fingerprintjs/pull/716#issuecomment-986898796
                if (isComplete) {
                    return
                }

                // Make sure iframe.contentWindow and iframe.contentWindow.document are both loaded
                // The contentWindow.document can miss in JSDOM (https://github.com/jsdom/jsdom).
                if (iframe.contentWindow?.document?.readyState === 'complete') {
                    resolve()
                } else {
                    setTimeout(checkReadyState, 10)
                }
            }
            checkReadyState()
        })

        while (!iframe.contentWindow?.document?.body) {
            await wait(domPollInterval)
        }

        return await action(iframe, iframe.contentWindow as typeof window)
    } finally {
        iframe.parentNode?.removeChild(iframe)
    }
}

function wait<T = void>(durationMs: number, resolveWith?: T): Promise<T> {
    return new Promise((resolve) => setTimeout(resolve, durationMs, resolveWith))
}
