import { Container, Sprite, TilingSprite, Texture } from 'pixi.js';
import {scaleNumber} from '../utils/math';

export default class HorizontalGauge extends Container {

	constructor({name, icon, min, max}) {
		super();

		this.name = name;
		this.min = this._value = min;
		this.max = max;

		const bg = Sprite.from('ui/horiz_gauge_bg');
		const iconSprite = Sprite.from(icon);

		iconSprite.anchor.set(0.5);
		iconSprite.position.set(10, 115);


		const fillSprite = TilingSprite.from('ui/horiz_gauge_fill', {
			width: 14, 
			height: 4,
		});

		fillSprite. x = 1;
		fillSprite.y = bg.height-2;
		fillSprite.scale.y = -1;

		this.fillSprite = fillSprite;
		this.addChild(bg, iconSprite, fillSprite);
	}

	get value() {
		return this._value;
	}

	set value(newVal) {
		this.fillSprite.height = scaleNumber(newVal, this.min, this.max, 0, 90) | 0;
		this._value = newVal;
	}

}