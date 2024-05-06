export default function () {
    try {
        var gl = document.createElement('canvas').getContext('webgl');
        
        if (!gl) {
            throw new Error();
        }
        var ext = gl.getExtension('WEBGL_debug_renderer_info');

        if (!ext) {
            throw new Error();
        }
        var result = {
            vendor: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL),
            card: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
        };

        return result;
    } catch (e) {
        return {
            vendor: 'no',
            card: 'no'
        };
    }
}
