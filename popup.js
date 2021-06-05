function doClose(e)
{
    if (!e) e = window.event;

    if (e.keyCode)
    {
        if (e.keyCode == "27") window.close();
    }
    else if (e.charCode)
    {
        if (e.charCode == "27") window.close();
    }
}
function initPage()
{
  document.dict.word.focus();
	var searchWord = gup("search");
	if(searchWord!="")
	{
		document.dict.word.value = searchWord;
    document.body.style.width = '100%';
		loadResult(true);
	}
	else
	{
		chrome.extension.onRequest.addListener(
			function(request, sender, sendResponse) {
				document.dict.word.value=request.selectedText;
				loadResult();
		});
	}
}

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
function trim(stringToTrim)
{
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function loadResult(isWindow)
{
	iframe = document.getElementById('resultFrame');
  var resultPage = localStorage["favorite_result"];	
	if(trim(document.dict.word.value)!="")
	{
    document.body.style.height = isWindow ? '100vh' : '600px';
    iframe.style.height = '560px';
		iframe.src = 'https://dict.longdo.com/mobile' + (resultPage == 'old' ? '.php' : '/') + '?search='+document.dict.word.value;
    if (resultPage != 'old'){
      document.getElementById('dict').remove();
      iframe.style.height = '100%';
    }
	}
	else
	{
		iframe.height = '0';
		iframe.src='about:blank';
	}
}
function searchKeyPress(e)
{
    if (window.event) { e = window.event; }
    if (e.keyCode == 13)
    {
      loadResult();
    }
}
function stopRKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}

function translateHandler(e) {
  loadResult();
}

function closeHandler(e)
{
  self.close();
}

document.onkeypress = stopRKey;
document.onkeydown = doClose;
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('translateButton').addEventListener('click', translateHandler);
  document.getElementById('closeButton').addEventListener('click', closeHandler);
  document.getElementById('searchText').addEventListener('keypress', searchKeyPress);
  document.getElementById('translateButton').focus();
});
window.onload=initPage;
