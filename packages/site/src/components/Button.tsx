import React, { useEffect, useState } from 'react';

interface ButtonProps {
	color: 'blue' | 'red' | 'green';
	text: string,
	loading: boolean,
	disabled: boolean,
	onClick: () => void
};

const Button = ({
	color = 'white',
	text = 'Default text',
	loading = false,
	disabled = false,
	onClick = () => {}
}) => {
	useEffect(() => {
		
	}, []);
	
	return <div>
		<button 
			style={{backgroundColor: color, marginBottom: '10px'}}
			className='buttonTest'
			disabled={disabled || loading}
			onClick={onClick}>
				{ loading ? 'Loading...' : text }
		</button>
	</div>
};

export default Button;