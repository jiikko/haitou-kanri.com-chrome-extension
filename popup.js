async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function getStockTable(element) {
  const html = document.getElementById("table_possess_data").innerHTML;
  const normalizedHtml = html.
    replace(/[\t\n]/g, '').
    replace(/<!--[\s\S]*?-->/g, ''). // コメントの削除
    replace(/href="+[^"]*?"/g, ''). // 属性の削除
    replace(/class="+[^"]*?"/g, '').
    replace(/style="+[^"]*?"/g, '').
    replace(/align="+[^"]*?"/g, '').
    replace(/src="+[^"]*?"/g, '').
    replace(/width="+[^"]*?"/g, '').
    replace(/border="+[^"]*?"/g, '').
    replace(/cellspacing="+[^"]*?"/g, '').
    replace(/colspan="+[^"]*?"/g, '').
    replace(/title="+[^"]*?"/g, '').
    replace(/cellpadding="+[^"]*?"/g, '');

  return normalizedHtml;
}

async function saveTokenHandler() {
  const value =  document.getElementById('tokenField').value;
  await chrome.storage.sync.set({ ACCESS_TOKEN: value }, function() {
    console.log('Value is set to ' + value);
  });
}

async function clickHandler() {
  let tab = await getCurrentTab();
  var oReq = new XMLHttpRequest();

  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getStockTable,
    }, (doc) => {
      const tableHtml = doc[0].result;
      const host = 'http://localhost:3000'
      const requestPath = '/home/api/import/rakuten';

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${host}${requestPath}`);
      xhr.setRequestHeader('Content-Type', 'application/json');
      const data =JSON.stringify({ html: tableHtml });
      xhr.onload = () => {
        console.log(xhr.status);
        console.log("success!");
      };
      xhr.onerror = () => {
        console.log(xhr.status);
        console.log("error!");
      };
      xhr.send(data);
    }
  );
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('importRakuten').addEventListener('click', clickHandler);
  document.getElementById('tokenSaveButton').addEventListener('click', saveTokenHandler);

  chrome.storage.sync.get(['ACCESS_TOKEN'], function(result) {
    document.getElementById('tokenField').value = result["ACCESS_TOKEN"] || "";
  });
});
