export function parsefilePath(path: string) {
    const arr = path.split('/').filter(p => p.length);
    if (!arr.length) throw Error('Invaild file path');
    const [name, parent] = [arr.pop() as string, `/${arr.join('/')}`];
    return { parent, name }
}