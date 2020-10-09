export const flatten = (a) => [].concat(...a);
export const toMatrix = (a, v = 0) =>
	a.reduce(
		(r, k, i) => (i % v === 0 ? r.push([k]) : r[r.length - 1].push(k)) && r,
		[]
	);

export const flipMajorDiagonal = (m) => {
	for (let i = 0; i < m.length; i++) {
		for (let j = i; j < m[0].length; j++) {
			let temp = m[i][j];
			m[i][j] = m[j][i];
			m[j][i] = temp;
		}
	}
	return m;
};

export const getMajorDiagonals = (m) => {
    return [
        [m[0][0], m[1][1], m[2][2]],
        [m[2][2], m[1][1], m[2][2]]
    ];
};

export const arrayEquals = (a, b) => {
	return (
		Array.isArray(a) &&
		Array.isArray(b) &&
		a.length === b.length &&
		a.every((val, index) => val === b[index])
	);
};
