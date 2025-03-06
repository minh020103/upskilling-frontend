import React, { useEffect, useState } from 'react';

interface TimeProps {
    timeM: number;
    startTime: number;
}

export const TimeCount: React.FC<TimeProps> = ({ timeM, startTime }) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const remaining = startTime + timeM * 60 * 1000 - now;

            if (remaining <= 0) {
                setTimeRemaining(0);
                clearInterval(interval);
            } else {
                setTimeRemaining(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);



    const formatNumber = (number: number) => (number < 10 ? '0' + number : number.toString());

    const calculateTime = () => {
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);

        return { hours, minutes, seconds };
    };

    const { hours, minutes, seconds } = calculateTime();

    return (
        <div id="countdown">
            {`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`}
        </div>
    );
};
