export default function (device: boolean) {
    return device ? (function () {
        // @ts-ignore
        var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
        return orientation ? orientation : 'no';
    })() : 'no'
};
