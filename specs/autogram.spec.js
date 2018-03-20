const expect = require('chai').expect;
// page definitions
const Platform = require('../pageobjects/platform.page');
const HomePage = require('../pageobjects/home.page');
const LoginPage = require('../pageobjects/login.page');
const ExplorePage = require('../pageobjects/explore.page');
const PostDetailDialog = require('../pageobjects/post.detail.dialog');
const today = new Date();

let blacklist = Platform.blacklist();
let whitelist = Platform.whitelist();
let following = Platform.following();
let newPeeps = [];

describe('Autogram ', function () {
	// ignore a test by prefixing 'x' to 'it' (xit)
	// run specific test by prefixing 'f' to 'it' (fit)
	beforeEach(function() {
		// Log in
		while(!Platform.loggedIn()) {
			LoginPage.login();
			Platform.randomPause();
		}
		expect(Platform.loggedIn()).to.be.true;
	});

	it('should do stuff', function () {
		while(true) {
			for(let tag of global.tags) {
				ExplorePage.open(tag);
				Platform.randomPause();
				ExplorePage.clickPost();
				Platform.randomPause();
				for(let i = 0; i < 5; i++) {
					if(PostDetailDialog.follow()) {
						newPeeps.push([{
							user: PostDetailDialog.getPoster(),
							date: today.getTime(),
							tries: 1
						}]);
						i--;
					}
					Platform.randomPause();
					PostDetailDialog.nextPost();
				}
				console.error(newPeeps);
			}
			Platform.updateFollowing(newPeeps);
		}
	});
});
