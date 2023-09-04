import { Texture } from 'pixi.js';

const data = {
    version: 2,
    stage: null,
    background: 0xffffff,
    width: 412,
    height: 846,
    framerate: 60,
    totalFrames: 1,
    assets: {
        "accel_pedal_icon": "../ui/accel_pedal_icon.png",
        "horiz_gauge_progress": "../ui/horiz_gauge_progress.png",
        "horiz_gauge_bg": "../ui/horiz_gauge_bg.png",
        "turbo_icon": "../ui/turbo_icon.png",
        "battery_icon": "../ui/battery_icon.png",
        "water_temp_icon": "../ui/water_temp_icon.png",
        "rpm_progress": "../ui/rpm_progress.png",
        "rpm_bg": "../ui/rpm_bg.png",
        "rpm_label": "../ui/rpm_label.png",
        "kmph": "../ui/kmph.png",
        "speed_bg": "../ui/speed_bg.png",
        "dash_logo": "../ui/dash_logo.png",
        "dash_bg": "../ui/dash_bg.png",
        "PortraitDash": "../ui/PortraitDash.shapes.json"
    },
    lib: {},
    shapes: {},
    textures: {},
    spritesheets: [],
    getTexture: function (id) {
        if (data.textures[id]) {
            return data.textures[id];
        }

        return Texture.from(id);
    },
    setup: function (animate) {
        const MovieClip = animate.MovieClip;
        const Container = animate.Container;
        const Sprite = animate.Sprite;
        const Text = animate.Text;
        const Graphics = animate.Graphics;


        data.lib.horizGauge = class extends MovieClip {
            constructor() {
                super({
                    duration: 100
                });
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.PortraitDash[0])
                    .setRenderable(false);
                const instance3 = new Sprite(data.getTexture("horiz_gauge_bg"));
                const instance2 = new Sprite(data.getTexture("horiz_gauge_progress"))
                    .setTransform(1)
                    .setMask(instance1);
                this.addTimedChild(instance1, 0, 100, {
                        "0": {
                            y: 0,
                            sy: 1
                        },
                        "1": {
                            y: -90.25,
                            sy: 1.95
                        },
                        "2": {
                            y: -180.5,
                            sy: 2.9
                        },
                        "3": {
                            y: -275.45,
                            sy: 3.9
                        },
                        "4": {
                            y: -365.7,
                            sy: 4.85
                        },
                        "5": {
                            y: -455.95,
                            sy: 5.8
                        },
                        "6": {
                            y: -546.2,
                            sy: 6.75
                        },
                        "7": {
                            y: -636.45,
                            sy: 7.7
                        },
                        "8": {
                            y: -731.4,
                            sy: 8.7
                        },
                        "9": {
                            y: -821.65,
                            sy: 9.65
                        },
                        "10": {
                            y: -911.9,
                            sy: 10.6
                        },
                        "11": {
                            y: -1002.15,
                            sy: 11.55
                        },
                        "12": {
                            y: -1092.4,
                            sy: 12.5
                        },
                        "13": {
                            y: -1187.35,
                            sy: 13.5
                        },
                        "14": {
                            y: -1277.6,
                            sy: 14.45
                        },
                        "15": {
                            y: -1367.85,
                            sy: 15.4
                        },
                        "16": {
                            y: -1458.1,
                            sy: 16.35
                        },
                        "17": {
                            y: -1548.35,
                            sy: 17.3
                        },
                        "18": {
                            y: -1643.3,
                            sy: 18.3
                        },
                        "19": {
                            y: -1733.55,
                            sy: 19.25
                        },
                        "20": {
                            y: -1823.8,
                            sy: 20.2
                        },
                        "21": {
                            y: -1914.05,
                            sy: 21.15
                        },
                        "22": {
                            y: -2004.3,
                            sy: 22.1
                        },
                        "23": {
                            y: -2099.25,
                            sy: 23.1
                        },
                        "24": {
                            y: -2189.5,
                            sy: 24.05
                        },
                        "25": {
                            y: -2279.75,
                            sy: 25
                        },
                        "26": {
                            y: -2370,
                            sy: 25.95
                        },
                        "27": {
                            y: -2460.25,
                            sy: 26.9
                        },
                        "28": {
                            y: -2555.2,
                            sy: 27.9
                        },
                        "29": {
                            y: -2645.45,
                            sy: 28.85
                        },
                        "30": {
                            y: -2735.7,
                            sy: 29.8
                        },
                        "31": {
                            y: -2825.95,
                            sy: 30.75
                        },
                        "32": {
                            y: -2916.2,
                            sy: 31.7
                        },
                        "33": {
                            y: -3011.15,
                            sy: 32.7
                        },
                        "34": {
                            y: -3101.4,
                            sy: 33.65
                        },
                        "35": {
                            y: -3191.65,
                            sy: 34.6
                        },
                        "36": {
                            y: -3281.9,
                            sy: 35.55
                        },
                        "37": {
                            y: -3372.15,
                            sy: 36.5
                        },
                        "38": {
                            y: -3467.1,
                            sy: 37.5
                        },
                        "39": {
                            y: -3557.35,
                            sy: 38.45
                        },
                        "40": {
                            y: -3647.6,
                            sy: 39.4
                        },
                        "41": {
                            y: -3737.85,
                            sy: 40.35
                        },
                        "42": {
                            y: -3828.1,
                            sy: 41.3
                        },
                        "43": {
                            y: -3923.05,
                            sy: 42.3
                        },
                        "44": {
                            y: -4013.3,
                            sy: 43.25
                        },
                        "45": {
                            y: -4103.55,
                            sy: 44.2
                        },
                        "46": {
                            y: -4193.8,
                            sy: 45.15
                        },
                        "47": {
                            y: -4284.05,
                            sy: 46.1
                        },
                        "48": {
                            y: -4379,
                            sy: 47.1
                        },
                        "49": {
                            y: -4469.25,
                            sy: 48.05
                        },
                        "50": {
                            y: -4554.75,
                            sy: 48.95
                        },
                        "51": {
                            y: -4645,
                            sy: 49.9
                        },
                        "52": {
                            y: -4739.95,
                            sy: 50.9
                        },
                        "53": {
                            y: -4830.2,
                            sy: 51.85
                        },
                        "54": {
                            y: -4920.45,
                            sy: 52.8
                        },
                        "55": {
                            y: -5010.7,
                            sy: 53.75
                        },
                        "56": {
                            y: -5100.95,
                            sy: 54.7
                        },
                        "57": {
                            y: -5195.9,
                            sy: 55.7
                        },
                        "58": {
                            y: -5286.15,
                            sy: 56.65
                        },
                        "59": {
                            y: -5376.4,
                            sy: 57.6
                        },
                        "60": {
                            y: -5466.65,
                            sy: 58.55
                        },
                        "61": {
                            y: -5556.9,
                            sy: 59.5
                        },
                        "62": {
                            y: -5651.85,
                            sy: 60.5
                        },
                        "63": {
                            y: -5742.1,
                            sy: 61.45
                        },
                        "64": {
                            y: -5832.35,
                            sy: 62.4
                        },
                        "65": {
                            y: -5922.6,
                            sy: 63.35
                        },
                        "66": {
                            y: -6012.85,
                            sy: 64.3
                        },
                        "67": {
                            y: -6107.8,
                            sy: 65.3
                        },
                        "68": {
                            y: -6198.05,
                            sy: 66.25
                        },
                        "69": {
                            y: -6288.3,
                            sy: 67.2
                        },
                        "70": {
                            y: -6378.55,
                            sy: 68.15
                        },
                        "71": {
                            y: -6468.8,
                            sy: 69.1
                        },
                        "72": {
                            y: -6563.75,
                            sy: 70.1
                        },
                        "73": {
                            y: -6654,
                            sy: 71.05
                        },
                        "74": {
                            y: -6744.25,
                            sy: 72
                        },
                        "75": {
                            y: -6834.5,
                            sy: 72.95
                        },
                        "76": {
                            y: -6924.75,
                            sy: 73.9
                        },
                        "77": {
                            y: -7019.7,
                            sy: 74.9
                        },
                        "78": {
                            y: -7109.95,
                            sy: 75.85
                        },
                        "79": {
                            y: -7200.2,
                            sy: 76.8
                        },
                        "80": {
                            y: -7290.45,
                            sy: 77.75
                        },
                        "81": {
                            y: -7380.7,
                            sy: 78.7
                        },
                        "82": {
                            y: -7475.65,
                            sy: 79.7
                        },
                        "83": {
                            y: -7565.9,
                            sy: 80.65
                        },
                        "84": {
                            y: -7656.15,
                            sy: 81.6
                        },
                        "85": {
                            y: -7746.4,
                            sy: 82.55
                        },
                        "86": {
                            y: -7836.65,
                            sy: 83.5
                        },
                        "87": {
                            y: -7931.6,
                            sy: 84.5
                        },
                        "88": {
                            y: -8021.85,
                            sy: 85.45
                        },
                        "89": {
                            y: -8112.1,
                            sy: 86.4
                        },
                        "90": {
                            y: -8202.35,
                            sy: 87.35
                        },
                        "91": {
                            y: -8292.6,
                            sy: 88.3
                        },
                        "92": {
                            y: -8387.55,
                            sy: 89.3
                        },
                        "93": {
                            y: -8477.8,
                            sy: 90.25
                        },
                        "94": {
                            y: -8568.05,
                            sy: 91.2
                        },
                        "95": {
                            y: -8658.3,
                            sy: 92.15
                        },
                        "96": {
                            y: -8748.55,
                            sy: 93.1
                        },
                        "97": {
                            y: -8843.5,
                            sy: 94.1
                        },
                        "98": {
                            y: -8933.75,
                            sy: 95.05
                        },
                        "99": {
                            y: -9024,
                            sy: 96
                        }
                    })
                    .addTimedChild(instance3)
                    .addTimedChild(instance2);
            }
        };

        data.lib.throttleGauge = class extends Container {
            constructor() {
                super();
                const instance2 = new data.lib.horizGauge();
                this[instance2.name = "progress"] = instance2;
                const instance1 = new Sprite(data.getTexture("accel_pedal_icon"))
                    .setTransform(-5, 103);
                this.addChild(instance2, instance1);
            }
        };

        data.lib.boostGauge = class extends Container {
            constructor() {
                super();
                const instance2 = new Sprite(data.getTexture("turbo_icon"))
                    .setTransform(0, 104);
                const instance1 = new data.lib.horizGauge();
                this[instance1.name = "progress"] = instance1;
                this.addChild(instance2, instance1);
            }
        };

        data.lib.voltageGauge = class extends Container {
            constructor() {
                super();
                const instance2 = new data.lib.horizGauge();
                this[instance2.name = "progress"] = instance2;
                const instance1 = new Sprite(data.getTexture("battery_icon"))
                    .setTransform(-5, 101);
                this.addChild(instance2, instance1);
            }
        };

        data.lib.tempGauge = class extends Container {
            constructor() {
                super();
                const instance2 = new data.lib.horizGauge();
                this[instance2.name = "progress"] = instance2;
                const instance1 = new Sprite(data.getTexture("water_temp_icon"))
                    .setTransform(-4, 102);
                this.addChild(instance2, instance1);
            }
        };

        data.lib.rpmGauge = class extends MovieClip {
            constructor() {
                super({
                    duration: 70
                });
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.PortraitDash[0])
                    .setRenderable(false);
                const instance4 = new Sprite(data.getTexture("rpm_label"))
                    .setTransform(32, 182, 1.389, 1.389);
                const instance3 = new Sprite(data.getTexture("rpm_bg"))
                    .setTransform(8, 37);
                const instance2 = new Sprite(data.getTexture("rpm_progress"))
                    .setTransform(8, 37)
                    .setMask(instance1);
                this.addTimedChild(instance1, 0, 70, {
                        "0": {
                            x: 8,
                            y: -13593,
                            sx: 0.063,
                            sy: 145
                        },
                        "1": {
                            sx: 0.469
                        },
                        "2": {
                            sx: 0.872
                        },
                        "3": {
                            sx: 1.278
                        },
                        "4": {
                            sx: 1.681
                        },
                        "5": {
                            sx: 2.087
                        },
                        "6": {
                            sx: 2.491
                        },
                        "7": {
                            sx: 2.897
                        },
                        "8": {
                            sx: 3.3
                        },
                        "9": {
                            sx: 3.706
                        },
                        "10": {
                            sx: 4.113
                        },
                        "11": {
                            sx: 4.516
                        },
                        "12": {
                            sx: 4.922
                        },
                        "13": {
                            sx: 5.325
                        },
                        "14": {
                            sx: 5.731
                        },
                        "15": {
                            sx: 6.134
                        },
                        "16": {
                            sx: 6.541
                        },
                        "17": {
                            sx: 6.947
                        },
                        "18": {
                            sx: 7.35
                        },
                        "19": {
                            sx: 7.756
                        },
                        "20": {
                            sx: 8.159
                        },
                        "21": {
                            sx: 8.566
                        },
                        "22": {
                            sx: 8.969
                        },
                        "23": {
                            sx: 9.375
                        },
                        "24": {
                            sx: 9.781
                        },
                        "25": {
                            sx: 10.184
                        },
                        "26": {
                            sx: 10.591
                        },
                        "27": {
                            sx: 10.994
                        },
                        "28": {
                            sx: 11.4
                        },
                        "29": {
                            sx: 11.803
                        },
                        "30": {
                            sx: 12.209
                        },
                        "31": {
                            sx: 12.616
                        },
                        "32": {
                            sx: 13.019
                        },
                        "33": {
                            sx: 13.425
                        },
                        "34": {
                            sx: 13.828
                        },
                        "35": {
                            sx: 14.234
                        },
                        "36": {
                            sx: 14.637
                        },
                        "37": {
                            sx: 15.044
                        },
                        "38": {
                            sx: 15.447
                        },
                        "39": {
                            sx: 15.853
                        },
                        "40": {
                            sx: 16.259
                        },
                        "41": {
                            sx: 16.663
                        },
                        "42": {
                            sx: 17.069
                        },
                        "43": {
                            sx: 17.472
                        },
                        "44": {
                            sx: 17.878
                        },
                        "45": {
                            sx: 18.281
                        },
                        "46": {
                            sx: 18.688
                        },
                        "47": {
                            sx: 19.094
                        },
                        "48": {
                            sx: 19.497
                        },
                        "49": {
                            sx: 19.903
                        },
                        "50": {
                            sx: 20.306
                        },
                        "51": {
                            sx: 20.712
                        },
                        "52": {
                            sx: 21.116
                        },
                        "53": {
                            sx: 21.522
                        },
                        "54": {
                            sx: 21.928
                        },
                        "55": {
                            sx: 22.331
                        },
                        "56": {
                            sx: 22.738
                        },
                        "57": {
                            sx: 23.141
                        },
                        "58": {
                            sx: 23.547
                        },
                        "59": {
                            sx: 23.95
                        },
                        "60": {
                            sx: 24.356
                        },
                        "61": {
                            sx: 24.762
                        },
                        "62": {
                            sx: 25.166
                        },
                        "63": {
                            sx: 25.572
                        },
                        "64": {
                            sx: 25.975
                        },
                        "65": {
                            sx: 26.381
                        },
                        "66": {
                            sx: 26.784
                        },
                        "67": {
                            sx: 27.191
                        },
                        "68": {
                            sx: 27.594
                        },
                        "69": {
                            sx: 28
                        }
                    })
                    .addTimedChild(instance4)
                    .addTimedChild(instance3)
                    .addTimedChild(instance2);
            }
        };

        data.lib.speedo = class extends Container {
            constructor() {
                super();
                const instance3 = new Sprite(data.getTexture("speed_bg"))
                    .setTransform(44, 9);
                const instance2 = new Sprite(data.getTexture("kmph"))
                    .setTransform(220, 67, 1.571, 1.571);
                const instance1 = new Text("55")
                    .setStyle({
                        fontFamily: "LCD AT&T Phone Time/Date",
                        fontSize: 91,
                        fill: "#fdfed5",
                        letterSpacing: 12,
                        leading: 8,
                        wordWrap: true,
                        wordWrapWidth: 108.2
                    })
                    .setAlign("right")
                    .setTransform(203.2, 22);
                this[instance1.name = "speedoVal"] = instance1;
                this.addChild(instance3, instance2, instance1);
            }
        };

        data.lib.PortraitDash = class extends MovieClip {
            constructor() {
                super({
                    duration: 1,
                    framerate: 60
                });
                const instance8 = new Sprite(data.getTexture("dash_bg"))
                    .setTransform(0, 0, 0.55, 2.966);
                const instance7 = new Sprite(data.getTexture("dash_logo"))
                    .setTransform(30, 28, 1.848, 1.848);
                const instance6 = new data.lib.speedo()
                    .setTransform(41.95, 402.05);
                this[instance6.name = "speedo"] = instance6;
                const instance5 = new data.lib.rpmGauge()
                    .setTransform(-7.35, 121.3, 0.916);
                this[instance5.name = "rpmGauge"] = instance5;
                const instance4 = new data.lib.tempGauge()
                    .setTransform(256.65, 230.95);
                this[instance4.name = "waterTempGauge"] = instance4;
                const instance3 = new data.lib.voltageGauge()
                    .setTransform(371.65, 230.95);
                this[instance3.name = "voltageGauge"] = instance3;
                const instance2 = new data.lib.boostGauge()
                    .setTransform(332.65, 230.95);
                this[instance2.name = "boostGauge"] = instance2;
                const instance1 = new data.lib.throttleGauge()
                    .setTransform(297.65, 230.95);
                this[instance1.name = "throttleGauge"] = instance1;
                this.addChild(instance8, instance7, instance6, instance5, instance4, instance3, instance2, instance1);
            }
        };
        data.stage = data.lib.PortraitDash;
    }
};


export default data;