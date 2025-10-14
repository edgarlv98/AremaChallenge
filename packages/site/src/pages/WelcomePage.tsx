import React from 'react'

const WelcomePage = () => {
    const routes = [
        {
            title: 'JS / TS Regex',
            route: '/regexJS'
        },
        {
            title: 'Button Component page',
            route: '/buttonTestPage'
        },
        {
            title: 'Login',
            route: '/login'
        },
        {
            title: 'Signup',
            route: '/signup'
        }
    ];

    return (
        <div style={{margin: '25px'}}>
            <h2>Welcome</h2>
            <h4>Navigate to</h4>
            <ul>
                { routes.map((item, index) => (
                    <li key={index}>
                        <a href={item.route}>{ item.title }</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WelcomePage
