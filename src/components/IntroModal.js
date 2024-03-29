import {Col, Button} from 'react-bootstrap';

export default function IntroModal({setIntroDone}) {

    const handleStartGame = () => {
        setIntroDone(true);
    }

    return (
        <>
        <Col className="introModal">
            <div className="introDialog">
                <h2>SWATTER</h2>
                <p>
                    Welcome to Swatter - Just try to zap those bugs with the swatter. Move 
                    the cursor over the swatter then click and hold down to move it 
                    or touch down on the swatter. To make a strike, lift the mouse button or 
                    touch off.
                </p>
                <p>
                    If you move the swatter over the edge of the stage, touch off or release the
                    click button, touch or click somewhere else on the stage and then click
                    or touch on the swatter again.
                </p>
                <Button variant="primary" onClick={handleStartGame}>
                    Start Game
                </Button>
            </div>
        </Col>
        </>
        )
}