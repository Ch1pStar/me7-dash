import * as PIXI from 'pixi.js';
import DashApp from './DashApp';

window.PIXI = PIXI;

document.addEventListener('DOMContentLoaded', ()=>{

	const app = new DashApp();

	window.app = app;
	document.body.appendChild(app.view);
});
