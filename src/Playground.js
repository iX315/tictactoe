import React, { useEffect, useState } from "react";
import Confetti from "./Confetti";
import { ReactComponent as CircleSVG } from "./circle.svg";
import { ReactComponent as CrossSVG } from "./cross.svg";
import { flipMajorDiagonal, getMajorDiagonals, toMatrix } from './Utils'

const Circle = () => <CircleSVG />;
const Cross = () => <CrossSVG />;

const valuesEnum = [<></>, <Circle />, <Cross />];
const endGameMsgEnum = {
    "even": "game over - even",
    "pXwin": "game over - X wins",
    "pOwin": "game over - O wins"
};

const Grid = ({ children }) => <div className="grid">{children}</div>;
const Cell = ({ i, val, updateValue }) => (
	<div onClick={updateValue} onKeyUp={(e) => e.key === "Enter" && updateValue(i)} tabIndex="0" className={`cell _${i}`}>
		{valuesEnum[val]}
	</div>
);

const Cells = ({ values, updateValue }) => {
	return values.map((val, i) => (
		<Cell key={i} i={i} updateValue={() => updateValue(i)} val={val} />
	));
};

const Playground = () => {
	const [values, setValues] = useState(Array(9).fill(0));
	const [player, setPlayer] = useState(1);
	const [endGame, setEndGame] = useState(false);

	const updateValue = (index) => {
		if (values[index] === 0) {
			values[index] = player;
            setValues([...values]);
            setPlayer(player === 1 ? 2 : 1);
		}
    };

	useEffect(() => {
        // check end game
        let notZero = (v) => v !== 0
        if (values.every(notZero)) {
            return setEndGame(endGameMsgEnum.even);
        }
        let matrix = toMatrix(values, 3)
        let p1 = (v) => v === 1
        let p2 = (v) => v === 2
        let check = e => {
            if (e.every(notZero) && e.every(p1)) {
                return setEndGame(endGameMsgEnum.pOwin);
            }
            if (e.every(notZero) && e.every(p2)) {
                return setEndGame(endGameMsgEnum.pXwin);
            }
        }
        matrix.forEach(check)
        flipMajorDiagonal(matrix).forEach(check)
        getMajorDiagonals(matrix).forEach(check)
	}, [values]);

	return (
		<div className="playground">
			<h1>TicTacToe</h1>
			{endGame ? (
				<>
                    <Confetti />
                    <h2>{endGame}</h2>
                    <button onClick={() => document.location.reload()}>Retry</button>
                </>
			) : (
				<Grid>
					<Cells values={values} updateValue={updateValue} />
				</Grid>
			)}
		</div>
	);
};

export default Playground