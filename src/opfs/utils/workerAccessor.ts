import { OPFSFlieManager } from "../manager/fileManager";

const opfsWorkerMessageMap = new Map();

export const opfsSyncAccessHandle = {
  write: async (
    fm: OPFSFlieManager,
    content: Transferable[] = [],
    at?: number
  ) => {
    const startPos = at ?? (await opfsSyncAccessHandle.getSize(fm));
    await postMessageToWorker();
  },
  read: async (at?: number) => {},
  getSize: async (fm) => {},
  initHandle: async () => {},
};

async function postMessageToWorker(
  {
    messageId,
    action,
    messageData,
    fm,
  }: {
    messageId: string;
    action: string;
    messageData: Record<string, any>;
    fm: OPFSFlieManager;
  },
  transData: Transferable[] = []
): Promise<void> {
  const message = {
    messageId,
    action,
    messageData: {
      ...messageData,
      target: {
        id: fm.id,
        path: fm.path,
        handle: fm.handle,
      },
    },
  };
  return new Promise((resolve, reject) => {
    opfsWorkerMessageMap.set(messageId, { resolve, reject });
  });
}

async function createSyncAccessHandle(file: OPFSFlieManager): Promise<void> {
  await opfsWorkerAccessor.initHandle();
}
