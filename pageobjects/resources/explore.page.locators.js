const postDiv = `//a[contains(@href,'tagged=REPLACE')]/parent::div`;

const explore = {
	header: {
		tag: `//h1[contains(.,'REPLACE')]`,
		postCount: `//span[contains(.,'posts')]/span`
	},
	posts: {
		firstPost: `${postDiv}`,
		post: `(${postDiv})[NUMBER]`,
		likeCount: ``,
		commentCount: ``
	}
};

module.exports = explore;
