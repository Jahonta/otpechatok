import audio from "./audio";
import browser from "./browser";
import canvasAdr from "./canvas-adr";
import canvasFingerprint from "./canvas-fp";
import colorDepth from "./color-depth";
import colorGamut from "./color-gamut";
import contrast from "./contrast";
import cpuClass from "./cpu-class";
import deviceMemory from "./device-memory";
import device from "./device";
import doNotTrac from "./do-not-trac";
import fontPreferences from "./font-preferences";
import fonts from "./fonts";
import forcedColor from "./forced-color";
import hardwareConcurrency from "./hardware-concurrency";
import hdr from "./hdr";
import indexedDB from "./indexeddb";
import invertedColors from "./inverted-colors";
import languages from "./languages";
import localStorage from "./local-storage";
import locationbar from "./locationbar";
import math from "./math";
import menu from "./menu";
import mimeTypes from "./mime-types";
import monochrome from "./monochrome";
import openDatabase from "./open-database";
import osCpu from "./os-cpu";
import pdfViewer from "./pdf-viewer";
import pixelDepth from "./pixel-depth";
import pixelRatio from "./pixel-ratio";
import platform from "./platform";
import plugins from "./plugins";
import privateClick from "./private-click";
import reducedMotion from "./reduced-motion";
import reducedTransparency from "./reduced-transparency";
import rotationAngle from "./rotation-angle";
import screenResolution from "./screen-resolution";
import sessionStorage from "./session-storage";
import timezone from "./timezone";
import touchSupport from "./touch-support";
import vendor from "./vendor";
import vendorFlavor from "./vendor-flavor";
import videoCard from "./videocard";
import webglAdr from "./webgl-adr";
import { getWebGlBasics, getWebGlExtensions } from "./webgl-fp";

async function getResults() {
    const results = [];

    results.push({ "audio": (await audio())() });
    results.push({ browser: browser() });
    results.push({ canvasAdr: canvasAdr() });
    results.push({ canvasFp: await canvasFingerprint() });
    results.push({ colorDepth: colorDepth() });
    results.push({ colorGamut: colorGamut() });
    results.push({ contrast: contrast() });
    results.push({ cpuClass: cpuClass() });
    results.push({ deviceMemory: deviceMemory() });
    const d = device();
    results.push({ device: d });
    results.push({ doNotTrac: doNotTrac() });
    results.push({ fontPreferences: await fontPreferences() });
    results.push({ fonts: fonts() });
    results.push({ forcedColor: forcedColor() });
    results.push({ hardwareConcurrency: hardwareConcurrency() });
    results.push({ hdr: hdr() });
    results.push({ indexedDB: indexedDB() });
    results.push({ invertedColors: invertedColors() });
    results.push({ languages: languages() });
    results.push({ localStorage: localStorage() });
    results.push({ locationbar: locationbar() });
    results.push({ math: math() });
    results.push({ menu: menu() });
    results.push({ mimeTypes: mimeTypes() });
    results.push({ monochrome: monochrome() });
    results.push({ openDatabase: openDatabase() });
    results.push({ osCpu: osCpu() });
    results.push({ pdfViewer: pdfViewer() });
    results.push({ pixelDepth: pixelDepth() });
    results.push({ pixelRatio: pixelRatio() });
    results.push({ platform: platform() });
    results.push({ plugins: plugins() });
    results.push({ privateClick: privateClick() });
    results.push({ reducedMotion: reducedMotion() });
    results.push({ reducedTransparency: reducedTransparency() });
    results.push({ rotationAngle: rotationAngle(d === "Desktop") });
    results.push({ screenResolution: screenResolution() });
    results.push({ sessionStorage: sessionStorage() });
    results.push({ timezone: timezone() });
    results.push({ touchSupport: touchSupport() });
    results.push({ vendor: vendor() });
    results.push({ vendorFlavor: vendorFlavor() });
    results.push({ videoCard: videoCard() });
    results.push({ webglAdr: webglAdr() });
    results.push({ webglBasics: getWebGlBasics({ cache: {} }) });
    results.push({ webglExtensions: getWebGlExtensions({ cache: {} }) });

    return results;
}

let firstResult: string;
let secondResult: string;

setTimeout(async () => {
    firstResult = JSON.stringify(await getResults(), null, 4);
    document.querySelector("#output-1")!.innerHTML = firstResult;
}, 1000)

setTimeout(async () => {
    secondResult = JSON.stringify(await getResults(), null, 4);
    document.querySelector("#output-2")!.innerHTML = secondResult;
    document.querySelector("#match")!.textContent = String(JSON.stringify(secondResult) === JSON.stringify(firstResult));
}, 5000)
