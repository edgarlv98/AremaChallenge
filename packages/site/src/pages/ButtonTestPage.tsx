import React, { useState } from 'react';
import Button from '../components/Button.tsx';
import useNumber, { NumberProvider } from '../hooks/useNumber.tsx';

const ButtonTestPageContent = () => {
    const [loading, setLoading] = useState(false);
    const { increment, decrease, setNumber, number } = useNumber();

    const toggleLoading = () => {
        setLoading((prev) => !prev);
    };

    return (
        <div style={{margin: '25px'}}>
            <h1>Button and hook tests</h1>
            <NumberProvider>
                <Button text='Increment (+2)' onClick={() => increment(2)} />
                <Button text='Decrease (-2)' onClick={() => decrease(2)} />
                <Button text='Set number (10)' onClick={() => setNumber(10)} />
                <Button text='Toogle loading' onClick={toggleLoading} loading={loading} />
                <Button text='Disabled' disabled={true} />
                <span>Count: { number }</span>
            </NumberProvider>
        </div>
    );
};

const ButtonTestPage = () => {
    return (
        <NumberProvider>
            <ButtonTestPageContent></ButtonTestPageContent>
        </NumberProvider>
    )
}


export default ButtonTestPage;
