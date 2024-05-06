export default function () {
    try {
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        var ctx = canvas.getContext('2d');

        if (!ctx) {
            return 'no';
        }

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = "rgb(0, 0, 255)";
        ctx.fillRect(25, 65, 100, 20);
        var txt = "Adriver canvas";
        ctx.font = "14px 'Arial'";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText(txt, 25, 110);
        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.beginPath();
        ctx.arc(50, 50, 50, 0, Math.PI * 3, true);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.beginPath();
        ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        var result = canvas.toDataURL();
        document.body.removeChild(canvas);
        return result;

    } catch (e) {
        return 'no';
    }
}
