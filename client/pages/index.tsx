import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Chat from './components/Chat';

export default function Stream() {
    const [isStreamLive, setIsStreamLive] = useState(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        // check if the stream is live
        checkStream();
    }, [])

    const checkStream = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/streams');
            const data = await response.json();
            if (data && Object.keys(data).length) {
                setIsStreamLive(true);
            }
        } catch (err: any) {
            setError(err);
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (isStreamLive) {
        return (
            <div className='video-container'>
                <div className='video-player'>
                    <ReactPlayer
                    url={process.env.STREAMING_SERVER}
                    playing
                    controls
                    width='50%'
                    height='50%'
                    style={{ maxWidth: '100%' }}
                    />
                </div>
                <Chat />
            </div>
        )
    } else {
        return <div>Stream is offline</div>
    }
}