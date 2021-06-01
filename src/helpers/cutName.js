

export const cutName = (name) => {
    if(name) {
        const split = name.split(' ');
        return split[0];
    }
}