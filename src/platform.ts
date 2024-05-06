export default function () {
    try {
        // @ts-ignore
        const platform = (navigator.platform || (navigator.userAgentData && navigator.userAgentData.platform)).toLowerCase();
        const iosPlatforms = ['iphone', 'ipad', 'ipod', 'ipod touch'];

        if (platform.includes('mac')) return 'Mac OS';
        if (iosPlatforms.includes(platform)) return 'IOS';
        if (platform.includes('win')) return 'Win';
        if (/android/.test(navigator.userAgent.toLowerCase())) return 'Android';
        if (/CrOS/.test(navigator.userAgent.toLowerCase())) return 'CrOS';
        if (/SymbianOS/.test(navigator.userAgent.toLowerCase())) return 'SymbianOS';

        if (/linux/.test(platform)) {

            if (platform.search(/Debian/) >= 0) return 'linux Debian';
            if (platform.search(/Raspbian/) >= 0) return 'linux Raspbian';
            if (platform.search(/Ubuntu/) >= 0) return 'linux Ubuntu';
            if (platform.search(/blackPanther/) >= 0) return 'linux blackPanther';

            return 'linux';
        };

        return 'Other';

    } catch (e) {
        return 'no';
    }
}
