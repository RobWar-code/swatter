import {Form} from 'react-bootstrap';

export default function EaseControl({gameEase, setGameEase}) {

    const easeChange = (e) => {
        let value = e.target.value;
        let easeValue = 0.5 + value/100;
        setGameEase(easeValue);
    }

    return (
        <>
        <span>Easy&emsp;</span>
        <Form.Range className="gSlider" defaultValue={50} onChange={easeChange} title="Game Ease - affects scores" />
        <span>&emsp;Hard</span>
        </>
    )

}