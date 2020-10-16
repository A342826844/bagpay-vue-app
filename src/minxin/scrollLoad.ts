import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            loadMore: false,
            isEnd: false,
        };
    },
    methods: {
        scrollLoad(event: Event, fn: Function) {
            const scroll = (event.target as HTMLElement);
            const { scrollTop, scrollHeight, clientHeight } = scroll;
            if ((clientHeight + scrollTop > scrollHeight - 50) && (clientHeight + scrollTop !== scrollHeight) && !this.loadMore && !this.isEnd) {
                this.loadMore = true;
                if (typeof fn === 'function') {
                    fn();
                } else {
                    console.warn(`${fn} is a not Function`);
                }
            }
        },
    },
});
