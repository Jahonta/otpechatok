export default function () {
    return -(new Date()).getTimezoneOffset() / 60;
}
