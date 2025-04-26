export type IngredientType = {
	_id: string;
	name: string;
	type: string;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	__v: number;
};

export type IngredientAndIdType = { id: 'string' } & IngredientType;

export type ResponseDataType<T = unknown> = {
	data: T;
	success: string;
};

export type UserType = {
	email: string;
	password: string;
	name: string;
};

export type ResponseAuth = {
	succes: boolean;
	message?: string;
};

export type ResponseAuthData = ResponseAuth & {
	user: UserTypeWithoutPassword;
	accessToken: string;
	refreshToken: string;
};

export type UserTypeWithoutPassword = Omit<UserType, 'password'>;

export type ResponseUser = {
	success: boolean;
	user: UserTypeWithoutPassword;
};

export type RequestUserUpdate = {
	name: string;
	email: string;
	password: string;
};

export type RequestRegister = {
	email: string;
	password: string;
	name: string;
};

export type RequestLogin = {
	email: string;
	password: string;
};

export type RequestForgotData = {
	email: string;
};

export type RequestReset = {
	password: string;
	token: string;
};
