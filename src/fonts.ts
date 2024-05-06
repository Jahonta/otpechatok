// @ts-nocheck
export default function () {
    const testString = 'mmMwWLliI0O&1';
    const textSize = '48px';

    const baseFonts = ['monospace', 'sans-serif', 'serif'];

    const fontList = [
        'sans-serif-thin',
        'ARNO PRO',
        'Agency FB',
        'Arabic Typesetting',
        'Arial Unicode MS',
        'AvantGarde Bk BT',
        'BankGothic Md BT',
        'Batang',
        'Bitstream Vera Sans Mono',
        'Calibri',
        'Century',
        'Century Gothic',
        'Clarendon',
        'EUROSTILE',
        'Franklin Gothic',
        'Futura Bk BT',
        'Futura Md BT',
        'GOTHAM',
        'Gill Sans',
        'HELV',
        'Haettenschweiler',
        'Helvetica Neue',
        'Humanst521 BT',
        'Leelawadee',
        'Letter Gothic',
        'Levenim MT',
        'Lucida Bright',
        'Lucida Sans',
        'Menlo',
        'MS Mincho',
        'MS Outlook',
        'MS Reference Specialty',
        'MS UI Gothic',
        'MT Extra',
        'MYRIAD PRO',
        'Marlett',
        'Meiryo UI',
        'Microsoft Uighur',
        'Minion Pro',
        'Monotype Corsiva',
        'PMingLiU',
        'Pristina',
        'SCRIPTINA',
        'Segoe UI Light',
        'Serifa',
        'SimHei',
        'Small Fonts',
        'Staccato222 BT',
        'TRAJAN PRO',
        'Univers CE 55 Medium',
        'Vrinda',
        'ZWAdobeF',
    ];

    function getFonts() {

        const holder = document.body;

        const spansContainer = document.createElement('div')

        const defaultWidth = {}
        const defaultHeight = {}

        const createSpan = (fontFamily) => {
            const span = document.createElement('span')
            const { style } = span
            style.fontSize = textSize
            style.position = 'absolute'
            style.top = '0'
            style.left = '0'
            style.fontFamily = fontFamily
            span.textContent = testString
            spansContainer.appendChild(span)
            return span
        }

        const createSpanWithFonts = (fontToDetect, baseFont) => {
            return createSpan(`'${fontToDetect}',${baseFont}`)
        }

        const initializeBaseFontsSpans = () => {
            return baseFonts.map(createSpan)
        }

        const initializeFontsSpans = () => {

            const spans = {}

            for (const font of fontList) {
                spans[font] = baseFonts.map((baseFont) => createSpanWithFonts(font, baseFont))
            }

            return spans
        }

        const isFontAvailable = (fontSpans) => {
            return baseFonts.some(
                (baseFont, baseFontIndex) =>
                    fontSpans[baseFontIndex].offsetWidth !== defaultWidth[baseFont] ||
                    fontSpans[baseFontIndex].offsetHeight !== defaultHeight[baseFont],
            )
        }

        const baseFontsSpans = initializeBaseFontsSpans()

        const fontsSpans = initializeFontsSpans()

        holder.appendChild(spansContainer)

        for (let index = 0; index < baseFonts.length; index++) {
            defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth
            defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight
        }

        holder.removeChild(spansContainer);
        return fontList.filter((font) => isFontAvailable(fontsSpans[font]))

    }

    return getFonts();

}
