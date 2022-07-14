
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

export function getDashSize() {
    const baseWidth = 749;
    const baseHeight = 285;

    const width = window.innerWidth;
    const scale = width/baseWidth;
    const height = 285*scale;

    return {width, height, scale};
}