import React from 'react'
import './Video.css'

import settings from './settings.json'

import VideoPlayer from 'react-video-js-player'

const { videoUrl } = settings

class Video extends React.Component {
    constructor(props) {
        super(props);
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
                className='video'
                controls={true}
                src={state.src}
                onReady={this.onPlayerReady.bind(this)}
            />
        )

    }
}

export default Video