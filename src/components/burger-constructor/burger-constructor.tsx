import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.scss';
import { data } from '@utils/data';
import { IngredientConstructorElement } from '@components/ingredient-constructor-element/ingredient-constructor-element';

export const BurgerConstructor = () => {
	const bun = data.find((v) => v.type === 'bun');
	if (!bun) return null;
	return (
		<div className={`pl-4 pr-4 ${s.container}`}>
			<div className={`mt-20 ${s['container-components']}`}>
				<div className='pl-8'>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
				<div className={s['container-components-main']}>
					<IngredientConstructorElement
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
					<IngredientConstructorElement
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
					<IngredientConstructorElement
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
					<IngredientConstructorElement
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
					<IngredientConstructorElement
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
					<IngredientConstructorElement
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
				<div className='pl-8'>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			</div>
			<div className={`mt-10 ${s['container-info']}`}>
				<div className='mr-10'>
					<span className='text_type_digits-medium pr-2'>610</span>
					<CurrencyIcon type={'primary'} />
				</div>
				<Button htmlType='button' size='large' type='primary'>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
