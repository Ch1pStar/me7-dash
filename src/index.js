import * as PIXI from 'pixi.js';
import DashApp from './DashApp';
import {getDashSize} from './utils/math';

window.PIXI = PIXI;

document.addEventListener('DOMContentLoaded', ()=>{

	const app = new DashApp(getDashSize());

	window.app = app;
	document.body.appendChild(app.view);
});
