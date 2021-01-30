import React from 'react'
import './Chat.css'

const ListElem = ({time, user, message}) => {
    const date = new Date(time)
    const month = ((date.getMonth()+1)+'').padStart(2,'0')
    const day = ((date.getDate())+'').padStart(2,'0')
    const hour = ((date.getHours())+'').padStart(2,'0')
    const minute = ((date.getMinutes())+'').padStart(2,'0')
    const year = ((date.getFullYear())+'').padStart(2,'0')
    let formattedTime = `${day}/${month}/${year} ${hour}:${minute}`

    return <li >
        {formattedTime}   {user}: {message}
    </li>
}

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {first: true}
    }
    componentDidMount() {
        this.scrollTarget.scrollIntoView(true)
    }
    componentDidUpdate() {
        this.scrollTarget.scrollIntoView(true)
    }
    render() {
        const { elements } = this.props
        return (
            <div className='messages-container'>
                    <ul className='messages-list'>
                            {elements.map((e, idx) => <ListElem key={idx} {...e}/>)}
                            <span ref={el => {this.scrollTarget = el}}> </span>
                    </ul>
            </div>
        )
    }
}

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.onSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        window.addEventListener("resize",() => {
            let chat = document.getElementsByClassName('chat')[0]
            chat.setAttribute("style", `top:${window.innerHeight*0.7}px;height:${window.innerHeight*0.3}px;`)
        })
    }
    handleChange(event) { this.setState({ value: event.target.value }); }
    onKeyDown(e) {
        if (e.key === 'Enter') {
            this.onSubmit()
          }
    }
    onSubmit() {
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
            <button onClick={this.handleSubmit} className='chat-button'>Send</button>
        </div>
    }
}

const Chat = (props) => {
    const {messages, onSendMessage} = props
    return (
        <div className='chat' style={{top: window.innerHeight*0.8, height: window.innerHeight*0.2}}>
            <List {...props} elements={messages}/>
            <Input onSendMessage={onSendMessage}/>
        </div>
    )
}

export default Chat