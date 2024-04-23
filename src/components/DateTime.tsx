import { useEffect, useState } from 'react';

const DateTime = () => {
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    if (!currentDate) {
        return null;
    }

    const day = currentDate.toLocaleString('default', { weekday: 'long' });
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    return (
        <div>
            <p>Day: {day}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
        </div>
    );
};

export default DateTime;
