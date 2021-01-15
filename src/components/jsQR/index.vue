<template>
    <div class="jsqr">
        <div
            @click="restartHandle"
            class="loading-message"
            id="loadingMessage"
        >🎥 Unable to access video stream (please make sure you have a webcam enabled)</div>
        <canvas class="canvas" id="canvas" hidden></canvas>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import jsQR from 'jsqr';
import './mediaDevices-polyfill';

type data = {
    // value: string | (string | null)[];
    // img: any;
    video: any;
    timer: any;
}

export default Vue.extend({
    name: 'jsQR',
    data(): data {
        return {
            video: null,
            timer: null,
        };
    },
    mounted() {
        if (!this._isplus) {
            this.stopCapture();
            this.initHandle();
        }
    },
    beforeDestroy() {
        this.stopCapture();
        cancelAnimationFrame(this.timer);
    },
    methods: {
        stopCapture() {
            if (!this.video) return;
            if (!this.video.srcObject) return;
            const stream = (this.video as HTMLVideoElement).srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach((track) => {
                track.stop();
            });
        },
        restartHandle() {
            if (!this._isplus) {
                this.stopCapture();
                this.initHandle();
            }
        },
        initHandle() {
            const video = (document.createElement('video') as HTMLVideoElement);
            this.video = video;
            const canvasElement = (document.getElementById('canvas') as HTMLCanvasElement);
            const canvas = (canvasElement.getContext('2d') as CanvasRenderingContext2D);
            const loadingMessage = (document.getElementById('loadingMessage') as HTMLElement);

            function drawLine(begin: any, end: any, color: any) {
                canvas.beginPath();
                canvas.moveTo(begin.x, begin.y);
                canvas.lineTo(end.x, end.y);
                canvas.lineWidth = 4;
                canvas.strokeStyle = color;
                canvas.stroke();
            }

            // Use facingMode: environment to attemt to get the front camera on phones
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
                // video.srcObject = stream;
                // 旧的浏览器可能没有srcObject
                if ('srcObject' in video) {
                    video.srcObject = stream;
                } else {
                    // 防止在新的浏览器里使用它，应为它已经不再支持了
                    (video as any).src = window.URL.createObjectURL(stream);
                }
                video.setAttribute('playsinline', `${true}`); // required to tell iOS safari we don't want fullscreen
                video.play();
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                requestAnimationFrame(tick);
            });

            const tick = () => {
                loadingMessage.innerText = '⌛ Loading video...';
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    loadingMessage.hidden = true;
                    canvasElement.hidden = false;

                    canvasElement.height = video.videoHeight;
                    canvasElement.width = video.videoWidth;
                    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                    const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: 'dontInvert',
                    });
                    if (code) {
                        drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
                        drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
                        drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
                        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
                        if (code.data.trim()) {
                            this.$emit('onmarked', code.data.trim());
                        }
                    }
                }
                this.timer = requestAnimationFrame(tick);
            };
        },
        changeHandle(event: InputEvent) {
            const [file] = (event.target as any).files;
            const canvas: any = document.createElement('canvas');
            const ctx: any = canvas.getContext('2d');
            const image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
                const imageData = ctx.getImageData(0, 0, image.width, image.height);
                const code = jsQR(imageData, image.width, image.height);
                if (code) {
                    this.$emit('onmarked', code.data);
                } else {
                    this.$normalToast(this.$t('common.unrecognized'));
                }
            };
        },
    },
});
</script>

<style lang="less" scoped>
.jsqr{
    min-height: 500px;
    width: 500px;
    padding: 0;
    margin: 0;
    .loading-message {
        text-align: center;
        padding: 40px;
        // background-color: #eee;
    }
    .canvas {
        width: 100%;
        // height: 100%;
        vertical-align: top;
    }
}

</style>
