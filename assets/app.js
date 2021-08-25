const filters = ["#nofilter", "_1977", "aden", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"];
let filterIndex = 0;
const video = document.querySelector("#video");
const constraints = { audio: false, video: true };
const wrapper = document.querySelector("div");
const filterName = document.querySelector("span");

document.querySelector("#shuffler").onclick = function (e) {
    if (filterIndex == filters.length - 1) filterIndex = 0;
    else filterIndex += 1;

    wrapper.className = filters[filterIndex];
    filterName.innerText = filters[filterIndex].replace("_", "");
}

document.querySelector("#closer").onclick = function (e) {
    video.srcObject = null;
    window.videoStream.getTracks().forEach(function (track) {
        track.stop();
    });
    window.api.send("close");
}

window.api.receive("startVideo", () => {
    if (window.processor) {
        console.log("Start recorder again");
        video.play();
        navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    video.play();
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
});

function handleSuccess(stream) {
    if (!window.processor) window.processor = {};

    window.videoStream = stream;
    video.srcObject = stream;
    if (video.paused)
        video.play();
}

function handleError(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}