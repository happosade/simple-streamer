import React from 'react'
import './Video.css'

import settings from './settings.json'

import VideoPlayer from 'react-video-js-player'

const { videoUrl } = settings

class Video extends React.Component {
    constructor(props) {
        super(props);
        window.onresize = () => {
            let player = document.getElementsByClassName('video-js')[0]
            player.style.height = window.innerHeight*0.8; 
        }
    }
    componentDidMount() {
    }
    onPlayerReady(player) {
        player.muted(true)
        player.load()
        player.play()
    }
    render() {
        const state = {
            //src: {src: videoUrl, type: 'application/dash+xml'},
            src: {src: videoUrl, type: 'application/x-mpegURL'},
            poster: "//vjs.zencdn.net/v/oceans.png"
        }
        return (
            <VideoPlayer
                height={window.innerHeight*0.8}
                className='video'
                controls={true}
                src={state.src}
                onReady={this.onPlayerReady.bind(this)}
            />
        )

    }
}

export default Video