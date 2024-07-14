document.addEventListener('DOMContentLoaded', function () {
  const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
  let selectedImages = [];
  let selectedImageElements = [];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function loadImages() {
    let container = document.getElementById('image-container');
    container.innerHTML = '';

    let repeatedImage = images[Math.floor(Math.random() * images.length)];
    let allImages = [...images, repeatedImage];

    shuffle(allImages);

    allImages.forEach((imgClass, index) => {
      let img = document.createElement('img');
      img.classList.add(imgClass);
      img.dataset.index = index;
      img.addEventListener('click', handleImageClick);
      container.appendChild(img);
    });
  }

  function handleImageClick(event) {
    const img = event.target;
    const imgIndex = img.dataset.index;

    if (selectedImageElements.length === 1 && selectedImageElements[0].dataset.index === imgIndex) {
      return; // Prevent double-clicking the same image
    }

    selectedImages.push(img.classList[0]);
    selectedImageElements.push(img);
    img.classList.add('selected');

    if (selectedImageElements.length > 0) {
      document.getElementById('reset').style.display = 'block';
    }

    if (selectedImageElements.length === 2) {
      document.getElementById('verify').style.display = 'block';
    }
  }

  document.getElementById('reset').addEventListener('click', function () {
    selectedImages = [];
    selectedImageElements.forEach(img => img.classList.remove('selected'));
    selectedImageElements = [];
    document.getElementById('reset').style.display = 'none';
    document.getElementById('verify').style.display = 'none';
    document.getElementById('para').style.display = 'none';
  });

  document.getElementById('verify').addEventListener('click', function () {
    const para = document.getElementById('para');
    if (selectedImages[0] === selectedImages[1]) {
      para.innerText = 'You are a human. Congratulations!';
    } else {
      para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    para.style.display = 'block';
    document.getElementById('verify').style.display = 'none';
  });

  loadImages();
});
//your code here
