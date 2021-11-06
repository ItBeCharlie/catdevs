import React from 'react'

interface PenisProps {
pernis:string
	titus: number
}

export const Penis: React.FC<PenisProps> = ({pernis, titus}) => {
	return <div>{pernis}{titus}</div>;
}


// <Penis pernis="Small. Big Balls." titus={2} />