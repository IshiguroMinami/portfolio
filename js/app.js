document.addEventListener("DOMContentLoaded", () => {
  // key-visual text アニメーション
  const textElement = document.querySelector(".key-visual-text");
  if (textElement) {
    setTimeout(() => {
      textElement.classList.add("is-visible");
    }, 500);
  }

  // ハンバーガーメニュー
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }
});
