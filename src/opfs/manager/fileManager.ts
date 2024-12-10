import { v4 as uuidv4 } from "uuid";
import { parsefilePath } from "../utils/utils";
import { opfsDirHandle } from "../utils/handle";

const opfsFileManagerCache = new Map<string, OPFSFlieManager>();

export async function accessFile(path?: string): Promise<OPFSFlieManager> {
  const pathToAccess = path ?? `flime-opfs/${uuidv4()}`;
  if (opfsFileManagerCache.has(pathToAccess))
    return opfsFileManagerCache.get(pathToAccess) as OPFSFlieManager;
  const fileManager = new OPFSFlieManager(path);
  await fileManager.initHandle();
  opfsFileManagerCache.set(pathToAccess, fileManager);
  return fileManager;
}

export class OPFSFlieManager {
  private _type: string = "file";
  private _id: string;
  private _path: string;
  private _name: string;
  private _parent: string;
  private _parentHandle: FileSystemDirectoryHandle | null = null;
  private _handle: FileSystemFileHandle | null = null;

  constructor(path: string) {
    this._id = uuidv4();
    this._path = path;
    ({ parent: this._parent, name: this._name } = parsefilePath(this._path));
  }

  public get type() {
    return this._type;
  }

  public get id(): string {
    return this._id;
  }

  public get path(): string {
    return this._path;
  }

  public get name(): string {
    return this._name;
  }

  public get handle(): FileSystemFileHandle | null {
    return this._handle;
  }

  public async initHandle(): Promise<OPFSFlieManager> {
    !this._parentHandle &&
      (this._parentHandle = await opfsDirHandle(this._parent));
    !this._handle &&
      (this._handle = await this._parentHandle?.getFileHandle(this._name));
    await createSyncAccessHandle(this);
    return this;
  }

  public async write(
    content: BufferSource | ReadableStream<BufferSource>,
    at?: number
  ) {}
}
