let clickHandler;
let scrollOptions;
let prevented = false;
const classList = { toggle: () => {} };
const topButton = {
    classList,
    addEventListener: (type, handler) => {
        if (type === 'click') clickHandler = handler;
    },
};
const hero = { getBoundingClientRect: () => ({ top: -1000, bottom: -1 }) };
const footer = { getBoundingClientRect: () => ({ top: 0, bottom: 551 }) };
global.document = {
    querySelector: (selector) => ({
        '#footer .top-button': topButton,
        '#hero': hero,
        '#footer': footer,
    })[selector] || null,
    querySelectorAll: () => [],
};
global.window = {
    innerHeight: 900,
    matchMedia: () => ({ matches: false }),
    addEventListener: () => {},
    requestAnimationFrame: (callback) => callback(),
    setInterval: () => 1,
    clearInterval: () => {},
    scrollTo: (options) => { scrollOptions = options; },
};
require('./js/main.js');
clickHandler({ preventDefault: () => { prevented = true; } });
console.log(JSON.stringify({ prevented, scrollOptions }));
