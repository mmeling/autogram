const expect = require('chai').expect;
// page definitions
const Api = require('../../pageobjects/api');
const LoginPage = require('../../pageobjects/login.page');
const Platform = require('../../pageobjects/platform.page');
const ImgLibPage = require('../../pageobjects/image.library.page');
const ImgDialog = require('../../pageobjects/image.dialog');
const ImgDetailed = require('../../pageobjects/image.library.detailed');
const ImgVisual = require('../../pageobjects/image.library.visual');
// login page values, mostly for error text
const login = require('../../testdata/login.data.json');
// account info for login and dashboard page validation
var acct = require('../../testdata/account.data.json');
acct = acct.accountOdin;
var user = null;
const msg = require('../../testdata/new.message.data.json');

/**
* This spec contains tests for the "Push Audit"
* See 'Image Library' in the Push Audit.
**/
describe('image library ', function () {
	// ignore a test by prefixing 'x' to 'it' (xit)
	// run specific test by prefixing 'f' to 'it' (fit)
	beforeEach(function() {
		Platform.open(); // This will run before each test
		/**
		* The before each function will delete all cookies, so there
		* are no issues with logging in, then actually log in for you.
		* This keeps the login/ logged in assertion code down.
		**/
		// Make sure the new window is an ok size
		browser.windowHandleSize({ width: 1280, height: 1024 });
		// Log in
		user = LoginPage.login(acct);
		// Wait for and validate correct name on login
		expect(Platform.validateDisplayName(user.name)).to.be.true;
		// nuke the tutorial, or we can't use the site
		Platform.killTutorial();
		// Go to the image library
		Platform.clickSideContent();
		Platform.clickSideContentImages();
		// wait for the page, yo
		ImgLibPage.imgContainer.waitForEnabled();
	});

	//Section 3 > a 'Upload Image'
	it('should upload a new small jpg', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgDetailed.entry.waitForEnabled();

		expect(ImgDetailed.image.isExisting()).to.be.true;
		expect(ImgDetailed.createdBy.getText()).to.contain(user.name);
		expect(ImgDetailed.inLib.getText()).to.contain(user.name);
	});

	//Section 3 > a 'Upload Image'
	it('should upload a new small gif', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.smallGif);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgDetailed.entry.waitForEnabled();

		expect(ImgDetailed.image.isExisting()).to.be.true;
		expect(ImgDetailed.createdBy.getText()).to.contain(user.name);
		expect(ImgDetailed.inLib.getText()).to.contain(user.name);
	});

	//Section 3 > a 'Upload Image'
	it('should upload a new large gif', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.LargeGif);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgDetailed.entry.waitForEnabled();

		expect(ImgDetailed.image.isExisting()).to.be.true;
		expect(ImgDetailed.createdBy.getText()).to.contain(user.name);
		expect(ImgDetailed.inLib.getText()).to.contain(user.name);
	});

	//Section 3 > a 'Upload Image'
	it('should upload a new jpeg', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.smallJpeg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgDetailed.entry.waitForEnabled();

		expect(ImgDetailed.image.isExisting()).to.be.true;
		expect(ImgDetailed.createdBy.getText()).to.contain(user.name);
		expect(ImgDetailed.inLib.getText()).to.contain(user.name);
	});

	//Section 3 > a 'Upload Image'
	it('should upload a new png', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.smallPng);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgDetailed.entry.waitForEnabled();

		expect(ImgDetailed.image.isExisting()).to.be.true;
		expect(ImgDetailed.createdBy.getText()).to.contain(user.name);
		expect(ImgDetailed.inLib.getText()).to.contain(user.name);
	});

	//Section 3 > a 'Upload Image'
	it('should not allow uploading js file', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.js);

		ImgLibPage.errorInvalidType.waitForVisible();

		expect(ImgLibPage.errorInvalidType.isExisting()).to.be.true;
	});

	//Section 3 > a 'Upload Image'
	it('should not allow uploading php file', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.php);

		ImgLibPage.errorInvalidType.waitForVisible();

		expect(ImgLibPage.errorInvalidType.isExisting()).to.be.true;
	});

	//Section 3 > a 'Upload Image'
	it('should not allow uploading sql query', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.sql);

		ImgLibPage.errorInvalidType.waitForVisible();

		expect(ImgLibPage.errorInvalidType.isExisting()).to.be.true;
	});

	//Section 3 > a 'Upload Image'
	it('should not allow uploading txt file', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.txt);

		ImgLibPage.errorInvalidType.waitForVisible();

		expect(ImgLibPage.errorInvalidType.isExisting()).to.be.true;
	});

	//Section 3 > a 'Upload Image'
	it('should not allow uploading zip file', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.zip);

		ImgLibPage.errorInvalidType.waitForVisible();

		expect(ImgLibPage.errorInvalidType.isExisting()).to.be.true;
	});

	//Section 3 > a 'Upload Image'
	it('should not upload clicking cancel on edit dialog', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickCancelBtn();

		ImgLibPage.imgContainer.waitForEnabled();

		expect(ImgDetailed.entry.isExisting()).to.be.false;
	});

	//Section 3 > a 'Upload Image'
	it('should edit image tags', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgDetailed.entry.waitForEnabled();

		ImgLibPage.addTags(msg.tags);

		browser.refresh();
		ImgDetailed.entry.waitForEnabled();

		expect(ImgDetailed.image.isExisting()).to.be.true;
		expect(ImgDetailed.createdBy.getText()).to.contain(user.name);
		expect(ImgDetailed.inLib.getText()).to.contain(user.name);
		expect(ImgDetailed.tags.getText().split(',').join(' ')).to.contain(msg.tags.split(',').join(''));
	});

	//Section 3 > a 'Upload Image'
	it('should not edit tags on cancel', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgDetailed.entry.waitForEnabled();

		ImgLibPage.clickEditTagsBtn();
		ImgLibPage.editTags.waitForEnabled();
		ImgLibPage.editTags.setValue(msg.tags);
		ImgLibPage.clickCancelTagsBtn();

		browser.refresh();
		ImgDetailed.entry.waitForEnabled();

		expect(ImgDetailed.image.isExisting()).to.be.true;
		expect(ImgDetailed.createdBy.getText()).to.contain(user.name);
		expect(ImgDetailed.inLib.getText()).to.contain(user.name);
		expect(ImgDetailed.tags.getText()).to.not.contain(msg.name);
	});

	//Section 3 > a 'Upload Image'
	it('should delete image', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgDetailed.entry.waitForEnabled();

		ImgLibPage.clickDeleteImgBtn();
		ImgLibPage.clickDeleteImgConfirmBtn();

		browser.refresh();

		ImgLibPage.imgContainer.waitForEnabled();

		expect(ImgDetailed.entry.isExisting()).to.be.false;
	});

	//Section 3 > a 'Upload Image'
	it('should not delete on cancel', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgDetailed.entry.waitForEnabled();

		ImgLibPage.clickDeleteImgBtn();
		ImgLibPage.clickDeleteImgCancelBtn();

		browser.refresh();

		ImgLibPage.imgContainer.waitForEnabled();
		ImgDetailed.entry.waitForEnabled();

		expect(ImgDetailed.entry.isExisting()).to.be.true;
	});

	//Section 3 > a 'Upload Image'
	it('should upload a new small jpg in visual view', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.clickVisualViewBtn();

		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgVisual.entry.waitForEnabled();

		expect(ImgVisual.image.isExisting()).to.be.true;
	});

	//Section 3 > a 'Upload Image'
	it('should not upload clicking cancel in visual view', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.clickVisualViewBtn();

		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickCancelBtn();

		ImgLibPage.imgContainer.waitForEnabled();

		expect(ImgVisual.entry.isExisting()).to.be.false;
	});

	//Section 3 > a 'Upload Image'
	it('should edit image tags in visual view', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.clickVisualViewBtn();

		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgVisual.entry.waitForEnabled();
		ImgLibPage.addTags(msg.tags);

		browser.refresh();
		ImgDetailed.entry.waitForEnabled();

		expect(ImgDetailed.image.isExisting()).to.be.true;
		expect(ImgDetailed.createdBy.getText()).to.contain(user.name);
		expect(ImgDetailed.inLib.getText()).to.contain(user.name);
		expect(ImgDetailed.tags.getText().split(',').join(' ')).to.contain(msg.tags.split(',').join(''));
	});

	//Section 3 > a 'Upload Image'
	it('should not edit tags on cancel in visual view', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.clickVisualViewBtn();

		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgVisual.entry.waitForEnabled();

		ImgLibPage.clickEditTagsBtn();
		ImgLibPage.editTags.waitForEnabled();
		ImgLibPage.editTags.setValue(msg.tags);
		ImgLibPage.clickCancelTagsBtn();

		browser.refresh();
		ImgDetailed.entry.waitForEnabled();

		expect(ImgDetailed.image.isExisting()).to.be.true;
		expect(ImgDetailed.createdBy.getText()).to.contain(user.name);
		expect(ImgDetailed.inLib.getText()).to.contain(user.name);
		expect(ImgDetailed.tags.getText()).to.not.contain(msg.name);
	});

	//Section 3 > a 'Upload Image'
	it('should delete image in visual view', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.clickVisualViewBtn();

		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgVisual.entry.waitForEnabled();

		ImgLibPage.clickDeleteImgBtn();
		ImgLibPage.clickDeleteImgConfirmBtn();

		browser.refresh();
		ImgLibPage.clickVisualViewBtn();
		ImgLibPage.imgContainer.waitForEnabled();

		expect(ImgVisual.entry.isExisting()).to.be.false;
	});

	//Section 3 > a 'Upload Image'
	it('should not delete on cancel in visual view', function () {
		// This uploads a new image and does some other stuff. I don't know
		ImgLibPage.clickVisualViewBtn();

		ImgLibPage.uploadOnePhoto(msg.smallJpg);

		ImgLibPage.waitForUploadingDialog();

		ImgDialog.title.waitForEnabled();
		ImgDialog.clickSaveBtn();

		ImgVisual.entry.waitForEnabled();

		ImgLibPage.clickDeleteImgBtn();
		ImgLibPage.clickDeleteImgCancelBtn();

		browser.refresh();
		ImgLibPage.clickVisualViewBtn();
		ImgLibPage.imgContainer.waitForEnabled();

		ImgVisual.entry.waitForEnabled();

		expect(ImgVisual.entry.isExisting()).to.be.true;
	});
});
