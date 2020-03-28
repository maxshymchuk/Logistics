const smoothScroll = (el: Element) => {
  const Y_OFFSET = -50;
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset; 
  window.scrollTo({ top: yCoordinate + Y_OFFSET, behavior: 'smooth' }); 
};

export default smoothScroll;