
// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("target");
  var target = select.children[select.selectedIndex].value;
  localStorage["favorite_target"] = target;

  var select2 = document.getElementById("result");
  var result = select2.children[select2.selectedIndex].value;
  localStorage["favorite_result"] = result;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "บันทึกเรียบร้อยแล้ว";
  setTimeout(function() {
    status.innerHTML = "";
  }, 1000);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["favorite_target"];
  if (!favorite) {
    return;
  }
  var select = document.getElementById("target");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == favorite) {
      child.selected = "true";
      break;
    }
  }

  var favorite2 = localStorage["favorite_result"];
  if (!favorite2) {
    return;
  }
  var select2 = document.getElementById("result");
  for (var i = 0; i < select2.children.length; i++) {
    var child = select2.children[i];
    if (child.value == favorite2) {
      child.selected = "true";
      break;
    }
  }
}
function saveHandler(e)
{
	save_options();
}
window.onload=restore_options;
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', saveHandler);
});
