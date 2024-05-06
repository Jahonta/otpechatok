// @ts-nocheck
export default function () {

    if (screen.height !== screen.availHeight) {
        var menuParams = {};

        menuParams['size'] = Math.abs(screen.height - screen.availHeight);

        if (screen.availTop === 0) {
            menuParams['orientation'] = '1';
        } else {
            menuParams['orientation'] = '2';
        }
        return menuParams;

    } else if (screen.width !== screen.availWidth) {
        var menuParams = {};

        menuParams['size'] = Math.abs(screen.width - screen.availWidth);

        if (screen.availLeft === 0) {
            menuParams['orientation'] = '3';
        } else {
            menuParams['orientation'] = '4';
        }
        return menuParams;
    }

    return {
        size: 'no',
        orientation: 'no'
    };
}
