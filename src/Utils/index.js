export function getFlatColors() {
    return {
        main: getComputedStyle(document.documentElement).getPropertyValue('--main'),
        darkMain: getComputedStyle(document.documentElement).getPropertyValue('--dark-main'),
        one: getComputedStyle(document.documentElement).getPropertyValue('--one'),
        two: getComputedStyle(document.documentElement).getPropertyValue('--two'),
        three: getComputedStyle(document.documentElement).getPropertyValue('--three'),
        four: getComputedStyle(document.documentElement).getPropertyValue('--four'),
        five: getComputedStyle(document.documentElement).getPropertyValue('--five'),
        gray: getComputedStyle(document.documentElement).getPropertyValue('--gray'),
        clearTextColor: getComputedStyle(document.documentElement).getPropertyValue('--clear-text-color'),
        DarkTextColor: getComputedStyle(document.documentElement).getPropertyValue('--dark-text-color')
    }
}