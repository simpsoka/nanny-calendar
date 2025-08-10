document.addEventListener('DOMContentLoaded', () => {
  const backButton = document.querySelector('[data-icon="ArrowLeft"]');
  if (backButton) {
    backButton.addEventListener('click', () => {
      history.back();
    });
  }
});
