export const checkResponse = (res: Response) => {
	if (res.ok) return res.json();
	res.json().then((err) => Promise.reject(err));
};
