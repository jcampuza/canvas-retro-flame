const noop = () => {};

export class AnimationLoop {
    /**
     *
     * @param {Function} render - render function to be called
     * @param {Function} update - update function to be called
     * @param {Number} step - How long each step should be, defaults to 60FPS (1/60)
     */
    constructor(render = noop, update = noop, step = 1000/60) {
        this.render = render;
        this.update = update;

        this.step = step;
        this.frameId = null;
        this.acc = 0;
        this.ticks = 0;
        this.lastTime = null;

        this.frame = this.frame.bind(this);
    }

    frame(time) {
        if (this.lastTime != null) {
            let acc = this.acc + (time - this.lastTime);
            while (acc > this.step) {
                this.update(this.step, this.ticks);
                this.ticks += 1;
                acc = acc - this.step;
            }

            this.acc = acc;
        }

        this.lastTime = time;
        this.render();
        this.frameId = requestAnimationFrame(this.frame);
    }

    start() {
        this.lastTime = null;
        this.frameId = requestAnimationFrame(this.frame);
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }
}