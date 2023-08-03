const API_KEY = '37318087-ecb94321c9fa946f42e60ed92';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

export function apiRequest(query, currentPage) {
  return fetch(
    `${BASE_URL}?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  ).then(data => {
    if (!data.ok) {
      throw new Error(data.status);
    }
    return data.json();
  });
}
