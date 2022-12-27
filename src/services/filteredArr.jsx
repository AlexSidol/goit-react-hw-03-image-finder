const filteredArr = arr => {
  return arr.map(el => {
    return {
      id: el.id,
      tags: el.tags,
      webformatURL: el.webformatURL,
      largeImageURL: el.largeImageURL,
    };
  });
};

export default filteredArr;
