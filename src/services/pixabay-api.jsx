const API_KEY = '31500402-387db4a9fd94645d00cfea952';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(requestInfo, page) {
  return fetch(
    `${BASE_URL}?q=&{requestInfo}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12 `
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No response from server`));
  });
}

const api = { fetchImages };
export default api;
