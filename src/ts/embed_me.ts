
import { HTMLCanvasAdapater } from "./rt/ICanvas";
import { Raytracer } from "./rt/Raytracer";

console.log("Loaded embed_me.ts")

addEventListener("DOMContentLoaded", (event) => {
    const canvas = document.getElementById("renderWindow") as HTMLCanvasElement;
    const canvasAdapter = new HTMLCanvasAdapater(canvas);
    const rt = new Raytracer(canvasAdapter);
    rt.render();
    console.log("Render complete")
});