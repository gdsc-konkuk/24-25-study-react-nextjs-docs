import { ComponentA } from "./componentA.js";
import { ComponentB } from "./componentB.js";

const buttonA = document.querySelector("#btnA");
const buttonB = document.querySelector("#btnB");
const output = document.querySelector("#output");

buttonA.addEventListener("click", () => {
  console.log("buttonA clicked");
  output.innerHTML = ComponentA();
});

buttonB.addEventListener("click", () => {
  console.log("buttonB clicked");
  output.innerHTML = ComponentB();
});
