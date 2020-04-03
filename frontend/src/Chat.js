import React from 'react'
import './Chat.css'

const ListElem = ({time, user, message}) => {
    const date = new Date(time)
    let formattedTime = `${date.getMonth()}/${date.getDate()}-${date.getHours()}:${date.getMinutes()}`

    return <li >
        {formattedTime} - {user}: {message}
    </li>
}

const List = ({elements}) => {
    console.log('elements', elements)
    return (
        <div className='messages-container'>
            <ul className='messages-list'>
                {elements.map((e, idx) => <ListElem key={idx} {...e}/>)}
            </ul>
        </div>
    )
}

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.onSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    handleChange(event) { this.setState({ value: event.target.value }); }
    typing() {
        console.log('inputting')
    }
    onKeyDown(e) {
        if (e.key === 'Enter') {
            console.log('do validate');
            this.onSubmit()
          }
    }
    onSubmit() {
        console.log('submitting')
        const {onSendMessage} = this.props
        onSendMessage(this.state.value)
        this.setState({value: ''})
    }
    render() {
        return <div className='chat-input-container'>
            <input onKeyDown={this.onKeyDown} 
            onChange={this.handleChange}
             value={this.state.value} 
             className='chat-input' id="txt" autoComplete="off" autoFocus="on" onInput={this.typing} placeholder="type your message here..." />
            <button className='chat-button'>Send</button>
        </div>
    }
}

const Chat = ({messages, onSendMessage}) => {
    return (
        <div className='chat'>
            <List elements={messages}/>
            <Input onSendMessage={onSendMessage}/>
        </div>
    )
}


export default Chat

//ReactDOM.render(<InfiniteList/>,
//        document.getElementById('infinite-window-example'));