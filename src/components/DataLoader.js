import {useEffect, useState, useRef} from 'react';
import GLOBALS from '../constants/constants';

export default function DataLoader({
    setGraphicData,
    setDataFetchError,
    setGraphicDataFetched
}) 
{
    const [fetchRun, setFetchRun] = useState(false);
    const graphicDataFile = useRef(GLOBALS.graphicDataFile);
    const graphicDataPath = useRef(GLOBALS.graphicDataPath);

    useEffect(() => {

        const fetchGraphicData = async () => {
            try {
                const fileListPath = graphicDataPath.current + graphicDataFile.current;
                const response = await fetch(fileListPath, {
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}  
                });
                
                // Check if the fetch was successful
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
                setGraphicData(data);
                console.log(data);
                setGraphicDataFetched(true);
            }
            catch (e) {
                setDataFetchError(true);
            }
        }

        if (!fetchRun) {
            fetchGraphicData();
            setFetchRun(true);
        }
    }, [fetchRun, setGraphicDataFetched, setDataFetchError, setGraphicData]);
}