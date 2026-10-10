const currentYear = document.querySelector("#current-year");
const aircraftSection = document.querySelector("#aircraft-section");
const fighterCard = document.querySelector("#fighter-card");
const aircraftStage = document.querySelector("#aircraft-stage");
const aircraftTagLayer = document.querySelector("#aircraft-tag-layer");
const aircraftLegend = document.querySelector("#aircraft-legend");
const aircraftDetails = document.querySelector("#aircraft-details");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (
  aircraftSection &&
  fighterCard &&
  aircraftStage &&
  aircraftTagLayer &&
  aircraftLegend &&
  aircraftDetails
) {
  const crop = { x: 30, y: 330, width: 970, height: 370 };
  const parts = [
    {
      bounds: [880, 330, 1000, 700],
      offset: [6, 0],
      rotation: 2,
      marker: [935, 395],
      name: "Радар",
      detail: "Виявляє повітряні цілі та допомагає екіпажу оцінювати ситуацію.",
    },
    {
      bounds: [540, 330, 880, 420],
      offset: [0, -20],
      rotation: -1.5,
      marker: [790, 372],
      name: "Кабіна",
      detail: "Два місця: попереду пілот, позаду — оператор озброєння.",
    },
    {
      bounds: [600, 420, 880, 540],
      offset: [4, 16],
      rotation: 3,
      marker: [700, 480],
      name: "Повітрозабірник",
      detail: "Подає повітря до двигунів.",
    },
    {
      bounds: [330, 400, 690, 540],
      offset: [0, 0],
      rotation: 0,
      marker: [500, 450],
      name: "Фюзеляж",
      detail: "Основна конструкція літака: кабіна, обладнання та системи.",
    },
    {
      bounds: [350, 540, 640, 700],
      offset: [0, 22],
      rotation: -2,
      marker: [500, 590],
      name: "Крило та вузли підвіски",
      detail: "Створює підіймальну силу; на вузлах підвіски розміщують обладнання.",
    },
    {
      bounds: [120, 330, 390, 540],
      offset: [-6, -20],
      rotation: -3,
      marker: [270, 430],
      name: "Кіль",
      detail: "Вертикальне оперення допомагає зберігати напрямок польоту.",
    },
    {
      bounds: [130, 525, 350, 625],
      offset: [-9, 0],
      rotation: 2,
      marker: [235, 575],
      name: "Двигун і сопло",
      detail: "Двигуни АЛ-31ФП мають керований вектор тяги.",
    },
    {
      bounds: [30, 520, 135, 600],
      offset: [-6, -14],
      rotation: -4,
      marker: [80, 560],
      name: "Стабілізатор",
      detail: "Горизонтальне оперення бере участь в керуванні тангажем.",
    },
    {
      bounds: [140, 625, 350, 700],
      offset: [-2, 28],
      rotation: 3,
      marker: [235, 665],
      name: "Нижня частина оперення",
      detail: "Додаткова поверхня хвостової частини літака.",
    },
  ];

  const toPercentX = (value) =>
    (((value - crop.x) / crop.width) * 100).toFixed(2);
  const toPercentY = (value) =>
    (((value - crop.y) / crop.height) * 100).toFixed(2);

  parts.forEach((part, index) => {
    const [left, top, right, bottom] = part.bounds;
    const partElement = document.createElement("span");
    partElement.className = "aircraft-part";
    partElement.style.setProperty("--index", String(index));
    partElement.style.setProperty("--offset-x", `${part.offset[0]}%`);
    partElement.style.setProperty(
      "--mobile-offset-x",
      `${part.offset[0] * 0.3}%`,
    );
    partElement.style.setProperty("--offset-y", `${part.offset[1]}%`);
    partElement.style.setProperty("--rotation", `${part.rotation}deg`);
    partElement.style.setProperty("--float-delay", `${index * -0.8}s`);
    partElement.style.setProperty("--open-delay", `${index * 55}ms`);
    partElement.style.setProperty("--close-delay", `${(8 - index) * 45}ms`);

    const inner = document.createElement("span");
    inner.className = "aircraft-part-inner";

    const image = document.createElement("span");
    image.className = "aircraft-part-image";
    image.style.setProperty(
      "--clip",
      `polygon(${toPercentX(left)}% ${toPercentY(top)}%, ${toPercentX(right)}% ${toPercentY(top)}%, ${toPercentX(right)}% ${toPercentY(bottom)}%, ${toPercentX(left)}% ${toPercentY(bottom)}%)`,
    );

    const tag = document.createElement("span");
    tag.className = "aircraft-tag";
    tag.style.setProperty("--index", String(index));
    tag.style.left = `${toPercentX(part.marker[0])}%`;
    tag.style.top = `${toPercentY(part.marker[1])}%`;
    tag.style.setProperty("--tag-shift-x", "0px");
    tag.style.setProperty("--tag-shift-y", "0px");
    tag.style.setProperty("--open-delay", `${index * 55}ms`);
    tag.style.setProperty("--close-delay", `${(8 - index) * 45}ms`);
    tag.style.setProperty("--label-delay", `${800 + index * 70}ms`);
    tag.dataset.markerX = String(part.marker[0]);
    tag.dataset.markerY = String(part.marker[1]);
    tag.dataset.offsetX = String(part.offset[0]);
    tag.dataset.offsetY = String(part.offset[1]);
    tag.dataset.rotation = String(part.rotation);

    const number = document.createElement("i");
    number.textContent = String(index + 1);
    const rule = document.createElement("u");
    rule.setAttribute("aria-hidden", "true");
    const name = document.createElement("b");
    name.textContent = part.name;
    tag.append(number, rule, name);
    inner.append(image);
    aircraftTagLayer.append(tag);
    partElement.append(inner);
    aircraftStage.append(partElement);

    const item = document.createElement("li");
    item.style.setProperty("--index", String(index));
    item.style.setProperty("--legend-delay", `${600 + index * 80}ms`);
    const heading = document.createElement("b");
    heading.textContent = `${index + 1}. ${part.name}`;
    const detail = document.createElement("span");
    detail.textContent = part.detail;
    item.append(heading, detail);
    aircraftDetails.append(item);
  });

  let isPinned = false;
  let isHovered = false;
  let suppressHover = false;

  const updateTagPositions = (isOpen) => {
    const { width, height } = aircraftStage.getBoundingClientRect();
    const isMobile = window.matchMedia("(max-width: 680px)").matches;
    aircraftTagLayer.querySelectorAll(".aircraft-tag").forEach((tag) => {
      if (!isOpen) {
        tag.style.setProperty("--tag-shift-x", "0px");
        tag.style.setProperty("--tag-shift-y", "0px");
        return;
      }

      const markerX =
        ((Number(tag.dataset.markerX) - crop.x) / crop.width) * width;
      const markerY =
        ((Number(tag.dataset.markerY) - crop.y) / crop.height) * height;
      const offsetX =
        (Number(tag.dataset.offsetX) * (isMobile ? 0.3 : 1) * width) / 100;
      const offsetY = (Number(tag.dataset.offsetY) / 100) * height;
      const rotation = (Number(tag.dataset.rotation) * Math.PI) / 180;
      const scale = 1.05;
      const centerX = width / 2;
      const centerY = height / 2;
      const relativeX = markerX - centerX;
      const relativeY = markerY - centerY;
      const movedX =
        centerX +
        offsetX +
        scale *
          (relativeX * Math.cos(rotation) - relativeY * Math.sin(rotation));
      const movedY =
        centerY +
        offsetY +
        scale *
          (relativeX * Math.sin(rotation) + relativeY * Math.cos(rotation));

      tag.style.setProperty("--tag-shift-x", `${movedX - markerX}px`);
      tag.style.setProperty("--tag-shift-y", `${movedY - markerY}px`);
    });
  };

  const setOpen = (isOpen) => {
    updateTagPositions(isOpen);
    aircraftSection.classList.toggle("is-open", isOpen);
    fighterCard.classList.toggle("is-open", isOpen);
    fighterCard.setAttribute("aria-expanded", String(isOpen));
    fighterCard.setAttribute(
      "aria-label",
      isOpen
        ? "Приховати опис деталей винищувача Су-30МКІ"
        : "Показати будову винищувача Су-30МКІ",
    );
    aircraftLegend.setAttribute("aria-hidden", String(!isOpen));
  };

  window.addEventListener("resize", () => {
    updateTagPositions(fighterCard.classList.contains("is-open"));
  });

  fighterCard.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    isHovered = true;
    suppressHover = false;
    if (!isPinned) {
      setOpen(true);
    }
  });

  fighterCard.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    isHovered = false;
    suppressHover = false;
    if (!isPinned) {
      setOpen(false);
    }
  });

  fighterCard.addEventListener("click", () => {
    isPinned = !isPinned;
    suppressHover = !isPinned && isHovered;
    setOpen(isPinned || (isHovered && !suppressHover));
  });

  fighterCard.addEventListener("focus", () => {
    if (!isPinned) {
      setOpen(true);
    }
  });

  fighterCard.addEventListener("blur", () => {
    if (!isPinned && !isHovered) {
      setOpen(false);
    }
  });
}
