(() => {
    let isRepeat = false;

    chrome.runtime.onMessage.addListener((message, sender, receiver) => {
        const { type } = message;

        if (type === "NEW") {
            loadRepeatButton();
        }
    })

    const loadRepeatButton = () => {
        const repeatBtn = document.querySelector(".repeat-btn");
        if (!repeatBtn) {
            console.log("Hi");
            const newRepeatButton = document.createElement("img");
            newRepeatButton.src = chrome.runtime.getURL("assets/youtubeRepeat.png");
            newRepeatButton.className = "ytp-button " + "repeat-btn";
            newRepeatButton.title = "Loop video"
            newRepeatButton.addEventListener("click", repeatVideo);

            const parentElement = document.querySelector(".ytp-volume-area");
            console.log(parentElement);
            parentElement.appendChild(newRepeatButton);
        } else {
            console.log("Ne radi");
        }
    }

    const repeatVideo = () => {
        const ytVideo = document.querySelector(".video-stream");
        if(!isRepeat) {
            ytVideo.addEventListener("ended", playVideo)
            isRepeat = true;
        } else {
            ytVideo.removeEventListener("ended", playVideo);
            isRepeat = false;
        }
    }

    const playVideo = async (e) => {
        await e.target.play();
    }
})();