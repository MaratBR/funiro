var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
}; //Какой телефон

// Spollers
const spollersArray = document.querySelectorAll('[data-spollers]'); //массив сапйллеров
if (spollersArray.length > 0) {
  const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
    return !item.dataset.spollers.split(",")[0]; //Получение обычных спойлеров
  });
  if (spollersRegular.length > 0) { //Инициализация обычных спойлеорв
    initSpollers(spollersRegular);
  }

  const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(",")[0]; //Получение спойлеров с медиа запросом
  });

  if (spollersMedia.length > 0) { //Инициализация спойлеров с медиа запросом
    const breakpointsArray = [];
    spollersMedia.forEach(item => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    })

    let mediaQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
    });
    mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });


    //Работа с каждым брейкпоинтом
    mediaQueries.forEach(breakpoint => {
      const paramsArray = breakpoint.split(",");
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });

      matchMedia.addEventListener(function () {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }
}

function removeClass(ele, cls) {
  const element = ele;
  element.forEach(el => {
    el.classList.remove(cls);
  });
}

window.onload = function () {
  document.addEventListener('click', documentActions);

  function documentActions(e) {
    const __this = e.target; //Элемент на который нажали
    if (window.innerWidth > 768 && isMobile.any()) { //Если мобильный экран
      if (__this.classList.contains('menu__arrow')) { //Если содержит класс nav__arrow
        __this.closest('.menu__item').classList.toggle('--hover'); //Добавляет/Убирает класс _hover
      }
      if (!__this.closest('.menu__item') && document.querySelectorAll('.menu__item.--hover').length > 0) //У элемента не должно быть родителя и есть элемент с классом _hover
      {
        const navItem = document.querySelectorAll('.menu__item'); //Коллекция nav__item
        navItem.forEach(el => {
          el.classList.remove('--hover'); //Удаление класса _hover у элемента, содержащего класс _hover
        });
      }
    }
  }
}