export function flyToCart(fromEl: HTMLElement, toEl: HTMLElement) {
  const clone = fromEl.cloneNode(true) as HTMLElement;
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();

  clone.style.position = "fixed";
  clone.style.top = `${fromRect.top}px`;
  clone.style.left = `${fromRect.left}px`;
  clone.style.width = `${fromRect.width}px`;
  clone.style.height = `${fromRect.height}px`;
  clone.style.transition = "all 0.6s ease-in-out";
  clone.style.zIndex = "9999";
  clone.style.borderRadius = "12px";
  clone.style.pointerEvents = "none";
  clone.style.opacity = "1";
  clone.style.transform = "scale(1)";
  document.body.appendChild(clone);

  // trigger animation
  requestAnimationFrame(() => {
    clone.style.top = `${toRect.top + window.scrollY + toRect.height / 2 - fromRect.height / 2}px`;
    clone.style.left = `${toRect.left + window.scrollX + toRect.width / 2 - fromRect.width / 2}px`;
    clone.style.transform = "scale(0.2)";
    clone.style.opacity = "0.2";
  });

  
  clone.addEventListener("transitionend", () => {
    document.body.removeChild(clone);
    const cartIcon = document.getElementById("cart-button");
    if (cartIcon) {
      cartIcon.classList.add("animate-bounce");
      setTimeout(() => cartIcon.classList.remove("animate-bounce"), 600);
    }
  });
  
}
