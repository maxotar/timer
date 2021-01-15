"use strict";

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

const ticksPerSecond = 30;

const circle = document.querySelector("circle");
const perimeter = circle.getTotalLength();
circle.setAttribute("stroke-dasharray", perimeter);

let duration = 0;
const callbacks = {
  onStart(timeRemaining) {
    duration = timeRemaining;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
};

const timer = new Timer(
  durationInput,
  startButton,
  pauseButton,
  ticksPerSecond,
  callbacks
);

durationInput.addEventListener("change", () =>
  circle.setAttribute("stroke-dashoffset", 0)
);
