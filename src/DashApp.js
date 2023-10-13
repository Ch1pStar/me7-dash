import { Application, Container, Sprite, Texture } from 'pixi.js';
import * as animate from '@pixi/animate';
import Assets from './AssetManager';
import {getDashSize} from './utils/math';
import dashAnim from './assets/animations/dash';
import dashAnimPortrait from './assets/animations/PortraitDash';
import createUI from './ui';

export default class DashApp extends Application {

	constructor() {
		super({ resizeTo: window });

		this.renderer.backgroundColor = 0x1C1E1B;
		this.view.addEventListener('dblclick', ()=>this.view.requestFullscreen());
		document.addEventListener('keyup', (e)=>e.ctrlKey&&e.key=='x'&&this.view.requestFullscreen())

		Assets.loadImages()
		.then(()=>{
			dashAnim.shapes = Assets.shapes;
			dashAnimPortrait.shapes = Assets.shapes;
		})
		.then((loader)=>this._initUI())
		.then(()=>this._connectToLogServer())

		this.renderer.on('resize', ()=>this._resizeUI())

		this._gpsSpeed = 0;
		this._gpsConfig = {
		  enableHighAccuracy: true,
		  maximumAge: 1000,
		};
	}

	_initUI() {
		const urlParams = new URLSearchParams(window.location.search);
		const isLandscape = Boolean(urlParams.get('landscape') !== null);
		const animExport = isLandscape ? dashAnim : dashAnimPortrait;

		animExport.setup(animate);

		const anim = isLandscape ? animExport.lib.dash : animExport.lib.PortraitDash;
		const ui = createUI({anim});

		this.ui = ui;
		this.ui.baseWidth = animExport.width;
		this._resizeUI();
		this.stage.addChild(ui);
    	this.ticker.add((delta)=>this._updateUI(delta));
	}

	_resizeUI() {
		this.ui.scale.set(getDashSize({baseWidth: this.ui.baseWidth}).scale);		
	}

	_updateUI(delta) {
		if(!this.engineData) return;

		// navigator.geolocation.getCurrentPosition((position) => {
		// 	this._gpsSpeed = Number(position.coords.speed)*3.6
		// }, null, this._gpsConfig);

		this.ui.updateData(this.engineData, delta);
	}

	_connectToLogServer() {
		const ws = new WebSocket(`wss://${window.location.hostname}:8085`);

		ws.binaryType = "arraybuffer";

		ws.addEventListener('message', (msg)=>{
			this.engineData = new Float32Array(msg.data);
		});

		document.addEventListener('keyup', (e)=>{
			switch(e.key.toLowerCase()) {
			case 'd':
				ws.send('{ "command": "readDTCs" }');
				break;
			case 'c':
				ws.send('{ "command": "clearDTCs" }');
				break;
			}

		})

	}

}