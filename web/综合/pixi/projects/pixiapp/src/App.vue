<template>
    <div></div>
</template>

<script setup>
    import * as PIXI from "pixi.js";
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
    });
    document.appendChild(app.view);
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    canvas {
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
    }
</style>
