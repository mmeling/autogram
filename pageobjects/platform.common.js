'use strict';

const Page = require('./page');
const platform = require('./resources/platform.common.locators');

class PlatformCommon extends Page {
	// Header navigation elements
	get profileLink() { return browser.element(
		platform.header.profileLink.replace("REPLACE", global.user.user)
	); }

	loggedIn() {
		return this.profileLink.isExisting();
	}
}
module.exports = PlatformCommon;
