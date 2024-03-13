import {useState, useEffect, useRef} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Sprite, Stage, Text} from '@pixi/react';
import {useOutletContext} from 'react-router-dom';


export default function CreditsPage() {
    const [graphicsData] = useOutletContext();
    const [gotImageData, setGotImageData] = useState(false);
    const [imageStats, setImageStats] = useState({});
    const imageData = useRef();
    const [imageDataState, setImageDataState] = useState({});
    const [imageScale, setImageScale] = useState(1);
    const [gotScaledData, setGotScaledData] = useState(false);
    const textData = useRef();
    const [textDataState, setTextDataState] = useState([]);
    const [gotTextData, setGotTextData] = useState(false);
    const [stageWidth, setStageWidth] = useState(390);
    const [stageHeight, setStageHeight] = useState(390);
    const textCol = useRef(null);
    const httpLookUp = useRef();

    // Obtain the image data
    useEffect(() => {
        if (graphicsData.length) {
            let found = false;
            let item;
            for (item of graphicsData) {
                if (item.type === "credit sheet") {
                    found = true;
                    break;
                }
            }
            if (found) {
                setImageStats(item);
                setGotImageData(true);
            }
            else {
                console.log("Credits Image Not Found")
            }
        }

    }, [graphicsData])

    // Get the scale and stage size etc.
    useEffect(() => {
        const getImageDetails = () => {
            const colWidth = textCol.current.offsetWidth;
            const displayHeight = window.innerHeight - 100;
            let sx = colWidth / imageStats.width;
            if (sx * imageStats.height > displayHeight) {
                sx = displayHeight / imageStats.height;
            }
            setImageScale(sx);
            setStageWidth(sx * imageStats.width);
            setStageHeight(sx * imageStats.height);
    
            // Get the text layout details (to scale)
            imageData.current = {};
            imageData.current.image = `${process.env.PUBLIC_URL}/static/graphics/${imageStats.file}`;
            imageData.current.textTop = imageStats.textTop * sx;
            imageData.current.textLeft = imageStats.textLeft * sx;
            imageData.current.textRight = imageStats.textRight * sx;
            imageData.current.textBottom = imageStats.textBottom * sx;
            imageData.current.textCenter = (imageStats.textLeft + (imageStats.textRight - imageStats.textLeft) / 2) * sx;
            imageData.current.fontSize = 28 * sx;
            imageData.current.lineHeight = imageData.current.fontSize + 5;
    
            imageData.current.font = "Helvetica, sans-serif";
            imageData.current.fill = ['#000000', '#000000'];
            imageData.current.stroke = '#000000';
            setImageDataState(imageData.current);
            setGotScaledData(true);
        }
    
        const handleResize = ( () => {
            getImageDetails();
        })

        window.addEventListener("resize", handleResize);

        if (gotImageData) {
            getImageDetails();
        }

        return () => window.removeEventListener("resize", handleResize)

    }, [gotImageData, imageStats])
    
    // Set-up the text data
    useEffect(() => {
        if (gotScaledData) {
            textData.current = [];
            let text1 = {
                id: 1,
                text: "Credits",
                anchor: {x:0.5, y:0},
                x: imageData.current.textCenter,
                y: imageData.current.textTop,
                http: false
            };
            textData.current.push(text1);
            let y = imageData.current.textTop + imageData.current.lineHeight;
            let text2 = {
                id: 2,
                text: "Sounds",
                anchor: {x:0.5, y:0},
                x: imageData.current.textCenter,
                y: y,
                http: false
            };
            textData.current.push(text2);
            y += imageData.current.lineHeight;
            let text3 = {
                id: 3,
                text: "Bee Buzzing - DrDufus",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y,
                http: false
            };
            textData.current.push(text3);
            let text4 = {
                id: 4,
                text: "Link",
                anchor: {x:0, y:0},
                x: imageData.current.textCenter + (imageData.current.textRight - imageData.current.textCenter) * 4/5,
                y: y,
                http: true
            };
            textData.current.push(text4);
            y += imageData.current.lineHeight;
            let text5 = {
                id: 5,
                text: "Leaving Buzz - funwithsound",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y,
                http: false
            };
            textData.current.push(text5);
            let text6= {
                id: 6,
                text: "Link",
                anchor: {x:0, y:0},
                x: imageData.current.textCenter + (imageData.current.textRight - imageData.current.textCenter) * 4/5,
                y: y,
                http: true
            };
            textData.current.push(text6);
            y += imageData.current.lineHeight;
            let text7= {
                id: 7,
                text: "Splat - sebastiantate",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y,
                http: false
            };
            textData.current.push(text7);
            let text8= {
                id: 8,
                text: "Link",
                anchor: {x:0, y:0},
                x: imageData.current.textCenter + (imageData.current.textRight - imageData.current.textCenter) * 4/5,
                y: y,
                http: true
            };
            textData.current.push(text8);
            y += imageData.current.lineHeight;
            let text9= {
                id: 9,
                text: "Crash - DNABeast",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y,
                http: false
            };
            textData.current.push(text9);
            let text10 = {
                id: 10,
                text: "Link",
                anchor: {x:0, y:0},
                x: imageData.current.textCenter + (imageData.current.textRight - imageData.current.textCenter) * 4/5,
                y: y,
                http: true
            };
            textData.current.push(text10);
            y += imageData.current.lineHeight;

            let text11 = {
                id: 11,
                text: "Images",
                anchor: {x:0.5, y:0},
                x: imageData.current.textCenter,
                y: y,
                http: false
            };
            textData.current.push(text11);
            y += imageData.current.lineHeight;
            let text12 = {
                id: 12,
                text: "Images courtesy ChatGPT/DALL-E",
                anchor: {x:0, y:0},
                x: imageData.current.textLeft,
                y: y,
                http: false
            };
            textData.current.push(text12);
            
            // Http Look-Up
            httpLookUp.current = [];
            let http1 = {key: 3, http: "https://freesound.org/people/DrDufus/sounds/462875/"};
            httpLookUp.current.push(http1);
            let http2 = {key: 5, http: "https://freesound.org/people/FunWithSound/sounds/390733/"};
            httpLookUp.current.push(http2);
            let http3 = {key: 7, http: "https://freesound.org/people/sebastientate/sounds/719131/"};
            httpLookUp.current.push(http3);
            let http4 = {key: 9, http: "https://freesound.org/people/DNABeast/sounds/127200/"};
            httpLookUp.current.push(http4);

            setGotTextData(true);
            setTextDataState(textData.current);
        }
    }, [gotScaledData])

    const doLink = (index) => {
        // Look-up the link
        let found = false;
        let item;
        for (item of httpLookUp.current) {
            if (item.key === index) {
                found = true;
                break;
            }
        }
        if (found) {
            const link = item.http;
            window.open(link, "_blank");
        }
        else {
            console.log("Could not find credits link:", index);
        }
    }

    return (
        <Row>
            <Col ref={textCol} className="text-center">
            {gotImageData &&
                <Stage width={stageWidth} height={stageHeight}>
                    {gotTextData && 
                        <>
                        <Sprite
                            image={imageDataState.image}
                            anchor={{x:0, y:0}}
                            scale={imageScale}
                            x={0}
                            y={0}
                        />
                        {
                            textDataState.map((item, index) =>
                                <>
                                {item.http ? (
                                    <Text
                                        key={item.id}
                                        eventMode={'dynamic'}
                                        pointerdown={() => doLink(index)}
                                        text={item.text}
                                        anchor={item.anchor}
                                        x={item.x}
                                        y={item.y}
                                        style={{
                                            font: imageDataState.font,
                                            fontSize: imageDataState.fontSize,
                                            fontStyle: 'italic',
                                            fill: imageDataState.fill,
                                            stroke: imageDataState.stroke
                                        }}
                                    />
                                ) : (
                                    <Text
                                        key={item.id}
                                        text={item.text}
                                        anchor={item.anchor}
                                        x={item.x}
                                        y={item.y}
                                        style={{
                                            font: imageDataState.font,
                                            fontSize: imageDataState.fontSize,
                                            fill: imageDataState.fill,
                                            stroke: imageDataState.stroke
                                        }}
                                    />
                                )
                                }
                                </>
                            )
                        }
                        </>
                    }
                </Stage>
            }
            </Col>
        </Row>
    )
}