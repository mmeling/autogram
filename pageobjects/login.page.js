const Page = require('./page');
const home = require('./resources/home.page.locators');

class HomePage extends Page {
	// signup stuff
	get facebookBtn() { return browser.element(home.signup.facebookBtn); }
	get setEmail() { return browser.element(home.signup.setEmail); }
	get setFullName() { return browser.element(home.signup.setFullName); }
	get setUsername() { return browser.element(home.signup.setUsername); }
	get setPassword() { return browser.element(home.signup.setPassword); }
	get signUpBtn() { return browser.element(home.signup.signUpBtn); }
	get logInLink() { return browser.element(home.signup.logInLink); }
	// login stuff
	get user() { return browser.element(home.login.user); }
	get pass() { return browser.element(home.login.pass); }
	get loginBtn() { return browser.element(home.login.loginBtn); }

	open(host=browser.options.baseUrl) {
		super.open('accounts/login/', host);
	}

	login(username=global.user.user, password=global.user.pass) {
		this.open();
		super.randomPause();
		this.user.setValue(username);
		super.randomPause();
		this.pass.setValue(password);
		super.randomPause();
		this.clickLoginBtn();
	}

	onSignUp() {
		return this.signUpBtn.isExisting();
	}

	onLogin() {
		return this.loginBtn.isExisting();
	}

	clickFacebookBtn() {
		this.facebookBtn.click();
	}

	clickSignUpBtn() {
		this.signUpBtn.click();
	}

	clickLogInLink() {
		this.logInLink.click();
	}

	clickLoginBtn() {
		this.loginBtn.click();
	}
}

module.exports = new HomePage;
