interface ObjectMap {
    [elem: string]: any;
}

function typeOf(obj: any): string {
    const { toString } = Object.prototype;
    const map: ObjectMap = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    };
    return map[toString.call(obj)];
}

// deepCopy
function deepCopy(data: any) {
    const t = typeOf(data);
    let o: ObjectMap;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        // eslint-disable-next-line
        for (let i = 0; i < data.length; i++) {
            (o as Array<any>).push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        Object.keys(data).forEach((item) => {
            (o as ObjectMap)[item] = deepCopy(data[item]);
        });
    }
    return o;
}

function isObject(value: any) {
    const type = typeOf(value);

    return type === 'function' || type === 'object';
}

function isArray(value: any) {
    return typeOf(value) === 'array';
}

const merge = (target: any, source: any) => {
    if (!isObject(target) || !isObject(source)) {
        return;
    }

    Object.keys(source).forEach((item) => {
        // eslint-disable-next-line
        if (target.hasOwnProperty(item)) {
            const targetProp = target[item];
            const sourceProp = source[item];

            if (isObject(sourceProp) && isObject(targetProp) && !isArray(sourceProp) && !isArray(targetProp)) {
                merge(targetProp, sourceProp);
            } else if (source[item] || source[item] === 0 || source[item] === false) {
                // eslint-disable-next-line
                target[item] = source[item];
            }
        }
    });
};

/**
 * 对比两个数组是否相同
 * @param {any} one
 * @param {any} tow
 * @return {boolean}
 */
const sameValue = (one: any, tow: any) => {
    if (one === tow) return true;
    try {
        const val1 = JSON.stringify(one);
        const val2 = JSON.stringify(tow);
        return val1 === val2;
    } catch (e) {
        return false;
    }
};
export { deepCopy, merge, sameValue };
