// 계획

// 경로를 받아오기 위함
const path = require('path');
const os = require('os');
const fs = require('fs');

// 1. 사용자가 원하는 폴더의 이름을 받아온다.
// console.log(process.argv);
const folder = process.argv[2]; // node app test 로 실행했을 때 test를 가리킴 -> 즉 사용자가 입력한 폴더!
const workingDir = path.join(os.homedir(), 'Pictures', folder); // /Users/a1/Pictures/test
// folder가 존재하지 않거나 fs에 존재하지 않는 경로라면!
if (!folder || !fs.existsSync(workingDir)) {
  console.error('Please enter folder name in Pictures.');
  return;
}

// 2. 그 폴더안에 video, captured, duplicated 폴더를 만든다.
const videoDir = path.join(workingDir, 'video');
const captureDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

// 폴더를 만들고 파일을 처리해주어야 하기 때문에(동기) Sync
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir); // -> 존재하지 않는다면 만들고 존재하면 다음으로 넘어감
!fs.existsSync(captureDir) && fs.mkdirSync(captureDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

fs.promises //
  .readdir(workingDir)
  .then(processFiles) // == .then(files => processFiles(files))
  .catch(console.log);

// 3. 폴더안에 있는 파일들을 다 돌면서 해당하는 mp4/mov, png/aae, img_1234(img_E1234)
function processFiles(files) {
  files.forEach((file) => {
    if (isVideoFile(file)) {
      move(file, videoDir);
    } else if (isCapturedFile(file)) {
      move(file, captureDir);
    } else if (isDuplicatedFile(files, file)) {
      move(file, duplicatedDir);
    }
  });
}

function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm; // 정규식 표현 -> mp4 또는 mov가 문자열 끝($)에 존재하냐
  const match = file.match(regExp); // 파일 이름을 정규식 표현과 매치 -> 맞는 것이 있다면 const match 에 그 값이 들어감
  return !!match; // match 값이 존재하면 true, or false -> !! ===
}

function isCapturedFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isDuplicatedFile(files, file) {
  // IMG_XXXX -> IMG_EXXX
  if (!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
    return false;
  }

  const edited = `IMG_E${file.split('_')[1]}`;
  const found = files.includes(edited);
  return found;
}

function move(file, targetDir) {
  console.info(`move ${file} to ${path.basename(targetDir)}`);
  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);
  fs.promises //
    .rename(oldPath, newPath)
    .catch(console.error);
}
