const animation = reviewBox => {
  reviewBox.classList.add("slideout");
  setTimeout(() => reviewBox.classList.remove("slideout"), 1000);
  setTimeout(() => reviewBox.classList.add("slidein"), 1000);
};
const updateReview = (
  activeFaceKey,
  reviews,
  faces,
  reviewText,
  reviewName,
  reviewPosition
) => {
  document.querySelector(".carusel__item.active").classList.remove("active");
  const face = faces.find(face => face.dataset.key == activeFaceKey);
  face.classList.add("active");

  const updateContent = () => {
    reviewText.textContent = reviews[activeFaceKey - 1].text;
    reviewName.textContent = reviews[activeFaceKey - 1].name;
    reviewPosition.textContent = reviews[activeFaceKey - 1].position;
  };
  setTimeout(() => updateContent(), 1000);
};
const handleChangeReview = (
  e,
  activeFaceKey,
  reviewBox,
  reviews,
  faces,
  reviewText,
  reviewName,
  reviewPosition
) => {
  if (e.target.className === "fas fa-angle-left fa-2x") {
    activeFaceKey = activeFaceKey - 1;
    if (activeFaceKey < 1) {
      activeFaceKey = 5;
    }
    animation(reviewBox);
    updateReview(
      activeFaceKey,
      reviews,
      faces,
      reviewText,
      reviewName,
      reviewPosition
    );
  } else {
    activeFaceKey = activeFaceKey + 1;
    if (activeFaceKey > 5) {
      activeFaceKey = 1;
    }
    animation(reviewBox);
    updateReview(
      activeFaceKey,
      reviews,
      faces,
      reviewText,
      reviewName,
      reviewPosition
    );
  }
  return activeFaceKey;
};

const init = () => {
  const reviews = [
    {
      text:
        "the guests were wonderful guests and terrific people. They were really friendly and easy-going. They were very respectful of house rules.",
      name: "Jose Ryan",
      position: "COO Boxing Company"
    },
    {
      text:
        "the guests were lovely guests. They were friendly, clean and respectful of my apartment. I would welcome them back any time and highly recommend them as guests.",
      name: "Christine Brooks",
      position: "CEO Reichert LLC"
    },
    {
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatibus quod suscipit ad nam nulla dolorem porro similique tempore facilis quo autem nesciunt quos aliquid incidunt soluta eos, aspernatur repellat?",
      name: "Jane Galadriel",
      position: "CEO Tengkurep"
    },
    {
      text:
        "It was a pleasure to welcome the guests. These guests were very nice and more, very discreet, clean and respectful during their stay. They are very welcome next time ! In the meantime, I recommend These travelers to all others hosts. Thanks again for your confidence. I wish you the best.",
      name: "Olivia Campbell",
      position: "Secratary Sipes PLC"
    },
    {
      text:
        "the guests were dream guests! The apartment was left clean and in great conditions. NO Complaints. Would be happy to have them as guest ANYTIME!",
      name: "Dylan Herrera",
      position: "CFO Konopelski LLC"
    }
  ];
  const arrows = [...document.querySelectorAll(".fa-2x")];
  const faces = [...document.querySelectorAll(".carusel__item")];
  let activeFaceKey = parseInt(
    document.querySelector(".carusel__item.active").dataset.key
  );
  const reviewText = document.querySelector(".review__text");
  const reviewName = document.querySelector(".review__name");
  const reviewPosition = document.querySelector(".review__position");
  const reviewBox = document.querySelector(".reviews__review");
  arrows.forEach(arrow => {
    arrow.addEventListener("click", e => {
      activeFaceKey = handleChangeReview(
        e,
        activeFaceKey,
        reviewBox,
        reviews,
        faces,
        reviewText,
        reviewName,
        reviewPosition
      );
    });
  });
};
init();
