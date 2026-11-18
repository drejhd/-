function deepClone(obj, map = new Map()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (map.has(obj)) {
        return map.get(obj);
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof Map) {
        const copy = new Map();
        map.set(obj, copy);
        obj.forEach((value, key) => {
            copy.set(deepClone(key, map), deepClone(value, map));
        });
        return copy;
    }

    if (obj instanceof Set) {
        const copy = new Set();
        map.set(obj, copy);
        obj.forEach((value) => {
            copy.add(deepClone(value, map));
        });
        return copy;
    }

    if (Array.isArray(obj)) {
        const copy = [];
        map.set(obj, copy);
        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepClone(obj[i], map);
        }
        return copy;
    }

    if (obj instanceof Map || obj instanceof Set) {
        return obj;
    }

    const copy = Object.create(Object.getPrototypeOf(obj));
    map.set(obj, copy);

    const symbols = Object.getOwnPropertySymbols(obj);
    const keys = [...Object.keys(obj), ...symbols];

    for (const key of keys) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor && descriptor.enumerable) {
            copy[key] = deepClone(obj[key], map);
        }
    }

    return copy;
}


// тестовый объект
const original = {
    name: 'дом',
    date: new Date(),
    tags: ['a', 'b'],
    nested: { x: 1 },
    map: new Map([['k', { v: 2 }]]),
    set: new Set([1, 2, 3]),
    [Symbol('id')]: 42,
    fn: () => 'hello'
};
original.self = original;

const copy = deepClone(original);

// проверки перенесенных свойств и того, что при изменениях в копии, оригинал не меняется
copy.name = 'квартира';
console.log(original.name);
console.log(copy.name);

copy.nested.x = 999;
console.log(original.nested.x); 

copy.tags.push('c');
console.log(original.tags);

copy.map.set('new', { v: 3 });
console.log(original.map.has('new'));

copy.set.add(99);
console.log(original.set.has(99));

copy.date.setFullYear(2000);
console.log(original.date.getFullYear());

console.log(copy.fn());