type foramt = {
    'M+': number;
    'd+': number;
    'h+': number;
    'm+': number;
    's+': number;
    [elem: string]: any;
}
type stradegyTime = {
    just: string;
    min: string;
    hour: string;
    yesterday: string;
    today: string;
    daybefore: string;
    weekbefore: string;
    monbefore: string;
}

export default class DateForamt {
    private date: Date;

    private SECOND = 1000;

    private MINUTE = this.SECOND * 60;

    private HOUR = this.MINUTE * 60;

    private DAY = this.HOUR * 24;

    private WEEK = this.DAY * 7;

    private MONTH = this.DAY * 30;

    private language: stradegyTime;

    constructor(date: number|string, needUTC?: boolean) {
        if (needUTC && typeof date === 'string') {
            const str = `${date} GMT+0000`.replace(/-/g, '/');
            this.date = new Date(str);
        } else {
            this.date = new Date(date);
        }
        const zh = {
            just: '刚刚',
            min: '分钟前',
            hour: '小时前',
            yesterday: '昨日',
            today: '今日',
            daybefore: '天前',
            weekbefore: '周前',
            monbefore: '月前',
        };
        const en = {
            just: 'Recently',
            min: 'Minutes ago',
            hour: 'hours ago',
            yesterday: 'Yesterday',
            today: 'Today',
            daybefore: 'days ago',
            weekbefore: 'weeks ago',
            monbefore: 'months ago',
        };
        const tw = {
            just: '剛剛',
            min: '分鐘前',
            hour: '小時前',
            yesterday: '昨日',
            today: '今日',
            daybefore: '天前',
            weekbefore: '週前',
            monbefore: '月前',
        };
        const L = {
            'en-us': en,
            'zh-CN': zh,
            'zh-tw': tw,
        };
        const lan = localStorage.getItem('lang') || 'zh-CN';
        if (lan === 'en-us' || lan === 'zh-tw' || lan === 'zh-tw') {
            this.language = L[lan];
        } else {
            this.language = L['zh-CN'];
        }
    }

    getDate(): Date {
        return this.date;
    }

    getTime(): number {
        return this.date.getTime();
    }

    // 日期
    // 获取序列化日期时间字符串
    getDateForamt(fmt = 'yyyy-MM-dd') {
        if (!DateForamt.isValidDate(this.date)) return '--';
        let res = fmt;
        if (this.date.getFullYear() <= 1999) {
            this.date = new Date(this.date.getTime() * 1000); // 判断毫秒还是秒
        }
        if (/(y+)/.test(res)) {
            res = res.replace(RegExp.$1, (`${this.date.getFullYear()}`).substr(4 - RegExp.$1.length));
        }
        const o: foramt = {
            'M+': this.date.getMonth() + 1,
            'd+': this.date.getDate(),
            'h+': this.date.getHours(),
            'm+': this.date.getMinutes(),
            's+': this.date.getSeconds(),
        };
        Object.keys(o).forEach((element) => {
            if (new RegExp(`(${element})`).test(res)) {
                const str = `${o[element]}`;
                res = res.replace(RegExp.$1, (RegExp.$1.length === 1)
                    ? str
                    : DateForamt.padLeftZero(str));
            }
        });
        return res;
    }

    // 倒计时
    // 获取序列化倒计时时间字符串
    getTimeDown(fmt = 'hh:mm:ss') {
        if (!DateForamt.isValidDate(this.date)) return '--';
        let res = fmt;
        const day = Math.floor(this.date.getTime() / this.DAY);
        const hour = Math.floor((this.date.getTime() - day * this.DAY) / this.HOUR);
        const min = Math.floor((this.date.getTime() - hour * this.HOUR) / this.MINUTE);
        const sec = Math.floor((this.date.getTime() - min * this.MINUTE) / this.SECOND);
        const o: foramt = {
            'M+': 0,
            'd+': day,
            'h+': hour,
            'm+': min,
            's+': sec,
        };
        Object.keys(o).forEach((element) => {
            if (new RegExp(`(${element})`).test(res)) {
                const str = `${o[element]}`;
                res = res.replace(RegExp.$1, (RegExp.$1.length === 1)
                    ? str
                    : DateForamt.padLeftZero(str));
            }
        });
        return res;
    }

    // 跨时区
    // 获取序列化跨时区时间字符串
    getStradegyTime() {
        if (!DateForamt.isValidDate(this.date)) return '--';
        const diffValue = new Date().getTime() - this.date.getTime();
        if (diffValue < 0) return '--';
        const monthC = diffValue / this.MONTH;
        const weekC = diffValue / this.WEEK;
        const dayC = diffValue / this.DAY;
        const hourC = diffValue / this.HOUR;
        const minC = diffValue / this.MINUTE;
        let result = '';
        if (monthC >= 1) {
            result = `${Math.floor(monthC)}${this.language.monbefore}`;
        } else if (weekC >= 1) {
            result = `${Math.floor(weekC)}${this.language.weekbefore}`;
        } else if (dayC >= 1) {
            result = `${Math.floor(dayC)}${this.language.daybefore}`;
        } else if (hourC >= 1) {
            result = `${Math.floor(hourC)}${this.language.hour}`;
        } else if (minC >= 1) {
            result = `${Math.floor(minC)}${this.language.min}`;
        } else result = this.language.just;
        return result;
    }

    static padLeftZero(str: string) {
        return `00${str}`.substr(str.length);
    }

    static isValidDate(date: Date) {
        // eslint-disable-next-line no-restricted-globals
        return date instanceof Date && !isNaN(date.getTime());
    }
}
