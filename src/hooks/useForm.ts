import { useState, ChangeEvent } from 'react';

export function useForm<T extends Record<string, unknown>>(inputValues: T) {
	const [values, setValues] = useState<T>(inputValues);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	return { values, handleChange, setValues };
}
