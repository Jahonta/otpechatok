export default function () {
    return 'locationbar' in window ? window.locationbar.visible : 'no';
}
