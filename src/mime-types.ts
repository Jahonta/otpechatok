export default function () {

    if (navigator.mimeTypes && (navigator.mimeTypes.length > 0)) {
        var mimeTypesList = [];
        for (var i = 0; i < navigator.mimeTypes.length; i++) {
            mimeTypesList[mimeTypesList.length] = navigator.mimeTypes[i].type;
        }
        return mimeTypesList.join('')
    }
    return 'no';
}
