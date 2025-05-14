(() => {
    let isRepeat = false;
    let ytVideo;
    chrome.runtime.onMessage.addListener((message, sender, receiver) => {
        const { type } = message;

        if (type === "NEW") {
            loadRepeatButton();
        }
    })

    const loadRepeatButton = async () => {
        const repeatBtn = document.querySelector(".repeat-btn");
        if (!repeatBtn) {
            const newRepeatButton = document.createElement("img");
            newRepeatButton.src = chrome.runtime.getURL("assets/repeat.png");
            newRepeatButton.className = "ytp-button " + "repeat-btn";
            newRepeatButton.title = "Loop video"
            newRepeatButton.addEventListener("click", repeatVideo);

            const parentElement = document.querySelector(".ytp-volume-area");
            parentElement.appendChild(newRepeatButton);
        } else {
            ytVideo?.removeEventListener("ended", playVideo);
            repeatBtn.title = "Loop video"
            repeatBtn.style.filter = "";
            repeatBtn.style.transform = "rotate(-90deg)";
        }
    }

    const repeatVideo = (e) => {
        ytVideo = document.querySelector(".video-stream");
        
        if(!isRepeat) {
            ytVideo.addEventListener("ended", playVideo)
            isRepeat = true;
            e.target.title = "Unloop video";
            e.target.style.filter = "brightness(0) saturate(100%) invert(15%) sepia(100%) saturate(10000%) hue-rotate(-5deg)";
            e.target.style.transform = "rotate(90deg)";
            e.target.style.transition = "transform 0.2s ease-in-out";
            

        } else {
            ytVideo.removeEventListener("ended", playVideo);
            isRepeat = false;
            e.target.title = "Loop video";
            e.target.style.filter = "";
            e.target.style.transform = "rotate(-90deg)";
            e.target.style.transition = "transform 0.2s ease-in-out";
        }
    }

    const playVideo = async (e) => {
        await e.target.play();
    }
})();