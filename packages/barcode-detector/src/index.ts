const detector = new window.BarcodeDetector();
const canvas = document.createElement('canvas');

const video = document.createElement('video');

navigator.mediaDevices.getUserMedia({ video: { frameRate: { ideal: 10 } } }).then(stream => {
    video.src = window.URL.createObjectURL(stream);
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(video, 0, 0, 300, 300, 0, 0, 300, 300);
    const img = canvas.toDataURL("image/png");
    return detector.detect(img);
});