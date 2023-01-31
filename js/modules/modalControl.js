export const modalControl = (overlay, productsCart) => {
  const openModal = () => {
    overlay.classList.add('open');
  };

  const closeModal = () => {
    overlay.classList.remove('open');
  };

  productsCart.addEventListener('click', openModal);

  overlay.addEventListener('click', e => {
    const target = e.target;

    if (target === overlay ||
      target.closest('.btn-close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};