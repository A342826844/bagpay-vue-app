// function random() {
//     return Math.round(300 + Math.random() * 700) / 10;
// }

export default function getData() {
    return {
        textStyle: {
            fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
        },
        title: {
            text: '近5日对比',
            textStyle: {
                color: '#575757',
                fontWeight: 400,
            },
            top: 10,
            left: 10,
        },
        color: '#5894EE',
        xAxis: {
            type: 'category',
            splitLine: { show: false },
            axisTick: {
                show: false,
            },
            data: (() => {
                const list = [];
                for (let i = 1; i <= 5; i++) {
                    list.push(`${i}日`);
                }
                // ["11月1日", "11月2日", "11月3日", "11月4日", "11月5日"]
                return list;
            })(),
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        series: [
            {
                name: '收入',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'top',
                },
                data: [900, 345, 393, 135, 178],
            },
        ],
    };
}
