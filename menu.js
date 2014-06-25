// -----------------------------------------------------------------------------------
//
//	Menu Script v1
//	by Max Edmands - http://www.maxedmands.com
//	1/4/2008
//
//	For more information on this script, email:
//	me@maxedmands.com
//
// -----------------------------------------------------------------------------------


//
// Global Variables
//
var currentMenuItem = null;
var menuElement = null;

var currentlyShowingHiddenText = false;

//
// Menu class declaration
//
var Menu = Class.create();

Menu.prototype = {
	
	initialize: function() {
		menuElement = $("menu");
		
		// Loop through all the links in the menu, and attach onclick events to them
		var anchors = $$('#menu ul li a');
		for (var i = 0; i < anchors.length; i++) {
			var anchor = anchors[i];
			anchor.onclick = function () { myMenu.select(this.getAttribute('href')); return false; }
		}
		
		// Find all "read more" buttons, and attack onclick events to them
		var read_more_buttons = $$("#anterior .read_more");
		for (var i = 0; i < read_more_buttons.length; i++) {
			var read_more_button = read_more_buttons[i];
			read_more_button.onclick = function () { myMenu.reveal(this); return false };
		}
		
	},
	
	select: function(link) {
		
		// Strip the '#' character off the front of the link
		var name = link.substring(link.lastIndexOf('#')+1, link.length);
		
		// Deselect the old menu item and make the old content area invisible
		if(currentMenuItem != null) {
			$(currentMenuItem.concat("_nav")).removeClassName("selected");
			$(currentMenuItem).removeClassName("selected");
		}
		else {
			menuElement.removeClassName("none_selected");
		}
		
		// Select the current menu item
		$(name.concat("_nav")).addClassName("selected");
		
		// Make the new content area visible
		$(name).addClassName("selected");
		
		// Get the image src
		var img = $(name.concat("_img"));
		if(img != null) {
			var imgsrc = img.getAttribute("src");
			menuElement.setStyle({ backgroundImage: "url(".concat(imgsrc).concat(")") })
			menuElement.addClassName("picture");
		}
		else {
			menuElement.removeClassName("picture");
		}
		
		// Update currentMenuItem
		currentMenuItem = name;
	},
	
	reveal: function(div) {
		div.removeClassName("read_more");
		
		var hideButton = document.createElement("div");
		hideButton.setAttribute('class','hide_this_button');
		div.appendChild(hideButton);
		
		hideButton.onclick = function() {
			myMenu.hide(div, hideButton);
			return false;
		};
		
		div.onclick = function() {
			return false;
		}
		
	},
	
	hide: function(div, hideButton) {
		div.addClassName("read_more");
		div.removeChild(hideButton);
		
		div.onclick = function() {
		    alert(event.element().getClassNames());
			if(event.element().hasClassName("read_more")) {
				myMenu.reveal(div);
			}
		}
	}
	
}

function initMenu() { myMenu = new Menu(); }
Event.observe(window, 'load', initMenu, false);