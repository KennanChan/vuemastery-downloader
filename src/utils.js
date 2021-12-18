const fs = require("fs-extra");

function getCourseName(page) {
  return page.url().split('/').reduce((courseName, segment, index, segments) => {
    if (segment === 'courses') {
      return segments[index + 1]
    }
    return courseName;
  }, '');
}

function getValidFileName(fileName) {
  return fileName.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-");
}

function saveTextFile(text, file) {
  fs.writeFileSync(file, text, { encoding: 'utf-8' });
}

module.exports = {
  getCourseName,
  getValidFileName,
  saveTextFile
}