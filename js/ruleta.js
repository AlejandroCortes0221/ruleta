const array_concursantes = [
  "../img/real.png",
  "../img/barcelona.jpg",
  "../img/atleti.png",
  "../img/bayer.jpg",
  "../img/kaa.png",
  "../img/wb.png",
  "../img/bm.webp",
  "../img/sparta.png",
  "../img/marsella.png",
  "../img/basel.png",
  "../img/sevilla.webp",
  "../img/ol.png",
  "../img/psg.png",
  "../img/olim.png",
  "../img/psv.png",
  "../img/arsenal.png",
  "../img/chealsea.png",
  "../img/fiore.png",
  "../img/city.webp",
  "../img/united.png",
  "../img/juve.png",
  "../img/roma.png",
  "../img/empoli.png",
  "../img/benfica.png",
  "../img/porto.jfif",
  "../img/feye.jpg",
  "../img/zenit.png",
  "../img/monaco.png",
  "../img/ajax.jpg",
  "../img/dinamo.png",
  "../img/tote.png",
];
let canvas = document.getElementById("idcanvas");
let context = canvas.getContext("2d");
let center = canvas.width / 2;

function drawRedNeedle(context, center, radius, rotation) {
  context.save();
  context.translate(center, center);
  context.rotate((rotation * Math.PI) / 180);
  context.fillStyle = "red";
  context.beginPath();
  context.moveTo(0, -10);
  context.lineTo(radius - 10, 0);
  context.lineTo(0, 10);
  context.closePath();
  context.fill();
  context.restore();
}


context.beginPath();
context.moveTo(center, center);
context.arc(center, center, center - 10, 0, 2 * Math.PI);
context.lineTo(center, center);
context.fillStyle = "black";
context.fill();

let loadedImages = [];

const loadImages = () => {
  return Promise.all(
    array_concursantes.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve(img);
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = src;
      });
    })
  );
};

const drawImages = () => {
  const anglePerImage = (2 * Math.PI) / loadedImages.length;
  for (let i = 0; i < loadedImages.length; i++) {
    const img = loadedImages[i];
    const startAngle = i * anglePerImage;
    const endAngle = startAngle + anglePerImage;

    context.save();
    context.beginPath();
    context.moveTo(center, center);
    context.arc(center, center, center - 20, startAngle, endAngle);
    context.closePath();
    context.clip();
    context.drawImage(img, center - img.width / 2, center - img.height / 2);
    context.restore();
  }
};

loadImages()

.then((images) => {
    loadedImages = images;
    drawImages();
  })
  .catch((error) => {
    console.error("Error loading images:", error);
  });

  let pos_ini = Math.floor(Math.random() * 100);
  console.log(pos_ini)
  let clic = 0;
  let movement;
  
  function sortear() {
    if (clic == 0) {
      let canvas = document.getElementById("idcanvas");
      let center = canvas.width / 2;
      let radius = center - 20;

      movement = setInterval(function () {
        pos_ini += 10;
        canvas.style.transform = "rotate(" + pos_ini + "deg)";
        drawCanvas();
      }, 10);

      setTimeout(function () {
        clearInterval(movement);
        clic = 0;
        document.getElementById("idestado").innerHTML = "Sortear";

        // Calcular el índice de la imagen actual
        let totalImages = array_concursantes.length;
        let finalRotation = pos_ini % 360;
        let index = Math.floor((finalRotation / 360) * totalImages);
        console.log("Apuntando a la imagen:", array_concursantes[index]);

        // Mostrar la imagen seleccionada en un div
        let selectedImage = array_concursantes[index];
        let img = new Image();
        img.src = selectedImage;
        img.onload = function () {
          let width = "200px";
          let height = "200px";
          let imageDiv = document.getElementById("imageDiv");
          imageDiv.innerHTML =
            "<img src='" +
            selectedImage +
            "' width='" +
            width +
            "' height='" +
            height +
            "'/>";
          imageDiv.style.display = "block";
        };
      }, 5000);

    }
  }
