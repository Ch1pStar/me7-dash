
export function clamp(num, min, max){
	return Math.min(Math.max(num, min), max);
}

export function lerp (value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

export function scaleNumber(OldValue, OldMin, OldMax, NewMin, NewMax) {
	return (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
}

export function getDashSize({baseWidth}) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scale = width/baseWidth;

    return {width, height, scale};
}