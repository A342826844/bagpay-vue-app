import DateForamt from './DateForamt';

const pagpay = 'pagpay://addr?';

const Empty = '';

const isBagPayUrl = (query: string) => new RegExp(pagpay).test(`${query}`);

const getQueryValue = (query: string) => `${query}`.split('?')[1] || '';

const getQueryUrl = (query: string) => {
    // const query = 'address=0x12312312323&value=10&coin=btc&menu=12';
    const querys = `${query}`.split('&');
    const res: {[elme: string]: string} = {};
    querys.forEach((item: string) => {
        const values = item.split('=');
        // eslint-disable-next-line
        res[values[0]] = values[1];
    });
    return res;
};

const queryStringify = (data: any): string => {
    if (!data) return '';
    let res = '';
    Object.keys(data).forEach((item) => {
        if (res) {
            res += `&${item}=${data[item]}`;
        } else {
            res += `${item}=${data[item]}`;
        }
    });
    return res;
};

const isHttpUrl = (str: string) => {
    if ((str.substring(0, 7) === 'http://') || (str.substring(0, 8) === 'https://')) return true;
    return false;
};

export {
    DateForamt,
    Empty,
    getQueryValue,
    isBagPayUrl,
    getQueryUrl,
    queryStringify,
    isHttpUrl,
};
