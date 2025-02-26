export const wcToRegex = (str:string) => {
    if (!/[%_]/g.test(str)) {
        return str;
    }
    return '^'
        + str.replace('%', '.*').replace('_', '.')
        + '$';
};
