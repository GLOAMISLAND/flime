import { v4 as uuidv4 } from 'uuid';
import { parsefilePath } from '../utils/utils';
import { opfsDirHandle } from '../utils/handle';

export async function accessFile(path?: string): Promise<OPFSFlieManager> {
    const opfsFileManager = new OPFSFlieManager(path);
    await opfsFileManager.initHandle();
    return opfsFileManager;
} 

export class OPFSFlieManager {
    private id: string;
    private path: string;
    private name: string;
    private parent: string;
    private parentHandle: FileSystemDirectoryHandle | null = null;
    private handle: FileSystemFileHandle | null = null;

    constructor(path?:string) {
        this.id = uuidv4();
        this.path = path ?? `flime-opfs/${this.id}`;
        ({ parent: this.parent, name: this.name } = parsefilePath(this.path));
    }

    public async initHandle(): Promise<OPFSFlieManager> {
        !this.parentHandle && (this.parentHandle = await opfsDirHandle(this.parent));
        !this.handle && (this.handle = await this.parentHandle?.getFileHandle(this.name));
        return this;
    }

    public async write(content: BufferSource | ReadableStream<BufferSource>, at?: number) {
        

    }
}