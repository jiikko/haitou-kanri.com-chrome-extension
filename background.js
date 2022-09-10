chrome.runtime.onConnect.addListener(function(port, name) {
  console.log("aaaaaaaaaaaa", info.message)
  port.onMessage.addListener(function(info, con) {
      if (info.message) { 
        console.log("bbbbbbbbbbb", info.message)
      }
  });

  return true;
});
