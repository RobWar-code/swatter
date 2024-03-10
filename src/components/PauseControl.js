import {Button} from 'react-bootstrap';


export default function PauseControl({pauseOn, setPauseOn}) {

    const togglePause = () => {
        setPauseOn(!pauseOn);
    }

    return (
        <Button onClick={togglePause}>
            {pauseOn ?
                <img src={`${process.env.PUBLIC_URL}/static/graphics/pause.png`} alt="Pause" title="Click to Restart" /> :
                <img src={`${process.env.PUBLIC_URL}/static/graphics/start.png`} alt="Pause" title="Click to Pause" /> 
            }
        </Button>

    )
}