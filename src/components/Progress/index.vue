<template>
    <div class="progress">
        <canvas ref="progressCanvas"></canvas>
        <p class="progress-poptip" v-text="percent+'%'"></p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        percent: {
            type: Number,
            default: 0,
        },
    },
    watch: {
        percent(newValue) {
            this.drawProgress(newValue);
        },
    },
    methods: {
        drawProgress(percent: number) {
            const canvas: HTMLCanvasElement = (this.$refs.progressCanvas as HTMLCanvasElement);
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            const ctx: CanvasRenderingContext2D = (canvas.getContext('2d') as CanvasRenderingContext2D);
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const normalLineWidth = 5;
            const activeLineWidth = 6;
            const radius = width > height ? Math.floor((height - activeLineWidth) / 2) : Math.floor((width - activeLineWidth) / 2);
            function drawNormalCircle() {
                ctx.save();
                ctx.strokeStyle = 'rgb(234, 238, 242)';
                ctx.lineWidth = normalLineWidth;
                ctx.beginPath();
                ctx.arc(radius + activeLineWidth / 2, radius + activeLineWidth / 2, radius, 0, Math.PI * 2, false);
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
            function drawActiveCircle(subPercent: number) {
                ctx.save();
                ctx.strokeStyle = 'rgb(45, 183, 245)';
                ctx.lineWidth = activeLineWidth;
                ctx.beginPath();
                ctx.arc(
                    radius + activeLineWidth / 2,
                    radius + activeLineWidth / 2,
                    radius,
                    -Math.PI / 2,
                    (Math.PI / 50) * subPercent - Math.PI / 2,
                    false,
                );
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
            function reDraw(subPercent: number) {
                if (radius > 0) {
                    ctx.clearRect(0, 0, width, height);
                    drawNormalCircle();
                    drawActiveCircle(subPercent);
                }
            }
            reDraw(percent);
        },
    },
});

</script>

<style lang="less" scoped>
.progress {
    position: relative;
    width: 100%;
    height: 100%;
    & > canvas {
        width: 100%;
        height: 100%;
    }
    .progress-poptip {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        transform: translateY(40%);
    }
}
</style>
