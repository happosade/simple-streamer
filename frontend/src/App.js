import React from 'react'
import './App.css'
import Chat from './Chat'
import Video from './Video'

import { fetchMessages, sendMessage, receiveMessage } from './network'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
  componentDidMount() {
    fetchMessages().then(messages=> {
      this.setState({
        messages
      });
      receiveMessage(this.onReceiveMessage.bind(this))
    });
  }
  onReceiveMessage(message) {
    console.log('receiving message', message)
    this.setState({ messages: [...this.state.messages, message] })
  }
  onSendMessage(message) {
    console.log('sending message', message)
    sendMessage(message)
  }
  render() {
    return (
      <div className="App">
        <Video/>
        <Chat onSendMessage={this.onSendMessage.bind(this)} messages={this.state.messages} />
      </div>
    )
  }
}

export default App;
