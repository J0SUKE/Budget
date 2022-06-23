export default function getClass(className,dark) {
    return `${className} ${dark ? style.dark : style.light}`;
}