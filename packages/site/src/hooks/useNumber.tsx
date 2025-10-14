import React, { createContext, ReactNode, useContext, useState } from 'react';

// Create Interface
interface ContextNumberType {
    number: number,
    increment: (value: number) => void,
    decrease: (value: number) => void,
    setNumber: React.Dispatch<React.SetStateAction<number>>
};

// Create Context
const ContextNumber = createContext<ContextNumberType | undefined>(undefined);

// Create Provider
export const NumberProvider: React.FC< { children: ReactNode }> = ({ children }) => {
    const [number, setNumber] = useState(0);

    const increment = (value: number) => {
        setNumber((prev) => prev + value);
    };

    const decrease = (value: number) => {
        setNumber((prev) => prev - value);
    };

    return (
        <ContextNumber.Provider value={{ increment, decrease, setNumber, number }}>
            { children }
        </ContextNumber.Provider>
    )
}

// Definition of hook
const useNumber = () => {
    const context = useContext(ContextNumber);

    if (!context) {
        throw new Error('No context provided');
    }

    return context;
};

export default useNumber;
