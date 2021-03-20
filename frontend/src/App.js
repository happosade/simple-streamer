import React from 'react'
import './App.css'
import Chat from './Chat'
import Video from './Video'
import UserCount from './UserCount'

import { fetchMessages, sendMessage, registerMessageHandlers } from './network'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], userCount: 0 };
  }
  componentDidMount() {
    fetchMessages().then(messages=> {
      this.setState({
        messages
      });
      registerMessageHandlers(this.onReceiveMessage.bind(this), this.onUserCountChange.bind(this))
    });
  }
  onUserCountChange(count) {
    this.setState({ userCount: count})
  }
  onReceiveMessage(message) {
    this.setState({ messages: [...this.state.messages, message] })
  }
  onSendMessage(message) {
    sendMessage(message)
  }
  render() {
    return (
      <div className="App">
        <UserCount count={this.state.userCount} />
        <Video/>
        <Chat onSendMessage={this.onSendMessage.bind(this)} messages={this.state.messages} />
      </div>
    )
  }
}

export default App;
