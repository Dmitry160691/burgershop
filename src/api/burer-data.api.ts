const BASE_API_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
	return fetch(`${BASE_API_URL}/ingredients`).then((res) => {
		if (res.ok) return res.json();
		res.json().then((err) => Promise.reject(err));
	});
};
