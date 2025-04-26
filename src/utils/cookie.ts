export type CookieProps = {
	expires?: number | Date | string;
	path?: string;
	domain?: string;
	secure?: boolean;
	SameSite?: 'Strict' | 'Lax' | 'None';
};

export function setCookie(
	name: string,
	value: string | null,
	props: CookieProps = {}
) {
	let exp = props.expires;

	if (typeof exp === 'number' && exp) {
		const d = new Date();
		d.setTime(d.getTime() + exp * 1000);
		exp = props.expires = d;
	}

	if (exp instanceof Date && !isNaN(exp.getTime())) {
		props.expires = exp.toUTCString();
	}

	if (value) value = encodeURIComponent(value);
	let updateCookie = `${name}=${value}`;

	for (const propsName in props) {
		updateCookie += `; ${propsName}`;
		const propValue = props[propsName as keyof CookieProps];

		if (propValue !== true) {
			updateCookie += `=${propValue}`;
		}
	}

	document.cookie = updateCookie;
}

export function getCookie(name: string) {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
				'=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
	setCookie(name, null, { expires: -1 });
}
