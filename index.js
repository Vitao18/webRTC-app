const constraints = { audio: false, video: true };

const canvas = document.querySelector('#canvas');
const filter = document.querySelector('#filter');
const snapshot = document.querySelector('#snapshot');
const start = document.querySelector('#start');
const video = document.querySelector('#video');

const filters = ['blur', 'brightness', 'contrast', 'grayscale',
  'hue', 'invert', 'saturate', 'sepia'];

const success = stream => {
  start.style.display = 'none';
  snapshot.style.display = 'block';
  filter.style.display = 'block';
  video.src = window.URL ?
    window.URL.createObjectURL(stream) :
    video.src = stream
};

start.addEventListener('click', () =>
  navigator.mediaDevices.getUserMedia(constraints)
    .then(success)
    .catch(() => console.error('Needs to have access to camera to use the app!')));

filter.addEventListener('click', () => {
  const index = (filters.indexOf(canvas.className) + 1) % filters.length;
  video.className = filters[index];
  canvas.className = filters[index];
});

snapshot.addEventListener('click', () => {
  canvas.width = 360;
  canvas.height = 270;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
});
