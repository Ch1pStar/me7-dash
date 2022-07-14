import { Container, Sprite } from 'pixi.js';

export default class SpeedGauge extends Container {

	constructor({min = 0, max = 300} = {}) {
		super();

		this.name = 'Speed Gauge';
		this.min = this._value = min;
		this.max = max;
		this._value = 55;

		const bg = Sprite.from('ui/speed_bg');
		const kmph = Sprite.from('ui/kmph');
		const text = new PIXI.Text(this.value,{
			fontFamily: 'lcd_time',
			fontSize: 91,
			fill: 0xFDFED5,
			letterSpacing: 12,
			align: 'right',
			padding: 8,
		});

		text.anchor.x = 1;
		text.position.set(159, 14);
		this.valueText = text;

		kmph.position.set(175, 65)

		this.addChild(bg, text, kmph);
	}

	set value(newVal) {
		this.valueText.text = this._value = (newVal)|0;
	}

	get value() {
		return this._value;
	}
}