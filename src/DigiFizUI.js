import { Container, Sprite } from 'pixi.js';

import { lerp } from './utils/math';
import HorizontalGauge from './UIComponents/HorizontalGauge';
import SpeedGauge from './UIComponents/SpeedGauge';
import RPMGauge from './UIComponents/RPMGauge';

export default class DigiFizUI extends Container {
  constructor() {
    super();

    this._initUI();
  }

  updateData([boost,rpm,waterTemp,voltage, accelPedalPos], delta) {

    this.rpmGauge.value = lerp(this.rpmGauge.value, rpm, delta);
    this.speedGauge.value = lerp(this.rpmGauge.value, rpm, delta)/10;
    this.waterTempGauge.value = waterTemp;
    this.voltageGauge.value = voltage;
    this.boostGauge.value = boost;
    this.accelPedalPosGauge.value = accelPedalPos;
  }

  _initUI() {
    const bg = Sprite.from('ui/dash_bg');
    const logo = Sprite.from('ui/dash_logo');
    const rpmGauge = new RPMGauge();
    const speedGauge = new SpeedGauge();
    const waterTempGauge = new HorizontalGauge({
      icon: 'ui/water_temp_icon',
      name: 'Water Temperature Gauge',
      min: 30,
      max: 120,
    });

    const voltageGauge = new HorizontalGauge({
      icon: 'ui/battery_icon',
      name: 'Battery Voltage Gauge',
      min: 0,
      max: 18,
    });

    const boostGauge = new HorizontalGauge({
      icon: 'ui/turbo_icon',
      name: 'Boost Gauge',
      min: 0,
      max: 3000,
    });

    const accelPedalPosGauge = new HorizontalGauge({
      icon: 'ui/accel_pedal_icon',
      name: 'Acceleration Pedal Postion Gauge',
      min: 0,
      max: 100,
    });

    rpmGauge.position.set(65, 10);
    speedGauge.position.set(326, 88);
    logo.position.set(15, 10);
    waterTempGauge.position.set(700, 40);
    voltageGauge.position.set(665, 40);
    boostGauge.position.set(630, 40);
    accelPedalPosGauge.position.set(595, 40);

    this.addChild(bg, logo, rpmGauge, speedGauge, voltageGauge, waterTempGauge, boostGauge, accelPedalPosGauge);

    this.voltageGauge = voltageGauge;
    this.boostGauge = boostGauge;
    this.accelPedalPosGauge = accelPedalPosGauge;
    this.waterTempGauge = waterTempGauge;
    this.rpmGauge = rpmGauge;
    this.speedGauge = speedGauge;
  }
}