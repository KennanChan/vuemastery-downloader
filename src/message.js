function createWebsocketMessageListener(page) {
  const handlers = []
  let messageSegmentCount = 0
  let receivedSegmentCount = 0;
  let receivedMessage = ""
  function onMessage(message) {
    handlers.forEach(handler => handler(message));
  }
  page._client.on('Network.webSocketFrameReceived', ({ response }) => {
    const message = response.payloadData;
    if (Number.isInteger(+message)) {
      messageSegmentCount = +message;
      receivedSegmentCount = 0;
      receivedMessage = ""
      return;
    }
    if (messageSegmentCount && receivedSegmentCount < messageSegmentCount) {
      receivedSegmentCount++;
      receivedMessage += message;
      if (receivedSegmentCount === messageSegmentCount) {
        messageSegmentCount = 0;
        onMessage(receivedMessage);
      }
      return;
    }
    onMessage(message);
  })
  return {
    register(handler) {
      handlers.push(handler)
    }
  }
}

module.exports = {
  createWebsocketMessageListener
}