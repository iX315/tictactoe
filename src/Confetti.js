import React from 'react';
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default () => {
	const { width, height } = useWindowSize();
    return <Confetti
        width={width}
        height={height}
        numberOfPieces={50}
        confettiSource={{ x: width/2, y: height/2 }}
        recycle={false}
    />;
};
