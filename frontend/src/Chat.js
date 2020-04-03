import React, { useRef, useEffect } from 'react'
import './Chat.css'
import ScrollToBottom from 'react-scroll-to-bottom'

const ListElem = ({time, user, message}) => {
    const date = new Date(time)
    const month = ((date.getMonth()+1)+'').padStart(2,'0')
    const day = ((date.getDay())+'').padStart(2,'0')
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
        if (this.state.first) {
            //useEffect(() => {
            console.log('scrollaa nyt')
            this.scrollTarget.scrollIntoView(true)
            setTimeout(() => {
                console.log('enta nyt?')
                this.scrollTarget.scrollIntoView(true)
            }, 500)
            //})
        }
    }
    componentDidUpdate() {
        this.scrollTarget.scrollIntoView(true)
    }
    render() {
        const { elements } = this.props
        console.log('elements', elements)
        //const scrollToBottom = useScrollToBottom();
        //setTimeout(scrollToBottom)
                        //<ScrollToBottom mode="bottom">
                        //</ScrollToBottom>
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

const Chat = (props) => {
    const {messages, onSendMessage} = props
    //const List = autoscroll(Input)
    return (
        <div className='chat'>
            <List {...props} elements={messages}/>
            <Input onSendMessage={onSendMessage}/>
        </div>
    )
}


export default Chat

//ReactDOM.render(<InfiniteList/>,
//        document.getElementById('infinite-window-example'));