self.onmessage = async (e) => {
  const { messageId, action, messageData } = e.data;
  const { target, actionData } = messageData;

  const sendBackMessage = (eventType: 'success' | 'error', callbackData?: any, transData?: Transferable[] = []) => {
    self.postMessage(
      {
        messageId,
        eventType,
        messageData: callbackData,
      },
      transData
    );
  };
  try{ 
    if (action === 'initHandle') {
      const {handle} = target;
      if (!handle) throw new Error('File handle empty');
      const syncAccessHandle = await handle.createSyncAccessHandle();
      syncAccessHandle.set(target.id, syncAccessHandle);
      sendBackMessage('success');
    }
  }
};
