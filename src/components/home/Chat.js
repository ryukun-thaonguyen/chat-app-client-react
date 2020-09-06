import React, { Component } from 'react';
import API from '../../ApiHref';
import Message from './Message';
import Typing from './Typing';
import { withRouter } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies';

class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			user_id: cookie.load('user_id'),
			data: null,
			isLoading: false
		}
		// this.Type = this.Type.bind(this);
		this.postAPI = this.postAPI.bind(this);
		this.updateUI = this.updateUI.bind(this);

		// this.endType = this.endType.bind(this);
		this.send = this.send.bind(this);
	}
	componentDidMount() {
		this.setState({ isLoading: true });
		var user_id = this.state.user_id;
		setInterval(() => {
			var token = this.props.match.params.id;
			axios.post(API.API_MESSAGE, { id: token, current_user: user_id })
				.then(response => this.updateUI(response.data));
			// this.postAPI('/getMessages', { id: token, current_user: user_id })
			// 	.then(data => this.updateUI(data))
		}, 3000)
	}
	updateUI(data) {
		// console.log('update UI')
		var id = this.state.id;
		var ac = this.props.match.params.id
		// console.log(data);
		if (id != ac) {
			console.log('change')
			this.setState(
				{ data, id: ac, isLoading: true }
			)
		}
		else {
			this.setState({ data, isLoading: false });
		}
	}

	async postAPI(url = '', data = {}) {
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

	// Type() {
	// 	const user_id = this.state.user_id;
	// 	const id = this.state.id;
	// 	this.postAPI(API.API_ONTYPING, { id: id, u_id: user_id })
	// 		.then(data => console.log(data));
	// }
	// endType() {
	// 	const id = this.state.user_token;
	// 	this.postAPI(API.API_ENDTYPING, { id: id })
	// 		.then(data => console.log(data));
	// }
	send(event) {
		event.preventDefault();
		var id = this.state.user_id;
		var id_dis = this.state.data.id;
		var message = event.target['message'].value;
		event.target['message'].value = '';
		this.postAPI(API.API_SENDMESS, { id: id, id_dis: id_dis, message: message })
			.then(data => console.log(data));
	}

	render() {
		const { id, user_id, data, isLoading } = this.state;
		// const data = this.state.messages;

		// console.log(data);
		if (isLoading) {
			return (
				<div className="main">
					<div className="tab-content" id="nav-tabContent">
						<div className="babble tab-pane fade active show" id="list-chat" role="tabpanel" aria-labelledby="list-chat-list">
							loading...
						  </div>
					</div>
				</div>
			)
		} else {
			if (data == null) {
				return (
					<div className="main">
						<div className="tab-content" id="nav-tabContent">
							<div className="babble tab-pane fade active show" id="list-chat" role="tabpanel" aria-labelledby="list-chat-list">
								loading...
								</div>
						</div>
					</div>
				)
			}
			// data.typingObject = JSON.parse(data.typing);
			// console.log(data.typingObject);
			return (
				<div className="main" >
					<div className="tab-content" id="nav-tabContent">
						<div className="babble tab-pane fade active show" id="list-chat" role="tabpanel" aria-labelledby="list-chat-list">
							<div className="chat" id="chat1">
								<div className="top">
									<div className="container">
										<div className="col-md-12">
											<div className="inside">
												<a href="#">
													<img className="avatar-md" src="http://127.0.0.1:8000/storage/public/user_avartar/default.png" data-toggle="tooltip" data-placement="top" title="" alt="avatar" data-original-title="Keith" /></a>
												<div className="status">
													<i className="material-icons online">fiber_manual_record</i>
												</div>
												<div className="data">
													<h5><a href="#">{data.name}</a></h5>
													<span>Active now</span>
												</div>
												<button className="btn connect d-md-block d-none" name="1"><i className="material-icons md-30">phone_in_talk</i></button>
												<button className="btn connect d-md-block d-none" name="1"><i className="material-icons md-36">videocam</i></button>
												<button className="btn d-md-block d-none"><i className="material-icons md-30">info</i></button>
												<div className="dropdown">
													<button className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="material-icons md-30">more_vert</i></button>
													<div className="dropdown-menu dropdown-menu-right">
														<button className="dropdown-item connect" name="1"><i className="material-icons">phone_in_talk</i>Voice Call</button>
														<button className="dropdown-item connect" name="1"><i className="material-icons">videocam</i>Video Call</button>
														<hr />
														<button className="dropdown-item"><i className="material-icons">clear</i>Clear History</button>
														<button className="dropdown-item"><i className="material-icons">block</i>Block Contact</button>
														<button className="dropdown-item"><i className="material-icons">delete</i>Delete Contact</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="content" id="content" onClick={this.endType}>
									<div className="container">
										<div className="col-md-12">
											<div className="date">
												<hr />
												<span>Yesterday</span>
												<hr />
											</div>
											{
												data.messages.map((data, i) =>
													<Message key={i} time={data.updated_at} isMe={data.user_id == user_id ? true : false} content={data.message} />)
											}
											{
												// data.typingObject.length != 0 &&
												// data.typingObject.map(
												// 	(i, j) => i.isInterger() ? <Typing isMe={i == user_id ? true : false} /> : null
												// )
											}
										</div>
									</div>
								</div>
								<div className="container">
									<div className="col-md-12">
										<div className="bottom">
											<form onSubmit={this.send} className="position-relative w-100" >
												<textarea name="message" className="form-control" placeholder="Start typing for reply..." rows="1"></textarea>
												<button className="btn emoticons"><i className="material-icons">insert_emoticon</i></button>
												<button type="submit" className="btn send"><i className="material-icons">send</i></button>
											</form>
											<label>
												<input type="file" />
												<span className="btn attach d-sm-block d-none"><i className="material-icons">attach_file</i></span>
											</label>
										</div>
									</div>
								</div>
							</div>
							<div class="call" id="call1">
								<div class="content">
									<div class="container">
										<div class="col-md-12">
											<div class="inside">
												<div class="panel">
													<div class="participant">
														<img class="avatar-xxl" src="dist/img/avatars/avatar-female-5.jpg" alt="avatar" />
														<span>Connecting</span>
													</div>
													<div class="options">
														<button class="btn option"><i class="material-icons md-30">mic</i></button>
														<button class="btn option"><i class="material-icons md-30">videocam</i></button>
														<button class="btn option call-end"><i class="material-icons md-30">call_end</i></button>
														<button class="btn option"><i class="material-icons md-30">person_add</i></button>
														<button class="btn option"><i class="material-icons md-30">volume_up</i></button>
													</div>
													<button class="btn back" name="1"><i class="material-icons md-24">chat</i></button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			);
		}
	}
}

export default Chat;