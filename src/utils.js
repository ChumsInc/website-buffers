export const wcToRegex = (str) => {
    if (/[%_]/g.test(str) === false) {
        return str;
    }
    return '^'
        + str.replace('%', '.*').replace('_', '.')
        + '$';
};
