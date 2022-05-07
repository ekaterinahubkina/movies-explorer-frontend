import Navigation from '../Navigation/Navigation';
import './MobileNavigation.css';
import { useLocation } from 'react-router-dom';


const MobileNavigation = ({ isChecked }) => {

    const location = useLocation();

    // const MobileNavigationVisibleClassName = ({props.isChecked}) => {
    //     return `mobile-navigation ${isChecked && 'mobile-navigation_visible'}`;
    // }
    return (
        <article className={`mobile-navigation ${isChecked && 'mobile-navigation_visible'}`}>
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            <Navigation location={location} />
        </article>
    )
}

export default MobileNavigation;