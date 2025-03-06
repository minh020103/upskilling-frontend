import { Progress } from "antd"
import React, { useEffect, useState } from "react";
import styled from "styled-components"

const CustomProgress = styled(Progress)(({ }) => ({
    marginBottom: '15px'
}));
export const CustomProgressTime:React.FC<{timeM: number, startTime: number}> = ({timeM, startTime}) => {
    
    
    const [percent, setPercent] = useState<number>(0);

    useEffect(() => {
        
        const interval = setInterval(() => {
                       
            const now = new Date().getTime();
            const progress = (now - startTime)/1000;
            if (progress >= timeM*60) {
                setPercent(100)
                clearInterval(interval);
            } else {
                setPercent((progress / (timeM*60))*100);
            }
        }, ((timeM*60)/100)*1000);
        
        
        return () => clearInterval(interval);
    }, [startTime]);

    


    return (
        <CustomProgress strokeLinecap="butt" strokeWidth={10} strokeColor={'#4ecb73'} type="circle" percent={Math.floor(percent)} />
    )
}