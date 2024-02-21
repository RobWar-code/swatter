import {useRef, useState, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';

export default function Ornaments({
    stageScale,
    ornamentData, 
    setOrnamentData
}) {
    const [,,graphicData] = useOutletContext();
    const ornamentSprites = useRef(null);

    // Get the ornament data
    useEffect(() => {

        for (let i = 0; i < graphicData.length; i++) {
            if (graphicData[i].type = "ornaments") {
                setOrnamentData(graphicData[i].files);
                break;
            }
        }

    }, [graphicData, setOrnamentData])

}