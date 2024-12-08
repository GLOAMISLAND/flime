import { parsefilePath } from "./utils";

export async function opfsRootHandle(): Promise<FileSystemDirectoryHandle> {
    return await navigator.storage.getDirectory();
}

export async function opfsDirHandle(path: string): Promise<FileSystemDirectoryHandle> {
    let handle = await opfsRootHandle();
    for (const dir of path.split('/').filter(p => p.length)) {
        handle = await handle.getDirectoryHandle(dir);
    }
    return handle;
}

export async function opfsFileHandle(path: string): Promise<FileSystemFileHandle> {
    const { parent, name } = parsefilePath(path);
    const parentHandle = await opfsDirHandle(parent);
    return parentHandle.getFileHandle(name);
} 