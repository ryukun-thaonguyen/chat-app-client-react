import React, { Component } from 'react';
import cookie from 'react-cookies';
import API from '../../../ApiHref';
import DiscustionItem from '../DiscustionItem';
import { BrowserRouter } from 'react-router-dom';
class Discusstion extends Component {
	constructor() {
		super();
		this.state = {
			user_id: cookie.load('user_id'),
			isLoading: false,
			data: null
		}
		this.postAPI = this.postAPI.bind(this);
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
	componentDidMount() {
		this.setState({ isLoading: true })
		const id = this.state.user_id;
		this.postAPI(API.API_DISCUSSTION, { id: id })
			.then(data => this.setState({ data, isLoading: false }))
	}

	render() {
		const { user_id, isLoading, data } = this.state;
		if (isLoading) {
			return (
				<div>
					loading...
				</div>
			);
		} else {
			if (!data) {
				return (
					<div>
						loading...
					</div>
				);
			}
			return (
				<div id="discussions" className="tab-pane fade active show">
					<div className="search">
						<form className="form-inline position-relative">
							<input type="search" className="form-control" id="conversations" placeholder="Search for conversations..." />
							<button type="button" className="btn btn-link loop"><i className="material-icons">search</i></button>
						</form>
						<button className="btn create" data-toggle="modal" data-target="#startnewchat"><i className="material-icons">create</i></button>
					</div>
					<div className="list-group sort">
						<button className="btn filterDiscussionsBtn active show" data-toggle="list" data-filter="all">All</button>
						<button className="btn filterDiscussionsBtn" data-toggle="list" data-filter="read">Read</button>
						<button className="btn filterDiscussionsBtn" data-toggle="list" data-filter="unread">Unread</button>
					</div>
					<div className="discussions">
						<h1>Discussions</h1>
						<div className="list-group" id="chats" role="tablist">
							{
								this.state.data.map(
									(data, i) => <DiscustionItem key={i} data={data} />
								)
							}
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Discusstion;