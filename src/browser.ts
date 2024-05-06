export default function () {
    var ua = window.navigator.userAgent;

    if (ua.search(/Firefox|FxiOS|Focus/) >= 0) return 'Firefox';
    if ((/trident/gi).test(ua) || (/msie/gi).test(ua)) return 'IE';
    if (ua.search(/Edge|Edg/) >= 0) return 'Edge';
    if (ua.search(/YaBrowser|Yowser/) >= 0) return 'Yandex';
    if (ua.search(/Opera|Opera Mobi|OPR|Opera Mini|OPiOS|OPT|MMS/) >= 0) return 'Opera';
    if (ua.search(/Amigo/) >= 0) return 'Amigo';
    if (ua.search(/AlohaBrowser/) >= 0) return 'Aloha';
    if (ua.search(/Puffin/) >= 0) return 'Puffin';
    if (ua.search(/UCBrowser|UCMini/) >= 0) return 'UC';
    if (ua.search(/SamsungBrowser/) >= 0) return 'Samsung';
    if (ua.search(/MiuiBrowser/) >= 0) return 'Miui';
    if (ua.search(/IEMobile/) >= 0) return 'IE Mobile';
    if (ua.search(/Kiwi/) >= 0) return 'Kiwi';
    if (ua.search(/Maxthon|MxBrowser|MXiOS|mxios|MxNitro/) >= 0) return 'Maxthon';
    if (ua.search(/DuckDuckGo/) >= 0) return 'DuckDuckGo';
    if (ua.search(/MZBrowser/) >= 0) return 'Meizu';
    if (ua.search(/Mint Browser/) >= 0) return 'Mint';
    if (ua.search(/HuaweiBrowser/) >= 0) return 'Huawei';
    if (ua.search(/Dolfin/) >= 0) return 'Dolfin';
    if (ua.search(/bdbrowser|baidubrowser|BaiduHD/) >= 0) return 'baidu';

    if (ua.search(/Debian Chromium/) >= 0) return 'Debian Chromium';
    if (ua.search(/Raspbian Chromium/) >= 0) return 'Raspbian Chromium';
    if (ua.search(/blackPanther OS Chromium/) >= 0) return ' blackPanther OS Chromium';
    if (ua.search(/Ubuntu Chromium/) >= 0) return 'Ubuntu Chromium';
    if (ua.search(/snap Chromium/) >= 0) return 'snap Chromium';
    if (ua.search(/HeadlessChrome/) >= 0) return 'HeadlessChrome';
    if (ua.search(/2345chrome/) >= 0) return '2345chrome';
    if (ua.search(/Nichrome/) >= 0) return 'Nichrome';
    if (ua.search(/CriOS/) >= 0) return 'CrhromeiOS';
    if (ua.search(/Chromium/) >= 0) return 'Chromium';

    if (ua.search(/Chrome/) >= 0) return 'ChromeBase';
    if (ua.search(/Safari/) > 0) return 'Safari';

    return 'Other';
}
