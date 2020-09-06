import React, { Component } from 'react';

class Typing extends Component {
    render() {
        const isMe=this.props.isMe;
        if(isMe){
        return (
            <div class="message me">
            <div class="text-main">
                <div class="text-group me">
                    <div class="text typing me">
                        <div class="wave">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );}
        else{
            return(
                <div class="message">
                <img class="avatar-md" src="http://127.0.0.1:8000/storage/public/user_avartar/default.png" data-toggle="tooltip" data-placement="top" title="" alt="avatar" data-original-title="Keith" />
                <div class="text-main">
                    <div class="text-group">
                        <div class="text typing">
                            <div class="wave">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    }
}

export default Typing;