var oneDepth_a_s = kipfa.$('.one_depth > li > a');
var oneDepth_li_s = kipfa.$('.one_depth > li');
var oneDepth_length = oneDepth_li_s.length;
var twoDepth_a_s = kipfa.$('.two_depth > li > a');
var twoDepth_length = twoDepth_a_s.length;

while (oneDepth_length--) {
	oneDepth_li_s[oneDepth_length].onmouseover = expandMenu;
	oneDepth_li_s[oneDepth_length].onmouseout = collapseMenu;
	oneDepth_a_s[oneDepth_length].onmouseover = expandMenu_oneDepth;
	oneDepth_a_s[oneDepth_length].onmouseout = collapseMenu_oneDepth;
	oneDepth_a_s[oneDepth_length].onfocus = expandMenu_oneDepth;
	oneDepth_a_s[oneDepth_length].onblur = collapseMenu_oneDepth;
}

while (twoDepth_length--) {
	twoDepth_a_s[twoDepth_length].onmouseover = expandMenu_twoDepth;
	twoDepth_a_s[twoDepth_length].onmouseout = collapseMenu_twoDepth;
	twoDepth_a_s[twoDepth_length].onfocus = expandMenu_twoDepth;
	twoDepth_a_s[twoDepth_length].onblur= collapseMenu_twoDepth;
}
function expandMenu  () {
	var target = kipfa.$('.gnb .on');
	if (target.nodeName) {
		target.classList.remove('on');
	}
	this.classList.add('on');
}

function collapseMenu () {
	this.classList.remove('on');
}

function expandMenu_oneDepth () {
	var target = kipfa.$('.gnb .on');
	if (target.nodeName) {
		target.classList.remove('on');
	}
	this.parentNode.classList.add('on');
}

function collapseMenu_oneDepth () {
	this.parentNode.classList.remove('on');}

function expandMenu_twoDepth  () {
	this.parentNode.parentNode.parentNode.classList.add('on');
}

function collapseMenu_twoDepth () {
	this.parentNode.parentNode.parentNode.classList.remove('on');
}

