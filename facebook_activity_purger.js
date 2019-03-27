// this script removes all likes+reactions (on pages or posts)
// this script also removes all posts or uploads you have made
// i did not explicitly unfriend anyone, but add the option below

// Instructions:
// head over to facebook.com and click on your profile
// click the button for your Activity Feed
// once there, open the javascript console
// in chrome it is:
// CTRL+SHIFT+I (windows) or CMD+OPT+J (mac)
// paste the below code into the console
// I was able to run this code to remove activity until 2013
// then I had to click each year before running this code again

// Explanation:
// the code below will programmatically remove your activity
// this takes a while (perhaps even hours, depending on your activity)

// NOTE: some actions cannot be deleted, (if you were tagged)
// you may wish to unfriend people as well (simply remove the "//" below)
var purgeActions = {
  Unlike: true,
  "Remove Reaction": true,
  // Unfriend: true, // (I didn't try this myself, but I believe this will work)
  Delete: true
};

var elements = document
  .querySelector(".fbTimelineLogBody")
  .getElementsByClassName("accessible_elem");
var parent;
var up = "parentNode";

function confirmDelete() {
  var deletePopups = document.querySelectorAll(".layerConfirm");
  var i = 0;
  while (i < deletePopups.length) {
    deletePopups[i].click();
    i++;
  }
  var deletePopups = document.querySelectorAll(".layerCancel");
  var i = 0;
  while (i < deletePopups.length) {
    deletePopups[i].click();
    i++;
  }
}

function remove() {
  var spans = document
    .querySelector(".uiContextualLayerPositioner:not(.hidden_elem)")
    .querySelectorAll("span");

  var unclicked = true;

  var wait = 0;

  var i = 0;

  while (i < spans.length && unclicked) {
    if (purgeActions[spans[i].innerText]) {
      var event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true
      });
      spans[i].dispatchEvent(event);
      unclicked = false;
    }
    i++;
  }
  parent.remove();
  window.setTimeout(purge, wait);
}

function purge() {
  if (!elements.length) {
    scrollTo(0, 0);
    confirmDelete();
    var lists = document
      .querySelector(".fbTimelineLogBody")
      .querySelectorAll(".uiBoxWhite");
    var i = 0;
    while (i < lists.length) {
      lists[i].remove();
      i++;
    }
    scrollTo(0, document.body.scrollHeight);
    window.setTimeout(purge, 1000);
  } else {
    confirmDelete();
    scrollTo(0, 0);
    label = elements[0][up].getAttribute("aria-label");
    parent = elements[0][up][up][up][up][up][up][up][up][up];
    if (label === "Edit") {
      elements[0].click();
      remove();
    } else {
      elements[0].remove();
      purge();
    }
  }
}
purge();
