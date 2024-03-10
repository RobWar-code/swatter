import {useEffect} from 'react';
import {Button} from 'react-bootstrap';

export default function SoundToggle({soundEnabled, setSoundEnabled, doSound, setDoSound}) {
    useEffect( () => {
        localStorage.setItem('soundEnabled', soundEnabled);
    }, [soundEnabled])

    // Sound play request
    useEffect( () => {
        if (doSound !== "" && soundEnabled) {
            playSound(doSound);
            setDoSound("");
        }
    }, [doSound, setDoSound, soundEnabled])


    const toggleSound = () => {
        let newSound = !soundEnabled;
        setSoundEnabled(newSound);
        if (newSound) {
            playSound("ding");
        }
    }

    const playSound = (sound) => {
        let soundData;
        if (sound !== "") {
            soundData = new Audio(`${process.env.PUBLIC_URL}/static/sounds/${sound}.mp3`);
            soundData.play();
        }
    }

    return (
        <Button variant="success" className="toolButton" onClick={toggleSound}>{
            soundEnabled ? 
                <img src={`${process.env.PUBLIC_URL}/static/graphics/soundOn.png`} alt="Sound On" title="Turn Sound Off" width="60" height="60" /> : 
                <img src={`${process.env.PUBLIC_URL}/static/graphics/soundOff.png`} alt="Sound Off" title="Turn Sound On" width="60" height="60" />
        }</Button>
    )
}