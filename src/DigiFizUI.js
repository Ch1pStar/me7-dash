import { Container, Sprite } from 'pixi.js';
import * as animate from '@pixi/animate';

import { lerp, scaleNumber } from './utils/math';
import dashAnim from './assets/animations/dash';
import HorizontalGauge from './UIComponents/HorizontalGauge';
import SpeedGauge from './UIComponents/SpeedGauge';
import RPMGauge from './UIComponents/RPMGauge';

import Config from './config';


export default class DigiFizUI extends Container {
  constructor(anim) {
    super();

    anim.setup(animate);
    this._anim = new anim.lib.dash;

    this._initUI();
  }

  updateData([boost,rpm,waterTemp,voltage, accelPedalPos], delta) {

    this._currentRpmNormalized = lerp(this._currentRpmNormalized, rpm, delta)/100|0;

    this.throttleGauge.gotoAndStop(this._getNormalizedVal(accelPedalPos, 'throttle'));
    this.boostGauge.gotoAndStop(this._getNormalizedVal(boost, 'boost'));
    this.waterGauge.gotoAndStop(this._getNormalizedVal(waterTemp, 'water'));
    this.voltageGauge.gotoAndStop(this._getNormalizedVal(voltage, 'voltage'));
    this.rpmGauge.gotoAndStop(this._currentRpmNormalized);

    // tmp until we can log speed via GPS or from gearbox
    // this.speedo.text = this._currentRpmNormalized*10;
    this.speedo.text = boost.toFixed(0);
  }

  _initUI() {
    this._currentRpmNormalized = 0;
    this.rpmGauge.gotoAndStop(this._currentRpmNormalized);
    this.waterGauge.gotoAndStop(0);
    this.voltageGauge.gotoAndStop(0);
    this.boostGauge.gotoAndStop(0);
    this.throttleGauge.gotoAndStop(0);

    // cant set this in animate :/
    this.speedo.style.padding = 8;

    this.addChild(this._anim);
  }

  _getNormalizedVal(val, name) {
    const {min, max} = Config.gauges[name];

    return scaleNumber(val, min, max, 0,100)|0;
  }

  get speedo() {
    return this._anim.speedo.speedoVal;
  }

  get rpmGauge() {
    return this._anim.rpmGauge;
  }

  get throttleGauge() {
    return this._anim.throttleGauge.progress;
  }

  get boostGauge() {
    return this._anim.boostGauge.progress;
  }

  get waterGauge() {
    return this._anim.waterTempGauge.progress;
  }

  get voltageGauge() {
    return this._anim.voltageGauge.progress;
  }
}