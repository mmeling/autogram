const home = {
	signup: {
		facebookBtn: `//button[text()='Log in with Facebook']`,
		setEmail: `//*[@aria-label='Mobile Number or Email']`,
		setFullName: `//*[@aria-label='Full Name']`,
		setUsername: `//*[@aria-label='Username']`,
		setPassword: `//*[@aria-label='Password']`,
		signUpBtn: `//button[text()='Sign up']`,
		logInLink: `//a[text()='Log in']`
	},
	login: {
		user: `//*[@aria-label='Phone number, username, or email']`,
		pass: `//*[@aria-label='Password']`,
		loginBtn: `//button[text()='Log in']`
	}
};

module.exports = home;
