// бургер
const header = document.querySelector('.header');
const burgerButton = document.querySelector('.button-burger')

burgerButton.addEventListener('click', (event) => {
  header.classList.toggle('header--active-burger')

  if (header.classList.contains('header--active-burger')) {
    hideScroll()
  } else {
    showScroll()
  }
})

// функция для section team



const teamBody = document.querySelectorAll('.team-body');

function myFunction() {
  this.classList.toggle('team-body-active');
  setTimeout(() => { this.classList.remove('team-body-active') }, 6000)
}

for (let index = 0; index < teamBody.length; index++) {
  teamBody[index].addEventListener('click', myFunction)
}


// teamBodyRemoveFunction()



// функции которые прячут скролл и возвращают
const hideScroll = () => {
  const scrollWidth = `${getScrollbarWidth()}px`;

  document.body.style.paddingRight = scrollWidth;
  document.body.style.overflow = 'hidden';


}

const showScroll = () => {

  document.body.style.paddingRight = '';
  document.body.style.overflow = 'visible';


}




// get scrollbar width
const getScrollbarWidth = () => {
  const outer = document.createElement('div');

  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  outer.style.width = '50px';
  outer.style.height = '50px';
  outer.style.overflow = 'scroll';
  outer.style.visibility = 'hidden';


  document.body.appendChild(outer);
  const scrollBarWidth = outer.offsetWidth - outer.clientWidth;
  document.body.removeChild(outer);

  return scrollBarWidth;
}

// слайдер
const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  slidesPerView: 1,
  // centeredSlides: true,
  // slidesPerGroup: 1,
  spaceBetween: 30,

  breakpoints: {
    768: {
      direction: 'horizontal',
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
      loopFillGroupWithBlank: true,
    },
  },


  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets'
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    clickable: true,
  }
});



// popup

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const popupScroll = document.querySelector('.popup')




if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('id').replace('#', '');
      // получаем чистое имя popup
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup)
      e.preventDefault()
    });
  }
}


const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      // ищет родителя и находи popup
      e.preventDefault();
    })
  }
}

function popupOpen(curentPopup) {
  if (curentPopup) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive);
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'))
        // если у нажатого обьекта нет в родителях
        //  popup_content то закрывать popup
      }
    });
  }
  //   убирает скролл
  if (curentPopup.classList.contains('open')) {
    hideScroll()
  }

}

function popupClose(popupActive) {
  popupActive.classList.remove('open')
  showScroll()
}


// закрытие по esc
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive)
  }
})

// отправка формы на почту

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form')
  form.addEventListener('submit', formSend)


  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    let  formData = new FormData(form);

    if(error === 0) {
      let response = await fetch('sendmail.php',{
        metHod: 'POST',
        body: formData
      })
      if(response.ok) {
          let result = await response.json();
          alert(result.message);
          formPreview.innerHTML = '';
          form.reset();
      }else {
        alert('error')
      }
    }else{
      const warning = document.querySelector('.input_warning')
      warning.classList.add('active')
      setTimeout(() => {
        warning.classList.remove('active')
      }, 3000)
    }
  }

  function formValidate(form) {
    let error = 0;
    let formRequired = document.querySelectorAll('.required')

    for (let index = 0; index < formRequired.length; index++){
      const input = formRequired[index];
      formRemoveError(input);

      if(input.classList.contains('email')) {
        if(emailTest(input)) {
          formAddError(input);
          error++;
        }
      }else{
        if(input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('error');
    input.classList.add('error')

  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('error');
    input.classList.remove('error')
  }
  // тест emaail
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
  }
})