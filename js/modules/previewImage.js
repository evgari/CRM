export const previewImage = (file, wrapper, preview, message) => {
  file.addEventListener('change', () => {
    if (file.files.length > 0) {
      if (file.files[0]['size'] <= 1000000) {
        const src = URL.createObjectURL(file.files[0]);
        preview.src = src;
        wrapper.style.display = 'block';
      } else {
        message.textContent = 'Изображение не должно превышать размер 1 Мб';
      }
    }
  });
};