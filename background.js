var selectedText ='';
function contextMenuOnClick(info, tab) {
  console.log(tab, window);

  var target = localStorage["favorite_target"];		  
  var resultPage = localStorage["favorite_result"];	
  if (target == "tab") {
    var url = 'http://dict.longdo.com/search/'+info.selectionText;
      chrome.tabs.create({url: url});
    }
  else {            
    var url = 'popup.html?search='+info.selectionText;
    chrome.windows.getCurrent(function(win) {
      console.info(win);
      var width = 420;
      var height = (resultPage != 'old' ? 600 : 620);
      currentWidth = win.left / 2;
      currentHeight = win.top / 2;

      var left = win.left + tab.width - width;
      var top = win.top + (win.height - tab.height);

      chrome.windows.create({ 
          url: url, width: width, height: height,
          top : top, left : left,
          type : "popup"
      });
    });
  }
}
chrome.contextMenus.create({
  "title" : "แปลด้วยลองเบิ่ง (ลองดู)",
  "type" : "normal",
  "contexts" : ["selection"],
  "onclick" : contextMenuOnClick
});

chrome.webRequest.onHeadersReceived.addListener(
  function(info) {
      var headers = info.responseHeaders;
      for (var i=headers.length-1; i>=0; --i) {
          var header = headers[i].name.toLowerCase();
          if (header == 'x-frame-options' || header == 'frame-options' || header == 'content-security-policy') {
              headers.splice(i, 1); // Remove header
          }
      }
      return {responseHeaders: headers};
  }, {
      urls: [
          '*://*/*', // Pattern to match all http(s) pages
          // '*://*.example.org/*', // Pattern to match one http(s) site
      ], 
      types: [ 'sub_frame' ]
  }, [
      'blocking',
      'responseHeaders',
      // Modern Chrome needs 'extraHeaders' to see and change this header,
      // so the following code evaluates to 'extraHeaders' only in modern Chrome.
      chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS,
  ].filter(Boolean)
);