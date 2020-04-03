import React from 'react'
import './Video.css'
import dash from 'dashjs'

import settings from './settings.json'

const {videoUrl} = settings

const Video = () => {
    return (
        <div className='video'>
            <video className='video' data-dashjs-player autoPlay src={videoUrl} controls></video>
        </div>
    )
}

export default Video