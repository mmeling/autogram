const Page = require('./page');
const explore = require('./resources/explore.page.locators');

class ExplorePage extends Page {
	// header stuff
	get tag() { return browser.element(explore.header.tag); }
	get postCount() { return browser.element(explore.header.postCount); }
	// post list stuff
	get firstPost() { return browser.element(explore.posts.firstPost); }
	get post() { return browser.element(explore.posts.post); }
	get likeCount() { return browser.element(explore.posts.likeCount); }
	get commentCount() { return browser.element(explore.posts.commentCount); }

	open(tag=null, host=browser.options.baseUrl) {
		super.open(`explore/` + ((tag) && (`tags/${tag}/`)), host);
	}

	clickPost(x=1, tag='') {
		browser.element(
			this.post.selector
				.replace('NUMBER',x)
				.replace('REPLACE',tag))
			.click();
	}
}

module.exports = new ExplorePage;
