import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.scss';
import { MenuItem } from '@components/menu-item/menu-item';

export const AppHeader = () => {

    return (
        <header className={s.header}>
            <div className={s['left-block']}>
                <MenuItem
                    icon={<BurgerIcon type={'secondary'}/>}
                    text='Конструктор'
                />
                <MenuItem
                    icon={<ListIcon type={'secondary'}/>}
                    text='Лента заказов'
                />  
            </div>           
            
            <Logo />
            <div className={s['right-block']}>
                <MenuItem
                    icon={<ProfileIcon type='secondary'/>}
                    text='Личный кабинет'
                />
            </div> 
        </header>
    );
}
