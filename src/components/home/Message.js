import React, { Component } from 'react';

class Message extends Component {
    render() {
        const data=this.props;
        const time=new Date(data.time);

        if(data.isMe){
            return (
                <div className="message me">
                <div className="text-main">
                    <div className="text-group me">
                        <div className="text me">
                            <p>{data.content}</p>
                        </div>
                    </div>
                    <span>{time.getHours()+':'+time.getMinutes()} PM</span>
                </div>
            </div>
            );
        }else{
            return(
            <div className="message">
                <img className="avatar-md" src="http://127.0.0.1:8000/storage/public/user_avartar/default.png" data-toggle="tooltip" data-placement="top" title="" alt="avatar" data-original-title="Keith" />
            <div className="text-main">
                <div className="text-group">
                    <div className="text">
                     <p>{data.content}</p>
                    </div>
                </div>
                <span>{time.getHours()+':'+time.getMinutes()} PM</span>
            </div>
        </div>
            );
        }
        
    }
}

export default Message;