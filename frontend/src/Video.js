import React from 'react'
import './Video.css'
import dash from 'dashjs'

import settings from './settings.json'

import VideoPlayer from 'react-video-js-player'

const { videoUrl } = settings

class Video extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        const state = {
            src: {src: videoUrl, type: 'application/dash+xml'},
            poster: "//vjs.zencdn.net/v/oceans.png"
        }
        return (
            <VideoPlayer
                className='video'
                controls={true}
                src={state.src}
            />
        )

    }
}

export default Video