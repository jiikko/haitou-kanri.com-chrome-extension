async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function getStockTable(element) {
  const html = document.getElementById("table_possess_data").innerHTML;
  const normalizedHtml = html.replace(/[\t\n]/g, "");
  return normalizedHtml;
}

async function clickHandler() {
  let tab = await getCurrentTab();

  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getStockTable,
    }, (doc) => {
      const tableHtml = doc[0].result;
      const host = 'http://localhost:3000'
      const requestPath = '/api/portfolios';

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
});
