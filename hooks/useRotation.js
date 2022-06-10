import { useState, useEffect } from 'react';

export const useRotation = ({
	isRotationActive,
	totalAngle,
	mouseDown,
	startAngle,
	centerX,
	centerY,
	mouseX,
	mouseY,
}) => {
	const [rotation, setRotation] = useState(0);

	function normalizeDegrees(rotation) {
		return rotation < 0 ? rotation + 360 : rotation;
	}

	useEffect(() => {
		if (isRotationActive) {
			const x = mouseX - centerX;
			const y = mouseY - centerY;
			const R2D = 180 / Math.PI;
			const d = R2D * Math.atan2(y, x);
			const rot = d - startAngle;
			setRotation(Math.round(normalizeDegrees(totalAngle + rot)));
		}
	}, [
		isRotationActive,
		totalAngle,
		mouseDown,
		startAngle,
		centerX,
		centerY,
		mouseX,
		mouseY,
	]);
	return rotation;
};
