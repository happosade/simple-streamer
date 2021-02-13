import React from 'react'
import './UserCount.css'

class UserCount extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div class="usercount">
                <img src="users.png" /><span> {this.props.count}</span>
            </div>
        )
    }
}

export default UserCount