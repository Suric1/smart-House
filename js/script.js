const dom = {
  selectbox: document.getElementById('selectbox'),
  rooms: document.getElementById('rooms'),
};

console.log(dom);

//  Выпадающий список

dom.selectbox.querySelector('.selectbox__selected').onclick = (event) => {
  dom.selectbox.classList.toggle('open');
};
