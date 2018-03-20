const Page = require('./page');
const post = require('./resources/post.detail.dialog.locators');

class PostDetailDialog extends Page {
	// nav
	get prev() { return browser.element(post.nav.prev); }
	get next() { return browser.element(post.nav.next); }
	// details
	get poster() { return browser.element(post.details.poster); }
	get followStatus() { return browser.element(post.details.followStatus); }

	open(tag=null, host=browser.options.baseUrl) {
		super.open(`explore/` + ((tag) && (`tags/${tag}/`)), host);
	}

	getPoster() {
		return this.poster.getText();
	}

	getFollowStatus() {
		return this.followStatus.getText();
	}

	following() {
		return this.getFollowStatus() === 'Following';
	}

	follow() {
		if(!this.following()) {
			this.followStatus.click();
			browser.pause(4000);
			return true;
		}
		return false;
	}

	lastPost() {
		this.prev.click();
	}

	nextPost() {
		this.next.click();
	}
}

module.exports = new PostDetailDialog;
