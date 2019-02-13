const video1 = {
    id: 12,
    title: 'Vid1',
    duration: 180,
    watched: false
}
const video2 = {
    id: 13,
    title: 'Vid2',
    duration: 120,
    watched: false
}

let videos = [video1, video2];

const getVideosByID = (id) => new Promise((resolve, reject) => {
    const idinInt = parseInt(id);
    const [video] = videos.filter(video => video.id === idinInt);
    video === undefined ? reject("Video not found") : resolve(video);
});

const getVideos = () => new Promise(resolve => resolve(videos));

const addVideo = (title, duration, released) => {
    return new Promise(resolve => {
        const video = {
            id: Buffer.from(title, "utf8").toString("base64"),
            title,
            duration,
            released
        }
        videos.push(video);
        resolve(video);
    })

}
exports.getVideosByID = getVideosByID;
exports.getVideos = getVideos;
exports.addVideo = addVideo;