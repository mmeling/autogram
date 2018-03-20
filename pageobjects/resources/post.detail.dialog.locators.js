const taggedUser = `//*[contains(@class,'coreSpriteUserTagIndicator')]/../a`;
const postDiv = `//*[contains(@class,'coreSpriteUserTagIndicator')]/../a`;

const post = {
	nav: {
		prev: `//a[@role='button' and text()='Previous']`,
		next: `//a[@role='button' and text()='Next']`
	},
	details: {
		topTaggedUser: `${taggedUser}`,
		taggedUser: `(${taggedUser})[NUMBER]`,
		poster: `//*[contains(@class,'_iadoq')]`,
		followStatus: `//*[contains(@class,'_iuvin')]`,
		desc: `${postDiv}`,
		viewAllComments: `${postDiv}`,
		topComment: `${postDiv}`,
		topCommenter: `${postDiv}`,
		comment: `${postDiv}`,
		commenter: `${postDiv}`,
		commentBtn: `${postDiv}`,
		bookmarkBtn: `${postDiv}`,
		likeCount: `${postDiv}`,
		postedOn: `${postDiv}`,
		commentBox: `${postDiv}`,
	}
};

module.exports = post;
