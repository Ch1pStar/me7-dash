import { Container, Sprite } from 'pixi.js';
import { scaleNumber } from '../utils/math';

export default class RPMGauge extends Container {

	constructor({min = 0, max = 10000} = {}) {
		super();

		this.name = 'RPM Gauge';
		this.min = this._value = min;
		this.max = max;

		const bg = Sprite.from('ui/rpm_bg');
		const progress = Sprite.from('ui/rpm_progress');
		const progressMask = new PIXI.Graphics();
		const rpmLabel = Sprite.from('ui/rpm_label');

		progress.x = 2;

		// todo, fix asset loading so sprite w&h are not reported as 0
		const width = 448;
		const height = 145;

	    progressMask.beginFill(0);
	    progressMask.drawRect(0,0, width, height)
	    progressMask.position.set(-width, 0);
		progress.mask = progressMask;
		this.progressMask = progressMask;


		rpmLabel.position.set(25, 153)

		this.addChild(bg, progress, progressMask, rpmLabel);
	}


	get value() {
		return this._value;
	}

	set value(newVal) {
		const mask = this.progressMask;

		mask.x = scaleNumber(newVal, 0, 7500, -448, 0) | 0;
		this._value = newVal;
	}
}