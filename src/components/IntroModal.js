import {Modal, Button} from 'react-bootstrap';

export default function IntroModal({setIntroDone}) {

    const handleStartGame = () => {
        setIntroDone(true);
    }

    return (
        <>
        <Modal 
            className="introModal"
            show="show"
        >
            <Modal.Dialog className="introText">
            <Modal.Header closeButton>
                <Modal.Title>SWATTER</Modal.Title>
            </Modal.Header>
    
            <Modal.Body className="text-center">
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
            </Modal.Body>
    
            <Modal.Footer>
                <Button variant="primary" onClick={handleStartGame}>
                    Start Game
                </Button>
            </Modal.Footer>
            </Modal.Dialog>
        </Modal>
        </>
        )
}