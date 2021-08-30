const URL = 'https://api.github.com/users';

export const fetchReposForUser = async (name: string = '') => {
  try {
    const response = await fetch(`${URL}/${name}/repos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error: ', error);
    throw new Error(error);
  }
}