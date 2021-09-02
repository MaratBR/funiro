console.log("хуй");
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