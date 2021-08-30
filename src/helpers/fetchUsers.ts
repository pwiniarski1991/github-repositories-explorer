const URL = 'https://api.github.com/search/users';

export const fetchUsers = async (name: string = '') => {
  try {
    const response = await fetch(name ? `${URL}?per_page=5&page=1&q=${name}` : URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error: ', error);
    throw new Error(error);
  }
}