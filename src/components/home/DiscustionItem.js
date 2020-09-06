import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class DiscustionItem extends Component {
  constructor() {
    super();
  }

  render() {
    var data = this.props.data;
    var time;
    if(data.lastMessage){
    time= new Date(data.lastMessage.created_at);
    }
    return (
      <Link to={"/"+data.id} className="filterDiscussions all unread single active" id="list-chat-list" >
        <img className="avatar-md" src="http://127.0.0.1:8000/storage/public/user_avartar/default.png" data-toggle="tooltip" data-placement="top" title="" alt="avatar" data-original-title="Janette" />
        <div className="status">
          <i className="material-icons online">fiber_manual_record</i>
        </div>
        <div className="new bg-danger">
          <span>+1</span>
        </div>
        <div className="data">
        <h5>{data.name}</h5>
       <span>{time.getHours()}:{time.getMinutes()}</span>
       <p>{data.lastMessage.message}</p>
        </div>
      </Link>
    )
  }
}
