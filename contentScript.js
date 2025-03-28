(() => {
    let isRepeat = false;
    let ytVideo;
    chrome.runtime.onMessage.addListener((message, sender, receiver) => {
        const { type } = message;

        if (type === "NEW") {
            loadRepeatButton();
        }
    })

    const loadRepeatButton = () => {
        const repeatBtn = document.querySelector(".repeat-btn");
        if (!repeatBtn) {
            const newRepeatButton = document.createElement("img");
            newRepeatButton.src = chrome.runtime.getURL("assets/youtubeRepeat.png");
            newRepeatButton.className = "ytp-button " + "repeat-btn";
            newRepeatButton.title = "Loop video"
            newRepeatButton.addEventListener("click", repeatVideo);

            const parentElement = document.querySelector(".ytp-volume-area");
            parentElement.appendChild(newRepeatButton);
        } else {
            ytVideo?.removeEventListener("ended", playVideo);
            repeatBtn.title = "Loop video"
        }
    }

    const repeatVideo = (e) => {
        ytVideo = document.querySelector(".video-stream");
        if(!isRepeat) {
            ytVideo.addEventListener("ended", playVideo)
            isRepeat = true;
            e.target.title = "Unloop video";
            e.target.classList.add("loop-video");

        } else {
            ytVideo.removeEventListener("ended", playVideo);
            isRepeat = false;
            e.target.title = "Loop video";
            e.target.classList.remove("loop-video");
        }
    }

    const playVideo = async (e) => {
        await e.target.play();
    }
})();