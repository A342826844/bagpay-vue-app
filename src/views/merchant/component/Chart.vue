<template>
    <div class="chart-box">
    <v-chart
        :option="bar"
        :init-options="initOptions"
        ref="bar"
        theme="ovilia-green"
        class="chart"
        autoresize
        :loading="barLoading"
        :loadingOptions="barLoadingOptions"
        @zr:click="handleZrClick"
        @click="handleClick"
    />
    </div>
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
    GridComponent,
    PolarComponent,
    GeoComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    VisualMapComponent,
    DatasetComponent,
} from 'echarts/components';
// eslint-disable-next-line
import { default as VChart, THEME_KEY } from 'vue-echarts';

import getBar from './bar';

use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    PolarComponent,
    GeoComponent,
    VisualMapComponent,
    DatasetComponent,
]);

export default {
    name: 'HelloWorld',
    components: {
        VChart,
    },
    provide: {
        [THEME_KEY]: 'dark',
    },
    data() {
        return {
            bar: getBar(),
            barLoading: false,
            initOptions: {
                renderer: '',
            },
            barLoadingOptions: {
                text: 'Loading…',
                color: '#4ea397',
                maskColor: 'rgba(255, 255, 255, 0.4)',
            },
        };
    },
    methods: {
        handleClick(...args) {
            console.log(this.initOptions);
            console.log('click from echarts', ...args);
        },
        handleZrClick(...args) {
            console.log('click from zrender', ...args);
        },
    },
};
</script>

<style scoped>
.chart {
  height: 800px;
}
</style>
