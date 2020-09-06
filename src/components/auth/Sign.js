import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import API from '../../ApiHref';
class Sign extends Component {
	constructor() {
		super();
		this.state = {
			user_token: cookie.load('user_token'),
			email: '',
			password: ''
		}
		this.onchange = this.onchange.bind(this);
		this.login = this.login.bind(this);
		this.postData = this.postData.bind(this);
	}
	
	login(event) {
		event.preventDefault();
		var { email, password } = this.state;
		this.postData(API.API_LOGIN, { email: email, password: password })
			.then(token => this.setToken(token.access_token));
	}

	async postData(url = '', data = {}) {
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data)
		});
		return response.json();
	}
	setToken(token) {
		console.log(token);
		cookie.save('user_token', token, { path: '/' });
		var { user_token, email, password } = this.state;
		user_token = cookie.load('user_token');
		this.setState({ user_token, email, password });
	}
	onchange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	render() {
		if (this.state.user_token) {
			return <Redirect to="/" />
		} else {
			return (
				<main>
					<div class="layout">
						<div class="main order-md-1">
							<div className="start">
								<div className="container">
									<div className="col-md-12">
										<div className="content">
											<h1>Sign in to KunChat</h1>
											<div className="third-party">
												<button className="btn item bg-blue">
													<i className="material-icons">pages</i>
												</button>
												<button className="btn item bg-teal">
													<i className="material-icons">party_mode</i>
												</button>
												<button className="btn item bg-purple">
													<i className="material-icons">whatshot</i>
												</button>
											</div>
											<p>or use your email account:</p>
											<form method="post" onSubmit={this.login} >
												<div className="form-group">
													<input value={this.state.email} onChange={this.onchange} type="email" name="email" id="inputEmail" className="form-control" placeholder="Email Address" required />
													<button className="btn icon"><i className="material-icons">mail_outline</i></button>
												</div>
												<div className="form-group">
													<input type="password" value={this.state.password} onChange={this.onchange} name="password" id="inputPassword" className="form-control" placeholder="Password" required />
													<button className="btn icon"><i className="material-icons">lock_outline</i></button>
												</div>
												<button type="submit" className="btn button">Sign In</button>
												<div className="callout">
													<span>Don't have account? <Link to="/sign-up">Create Account</Link></span>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="aside order-md-2">
							<div className="container">
								<div className="col-md-12">
									<div className="preference">
										<h2>Hello, Friend!</h2>
										<p>Enter your personal details and start your journey with Kun today.</p>
										<Link to="/sign-up" className="btn button">Sign Up</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			);
		}
	}
}

export default Sign;