// Update function to change text on main page
function update() {
  const mainHeading = document.getElementById("changing-text");

  const staticText = document.createElement("span");
  staticText.textContent = "I am a ";
  staticText.classList.add("text_color");

  const dynamicText = document.createElement("span");
  dynamicText.classList.add("text_color");

  mainHeading.appendChild(staticText);
  mainHeading.appendChild(dynamicText);

  const headingTexts = [
    "Front-End developer",
    "UX designer",
    "Graphic designer",
  ];

  let index = 0;

  function changeText() {
    dynamicText.textContent = headingTexts[index];
    index = (index + 1) % headingTexts.length;
    setTimeout(changeText, 2000); // Change text every 2 seconds
  }

  changeText();
}

window.addEventListener("load", update);

///////function to close the window///////////////////////

const closeButtons = document.getElementsByClassName("close");

function closeWindow() {
  window.location.href = "index.html";
}
for (let i = 0; i < closeButtons.length; i++) {
  const button = closeButtons[i];
  button.addEventListener("click", closeWindow);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetID = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetID);

    if (targetSection) {
      const topOffset =
        targetSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  });
});

//// floating images

//

// Select the container where images will be added

document.addEventListener("DOMContentLoaded", () => {
  const imageRow = document.getElementById("image-row");

  const images = [
    "pictures/javascript.png",
    "pictures/html.png",
    "pictures/figma.png",
    "pictures/css.png",
    "pictures/node-js.png",
    "pictures/adobe.jpg",
  ];

  for (let i = 0; i < 30; i++) {
    const img = document.createElement("img");
    img.src = images[i % images.length];
    img.classList.add("float-image");
    imageRow.appendChild(img);
  }
});
