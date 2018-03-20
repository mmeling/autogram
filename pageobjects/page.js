"use strict";

class Page {
	constructor ({
	} = {}) {
		// this._utils = utils.Utility;
		// this._request = utils.Request;
		// this._facebookPages = fb.facebookPages;
		// this._FacebookApi = fb.FacebookApi;
		// this._twitterApi = tw.TwitterApi;
	}

	get utils () {
		return this._utils;
	}

	get request () {
		return this._request;
	}

	get api () {
		return this._api;
	}

	get FacebookApi () {
		return this._FacebookApi;
	}

	get facebookOwnedPages () {
		return this._facebookPages;
	}

	get twitterApi () {
		return this._twitterApi;
	}

	/**
	* Page is a generic collection of helper methods to keep us from rewriting
	* code over and over again

	/**
	* Method to open a url
	* This sets the test db header if the globar var is set
	* @param path	The path to hit
	**/
	open (path='', host=browser.options.baseUrl) {
		host = (host === browser.options.baseUrl) ? host = '/' : host;
		browser.url(`${host}${path}`);
	}

	/**
	* This method handles errors.
	* This is used so we can have a better stack trace.
	* @param {Error} err
	**/
	handleError (err) {
		throw new Error(err.message);
	}

	/**
	* This method waits for a popup. Most modals use the same class, so it's
	* pretty generic. When in doubt, you may need to write a new one for your
	* specific popup
	**/
	waitForPopup (ele = '.bbm-modal') {
		ele = (typeof ele === 'string') ? ele : ele.selector;
		try {
			this.waitForElement(browser.element(ele));
		} catch(err) {
			this.handleError(err);
		}
	}

	/**
	* This method waits for a popup to be gone. Most modals use the same class, so it's
	* pretty generic. When in doubt, you may need to write a new one for your
	* specific popup
	**/
	waitForPopupGone (ele = '.bbm-modal') {
		ele = (typeof ele === 'string') ? ele : ele.selector;
		try {
			browser.waitUntil(() => !browser.element(ele).isVisible(), 5000);
		} catch(err) {
			this.handleError(err);
		}
	}

	/**
	* This method waits for the generic DialogUtilityNotify to pop up
	**/
	waitForPopupNotify () {
		this.driver.wait(until.elementLocated(
			By.className('DialogUtilityNotify')));
	}

	/**
	* This method waits for the DlgLoading to pop up. This is old code, so it
	* may need to be reworked or deprecated
	**/
	waitForLoadingDialog () {
		var locator = By.className('DlgLoading');
		this.driver.wait(until.elementLocated(locator));
		var element = this.driver.findElement(locator);
		this.driver.wait(until.stalenessOf(element));
	}

	/**
	* This method waits for a generic toast message to appear. This is old code,
	* so it may need to be reworked or deprecated
	**/
	waitForToast () {
		this.driver.wait(until.elementLocated(
			By.className("notification_message")));
	}

	/**
	* This method kills all toast messages on screen. This is old code,
	* so it may need to be reworked or deprecated
	**/
	removeAllToasts () {
		this.driver.executeScript("$('.notification_message').remove();");
	}

	/**
	* This method clicks on a dropdown, then takes the generic select xpath you
	* sent, replaces the "VALUE" with the selection you want, then finds and
	* clicks that element. It takes the element, the generic selection xpath,
	* and the value you want as parameters.
	**/
	selectComboBox (element, select, value) {
		try {
			let sel = (typeof select === 'string') ? select : select.selector;
			sel = sel.replace("VALUE", value);
			this.clickHardWait(element, 'Combo Box');
			this.clickHardWait(browser.element(sel), 'Combo Box');
			browser.logger.info('Selected Option: ' + value);
		} catch(err) {
			this.handleError(err);
		}
	}

	/**
	* This method clicks on a dropdown, then takes the generic select xpath you
	* sent, replaces the "VALUE" with the selection you want, then finds and
	* clicks that element. It takes the element, the text field, the generic
	* selection xpath, and the value you want as parameters.
	**/
	selectComboBoxText (element, textbox, select, value) {
		let sel = (typeof select === 'string') ? select : select.selector;
		sel = sel.replace("VALUE", value);
		try {
			this.clickHardWait(element, 'Combo Box');
			this.waitForElement(textbox, 'Combo Box');
			// We have to use keys because some dumb javascript somewhere is being
			// dumb and making setValue not work
			textbox.setValue(value);
			this.clickHardWait(browser.element(sel), 'Combo Box Value: ' + value);
		} catch(err) {
			this.handleError(err);
		}
	}

	/**
	* This method unchecks a checkbox *IF* it's checked
	* this takes an element and a label
	* if no label is supplied, the label defaults to the
	* element so it keeps on trucking
	* It takes the element, and a label as parameters, with the value of the
	* label being set to element just in case you didn't send a label
	**/
	checkBox (element, label = element) {
		if (!element.isSelected()) {
			this.clickElement(label, 'Checkbox');
		};
	}

	/**
	* This method toggles a checkbox no matter what the default check status is
	* this takes an element and a label
	* if no label is supplied, the label defaults to the
	* element so it keeps on trucking
	* It takes the element, and a label as parameters, with the value of the
	* label being set to element just in case you didn't send a label
	**/
	toggleCheckbox (element, label = element) {
		this.clickElement(label, 'Checkbox');
	}

	/**
	* This method unchecks a checkbox *IF* it's checked
	* this takes an element and a label
	* if no label is supplied, the label defaults to the
	* element so it keeps on trucking
	* It takes the element, and a label as parameters, with the value of the
	* label being set to element just in case you didn't send a label
	**/
	uncheckBox (element, label = element) {
		// this takes an element and a label
		// if no label is supplied, the label defaults to the
		// element so it keeps on trucking
		if (element.isSelected()) {
			this.clickElement(label, 'Checkbox');
		};
	}

	/**
	* This method checks if a checkbox is checked
	* @param element The element
	**/
	isChecked (element) {
		return element.isSelected();
	}

	/*
	* This will send the full path to the file you specified
	* from the root of the selenium project
	* You need to send in pageobjects/specs/testdata and then
	* the filename
	**/
	fullPath (file) {
		return __dirname.substr(0, __dirname.lastIndexOf("/")).concat(file);
	}

	/**
	* This method returns true or false based on the existance of an error. I
	* think I spelled existence wrong...
	* It takes the error xpath and the error message in as parameters
	**/
	hasError (element, errorMsg) {
		return browser.isExisting(element.replace("VALUE", errorMsg));
	}

	/**
	* This dude uploads a file to an element...
	* At least I hope that's what it does
	**/
	uploadFile (element, filename) {
		element.setValue(this.fullPath(filename));
	}

	/**
	* Method will get a list of open window ids, switch to all of them,
	* get the title of the window
	* and id and store them in an array as a key/pair
	* @return allWindows  List of Window ids with title.
	**/
	getListOfOpenWindows () {
		let allWindows = [];
		let allWindowIds = browser.getTabIds();
		for (var ff = 0; ff < allWindowIds.length; ff++ ) {
			browser.window(allWindowIds[ff]);
			let winKeyPair = {"name" : browser.getTitle(), "id" : allWindowIds[ff]};
			allWindows.push(winKeyPair);
		}
		return allWindows;
	}

	/**
	* Method will close a window. You must get the window ids by
	* calling getListOfOpenWindows() first.
	* E.G. allOpenWindows = ManageNetworks.getListOfOpenWindows();
	*  ManageNetworks.closeWindow(allOpenWindows[1].id);
	* @param currWin  The id of the window you want to close
	**/
	closeWindow (currWin) {
		browser.logger.info("Closing window: "+currWin);
		browser.window(currWin);
		browser.window();
	}

	/**
	* Method will bring a window to the forefront so you can interact with it.
	* You must get the window ids by calling getListOfOpenWindows() first.
	* E.G. allOpenWindows = ManageNetworks.getListOfOpenWindows();
	*  ManageNetworks.bringWindowToFocus(allOpenWindows[1].id);
	* @param mainWinId  The id of the window you want to interact with.
	**/
	bringWindowToFocus (mainWinId) {
		browser.logger.info("Switching to window: "+mainWinId);
		browser.window(mainWinId);
	}

	currentDay () {
		var d = new Date();
		return d.getDate();
	}

	currentMonth (len = 100) {
		var d = new Date();
		var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";
		return month[d.getMonth()].substring(0,len);
	}

	isString (v) {
		return typeof v === 'string' || v instanceof String;
	}

	isDict (v) {
		return typeof v === 'object' && v !== null &&
			!(v instanceof Array) && !(v instanceof Date);
	}

	randFName () {
		let Chance = require('chance');
		let chance = new Chance();
		return chance.first()
	}

	randLName () {
		let Chance = require('chance');
		let chance = new Chance();
		return chance.last()
	}

	randEmail () {
		let Chance = require('chance');
		let chance = new Chance();
		return chance.natural({min: 99999, max: 9999999})  + '@test.meetsoci.com';
	}

	// this grabs the URL and grabs the project id
	getProjectId () {
		let reg = /project\/(\d+)/;
		if (browser.getUrl().includes('undefined')) {
			browser.logger.error('URL is missing project ID');
		} else {
			return browser.getUrl().match(reg)[1];
		}
	}

	// this grabs the URL and grabs the user id
	getUserId () {
		let reg = /account\/(\d+)/;
		if (browser.getUrl().includes('undefined')) {
			browser.logger.error('URL is missing user ID');
		} else {
			return browser.getUrl().match(reg)[1];
		}
	}

	waitForElement (ele, name = 'element', wait=2000) {
		try {
			let sel = (typeof ele === 'string') ? ele : ele.selector;
			browser.logger.info('Waiting for ' + name + ' to become enabled');
			browser.waitUntil(() => browser.isVisible(sel), wait, name + ' failed to become visible');
			browser.waitUntil(() => browser.isEnabled(sel), wait, name + ' failed to become enabled');
		} catch (err) {
			this.handleError(err);
		}
	}

	/**
	* Wait for Element: Now with extra arguments!
	* @ele The element to click
	* @name The name of the item to click
	* @wait How long to wait after clicking before moving on
	* @toExist if we want to wait for it to be visible, or invisible
	**/
	waitForElem ({
		ele = null,
		name = 'element',
		wait = 3000,
		reverse = false
	} = {}) {
		try {
			const sel = (typeof ele === 'string') ? ele : ele.selector;
			const stat = reverse ? 'disabled' : 'enabled';
			browser.logger.info(`Waiting for ${name} to become ${stat}`);
			browser.waitForVisible(sel, wait, reverse);
			browser.waitForEnabled(sel, wait, reverse);
		} catch(err) {
			this.handleError(err);
		}
	}

	/**
	* Generic Button Click
	* @ele The element to click
	* @name The name of the item to click
	* @wait How long to wait after clicking before moving on
	**/
	clickElement (ele, name = 'element', wait=0) {
		let sel = (typeof ele === 'string') ? ele : ele.selector;
		try {
			this.waitForElem({ ele, name });
			browser.logger.info('Attempting to click ' + name + ' button');
			browser.click(sel);
		} catch (err) {
			browser.logger.error('Failed to click ' + name + ' button');
			this.handleError(err);
		}
		browser.logger.info('Clicked ' + name + ' button');
		browser.pause(wait);
	}

	/**
	* Generic Button Click
	* @ele The element to click
	* @name The name of the item to click
	* @wait How long to wait after clicking before moving on
	**/
	clickHardWait (ele, name = 'element', wait=1000) {
		let sel = (typeof ele === 'string') ? ele : ele.selector;
		browser.pause(wait);
		try {
			browser.logger.info('Attempting to click ' + name + ' button');
			browser.click(sel);
		} catch (err) {
			browser.logger.error('Failed to click ' + name + ' button');
			browser.logger.error(err);
			this.handleError(err);
		}
		browser.logger.info('Clicked ' + name + ' button');
		browser.pause(wait);
	}

	/**
	* Generic get text of element
	* @ele The element to replace
	* @name The name of the item to edit
	* @wait How long to wait after getting text before moving on
	**/
	getText (ele, name = 'element', wait=0) {
		let sel = (typeof ele === 'string') ? ele : ele.selector;
		let tempString = '';
		try {
			this.waitForElem({ ele, name });
			browser.logger.info('Attempting to get text from ' + name);
			tempString = ele.getText();
		} catch (err) {
			browser.logger.error('Failed to get text from ' + name);
			this.handleError(err);
		}
		browser.logger.info('Retreived data '+tempString);
		browser.pause(wait);
		return tempString;
	}

	/**
	* Generic Replace Text
	* @ele The element to replace
	* @name The name of the item to edit
	* @old The substring to replace
	* @new The string to replace with
	* @wait How long to wait after replacing text before moving on
	**/
	replaceSubString (ele, name = 'element', oldText='', newText='', wait=0) {
		let sel = ele.selector;
		let tempString = '';
		try {
			this.waitForElem({ ele, name });
			browser.logger.info('Attempting to get text from ' + name);
			tempString = ele.getText();
			browser.logger.info('Attempting to replace ' + oldText + ' with ' + newText);
			tempString = ele.replace(oldText,newText);
		} catch (err) {
			browser.logger.error('Failed to replace ' + oldText + ' with ' + newText);
			browser.logger.error(err);
			this.handleError(err);
		}
		browser.logger.info('Replaced ' + oldText + ' with ' + newText);
		browser.pause(wait);
		return tempString;
	}

	/**
	* Remove all non-numeric characters from a string
	* @ele The element to replace
	* @name The name of the item to edit
	* @old The substring to replace
	* @new The string to replace with
	* @wait How long to wait after replacing text before moving on
	**/
	removeNonNumeric (ele, name = 'element', oldText='', newText='', wait=0) {
		return(this.replaceSubString(ele, name, /\D/g, '', wait));
	}

	/**
	* Remove all non-numeric characters from a string
	* @ele The element to replace
	* @name The name of the item to edit
	* @old The substring to replace
	* @new The string to replace with
	* @wait How long to wait after replacing text before moving on
	**/
	removeNumeric (ele, name = 'element', oldText='', newText='', wait=0) {
		return(this.replaceSubString(ele, name, /[0-9]/g, '', wait));
	}

	/**
	* Generic Replace Text of Element
	* @ele The element to replace
	* @name The name of the item to edit
	* @value The value to set
	* @wait How long to wait after replacing text before moving on
	**/
	setValue (ele, name = 'element', value='', wait=0) {
		let sel = ele.selector;
		try {
			this.waitForElem({ ele, name });
			browser.logger.info('Attempting to set ' + name + ' to ' + value);
			browser.setValue(sel, value);
		} catch (err) {
			browser.logger.error('Failed to set ' + name + ' to ' + value);
			browser.logger.error(err);
			this.handleError(err);
		}
		browser.logger.info('Set ' + name + ' to ' + value);
		browser.pause(wait);
	}

	/**
	* Generic Replace Text of Element
	* @ele The element to replace
	* @name The name of the item to edit
	* @value The value to set
	* @wait How long to wait after replacing text before moving on
	**/
	setVal ({
		ele = null,
		name = 'element',
		value = '',
		wait = 3000
	} = {}) {
		this.waitForElem({ ele, name });
		try {
			browser.logger.info(`Attempting to set ${name} to ${value}`);
			browser.setValue(ele.selector, value);
		} catch (err) {
			browser.logger.error(`Failed to set ${name} to ${value}`);
			browser.logger.error(err);
			throw err;
		}
		browser.logger.info(`Set ${name} to ${value}`);
		browser.pause(wait);
	}

	/**
	* Generic Move to Element
	* @ele The element to move to
	* @name The name of the item to move to
	* @wait How long to wait after replacing text before moving on
	**/
	moveToObject (ele, name = 'element', wait = 500) {
		let sel = (typeof ele === 'string') ? ele : ele.selector;
		try {
			this.waitForElem({ sel, name });
			browser.logger.info('Attempting to move to ' + name);
			browser.moveTo(sel);
		} catch (err) {
			browser.logger.error('Failed to move to ' + name);
			browser.logger.error(err);
			this.handleError(err);
		}
		browser.logger.info('Moved to ' + name);
		browser.pause(wait);
	}

	/**
	* Generic Move to Element
	* @ele The element to move to
	* @name The name of the item to move to
	* @wait How long to wait after replacing text before moving on
	**/
	moveToObj ({
		ele = null,
		name = 'element',
		wait = 500
	} = {}) {
		ele = (typeof ele === 'string') ? ele : ele.selector;
		try {
			this.waitForElem({ ele, name });
			browser.logger.info('Attempting to move to ' + name);
			browser.moveTo(sel);
		} catch (err) {
			browser.logger.error('Failed to move to ' + name);
			browser.logger.error(err);
			this.handleError(err);
		}
		browser.logger.info('Moved to ' + name);
		browser.pause(wait);
	}

	/**
	* Method to scroll down a page
	* @numberOfTImes Number of time you want to scroll down on a page
	* @wait If you want to pause after each scroll
	**/
	scrollDown (numberOfTImes=1, wait=0) {
		for (let i = 0; i <= numberOfTImes; i++) {
			browser.scroll(0,250);
			browser.pause(wait);
		}
	}

	/**
	* Method to scroll up a page
	* @numberOfTImes Number of time you want to scroll up on a page
	* @wait If you want to pause after each scroll
	**/
	scrollUp (numberOfTImes, wait=0) {
		for (let i = 0; i <= numberOfTImes; i++) {
			browser.scroll(0,-250);
			browser.pause(wait);
		}
	}

	clickNavBtn (ele, name = 'element', url, wait=0) {
		try {
			this.waitForElem({ ele, name });
			for (let i = 0; i < 5; i++) {
				this.clickElement(ele, name);
				browser.pause(wait);
				if (browser.getUrl().includes(url)) {
					return true;
				}
			}
		} catch (err) {
			browser.logger.error('Failed to click nav element ' + name);
			browser.logger.error(err);
			this.handleError(err);
		}
	}

	currentMonthAsNumber (monthName) {
		let month = new Array();
		month["January"] = 0;
		month["February"] = 1;
		month["March"] = 2;
		month["April"] = 3;
		month["May"] = 4;
		month["June"] = 5;
		month["July"] = 6;
		month["August"] = 7;
		month["September"] = 8;
		month["October"] = 9;
		month["November"] = 10;
		month["December"] = 11;
		return month[monthName];
	}

	currentMonthName (len = 100) {
		let d = new Date();
		let month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";
		return month[d.getMonth()].substring(0,len);
	}

	currentDay (len=1) {
		let d = new Date();
		return (d.getDate() < 10 && len > 1) ? '0' + d.getDate() : d.getDate();
	}

	currentMonth (len=1) {
		let d = new Date();
		let m = d.getMonth() + 1;
		return (m < 10 && len > 1) ? '0' + m : m;
	}

	currentHour (len=1) {
		let t = new Date();
		return (t.getHours() < 10 && len > 1) ? '0' + t.getHours() : t.getHours();
	}

	currentMinute (len=1) {
		let t = new Date();
		return (t.getMinutes() < 10 && len > 1) ? '0' + t.getMinutes() : t.getMinutes();
	}

	currentSecond (len=1) {
		let t = new Date();
		return (t.getSeconds() < 10 && len > 1) ? '0' + t.getSeconds() : t.getSeconds();
	}

	getDateTime (len=2, format='Y-m-d H:i:s') {
		// I'm lazy, so this only does Y-m-d H:i:s for now
		return this.getDate() + ' ' + this.getTime();
	}

	getDate (len=2, format='Y-m-d') {
		// I'm lazy, so this only does Y-m-d for now
		let d = new Date();
		return d.getFullYear() + '-' + this.currentMonth(len) + '-' + this.currentDay(len);
	}

	getTime (len=2, format='H:i:s') {
		// I'm lazy, so this only does H:i:s for now
		let t = new Date();
		return this.currentHour(len) + ":" + this.currentMinute(len) + ":" + this.currentSecond(len);
	}

	/**
	* returns the ordinal indicator for a specific number
	* @param the ordinal number
	**/
	ordinal (n) {
		switch (n) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	}

	appendOrdinal (num) {
		let str = num.toString();
		if (num > 10 && num < 21) {
			return str += 'th';
		}
		switch (str[str.length - 1]) {
			case '1':
				return str += 'st';
			case '2':
				return str += 'nd';
			case '3':
				return str += 'rd';
			default:
				return str += 'th';
		}
	}

	concatSelectors (...elements) {
		return elements.map(element => element.selector).join('');
	}

	browserHasWarn () {
		// loop through browser log values, and make sure no warnings
		const log = browser.log('browser').value;
		let warnings = [];
		if (log && log.length) {
			for (let l in log) {
				log[l]['level'] === 'WARNING' && warnings.push(log[l]['message']);
			}
		}
		warnings.length && browser.logger.error(warnings);
		return warnings.length ? true : false;
	}

	browserHasErr () {
		// loop through browser log values, and make sure no errors
		const log = browser.log('browser').value;
		let errors = [];
		if (log && log.length) {
			for (let l in log) {
				log[l]['level'] === 'ERROR' && errors.push(log[l]['message']);
			}
		}
		errors.length && browser.logger.error(errors);
		return errors.length ? true : false;
	}

	static ReadFile (path, format = 'utf8', {
		fs = require('fs')
	} = {}) {
		return fs.readFileSync(path, { encoding: format });
	}

	sortByKey (array, key) {
	// heartlessly stolen from https://stackoverflow.com/a/8175221
		return array.sort(function(a, b) {
			let x = a[key]; let y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	keySort (key, desc) {
		return function (a, b) {
			return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
		}
	}

	textOnPage (text) {
		return browser.element(`//*[contains(text(),'${text}')]`).isExisting();
	}

	randomPause() {
		browser.pause(Math.floor(Math.random() * 2000) + 500);
	}

	blacklist() {
		var fs = require('fs');
		return fs.readFileSync('./data/blacklist.txt', 'utf-8').split('\n')
	}

	following() {
		var fs = require('fs');
		return fs.readFileSync('./data/processing.txt', 'utf-8').split('\n')
	}

	whitelist() {
		var fs = require('fs');
		return fs.readFileSync('./data/whitelist.txt', 'utf-8').split('\n')
	}

	updateFollowing(arr) {
		var fs = require('fs');

		var file = fs.createWriteStream('./data/following.txt');
		file.on('error', function(err) { /* error handling */ });
		arr.forEach(function(v) { file.write(v.join(', ') + '\n'); });
		file.end();

		return this.following();
	}
}

module.exports = Page;
