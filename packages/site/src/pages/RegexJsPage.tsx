import React, { useEffect, useState } from 'react'

const RegexJsPage = () => {
    const [firstGroup, setFirstGroup] = useState('');
    const [secondGroup, setSecondGroup] = useState('');
    const [thirdGroup, setThirdGroup] = useState('');

    useEffect(() => {
        regex();
    }, []);

    const regex = () => {
        const str = 'A0129T2019_9A0';
        const regularExpression = /A(?<first>\d+)T(?<second>\d+)_(?<third>[0-9A-Z]+)/;
        const test = str.match(regularExpression);

        if (test && test.groups) {
            const { first, second, third } = test.groups;
            setFirstGroup(first);
            setSecondGroup(second);
            setThirdGroup(third);
        }
    };

    return (
        <div style={{margin: '25px'}}>
            <h1>Regex challenge</h1>
            <h4>String: A0129T2019_9A0</h4>
            <h5>First group: { firstGroup }</h5>
            <h5>Second group: { secondGroup }</h5>
            <h5>Third group: { thirdGroup }</h5>
        </div>
    )
};

export default RegexJsPage;
