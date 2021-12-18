const path = require("path");
const fs = require("fs-extra");
const {
  getCourseName,
  getValidFileName,
  saveTextFile
} = require("./utils");
const { createDownloadManager } = require("./downloader")

const downloadManager = createDownloadManager(5);

function parseMessage(message) {
  try {
    const json = JSON.parse(message);
    if (json?.d?.b?.p === 'flamelink/environments/production/content/lessons/en-US') {
      const courseInfo = json.d.b.d;
      const firstKey = Array.from(Object.keys(courseInfo))[0];
      if (Number.isInteger(+firstKey)) {
        return courseInfo[firstKey];
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function downloadVideo(video, page) {
  const courseName = getCourseName(page) || video.belongsToCourse.toString();
  const directory = path.resolve(process.cwd(), 'videos', courseName);
  fs.ensureDirSync(directory);
  const title = getValidFileName(video.title);
  const fileName = `${video.lessonNumber} - ${title}`
  saveTextFile(video.markdown, path.resolve(directory, `${fileName}.md`));
  downloadManager.addTask(video.downloadLink, path.resolve(directory, `${fileName}.mp4`));
}

module.exports = {
  downloadVideo,
  parseMessage
}