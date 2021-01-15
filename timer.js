"use strict";

class Timer {
  constructor(
    durationInput,
    startButton,
    pauseButton,
    ticksPerSecond,
    callbacks
  ) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.ticksPerSecond = ticksPerSecond;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
    }
    this.timerID = null;
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.timerID) {
      return;
    }
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.timerID = setInterval(this.tick, 1000 / ticksPerSecond);
  };

  pause = () => {
    clearInterval(this.timerID);
    this.timerID = null;
  };

  tick = () => {
    this.timeRemaining = Math.max(0, this.timeRemaining - 1 / ticksPerSecond);
    if (this.onTick) {
      this.onTick(this.timeRemaining);
    }
    if (this.timeRemaining <= 0) {
      this.pause();
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
