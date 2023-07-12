import { Application, Container, Sprite, Texture } from 'pixi.js';
import Assets from './AssetManager';
import DigiFizUI from './DigiFizUI';
import {getDashSize} from './utils/math';
import dashAnim from './assets/animations/dash';

export default class DashApp extends Application {

	constructor(options) {
		super(options);

		this.view.addEventListener('dblclick', ()=>this.view.requestFullscreen());
		document.addEventListener('keyup', (e)=>e.ctrlKey&&e.key=='x'&&this.view.requestFullscreen())

		Assets.loadImages()
		.then(()=>dashAnim.shapes = Assets.shapes)
		.then((loader)=>this._initUI())
		.then(()=>this._connectToLogServer())

		globalThis.__PIXI_APP__ = this;
	}

	_initUI() {
		const ui = new DigiFizUI(dashAnim);

		ui.scale.set(getDashSize().scale);
		this.ui = ui;
		this.stage.addChild(ui);
    	this.ticker.add((delta)=>this._updateUI(delta));
	}

	_updateUI(delta) {
		if(!this.engineData) return;

		this.ui.updateData(this.engineData, delta);
	}

	_connectToLogServer() {
		const ws = new WebSocket(`ws://${window.location.hostname}:8085`);

		ws.binaryType = "arraybuffer";

		ws.addEventListener('message', (msg)=>{
			this.engineData = new Float32Array(msg.data);
		});

	}

}