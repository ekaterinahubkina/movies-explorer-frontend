import AboutProject from "../AboutProject/AboutProject";
import NavTab from "../NavTab/NavTab";
import Promo from "../Promo/Promo";

function Main() {
    return (
        <div className="main">
            <Promo />
            <NavTab />
            <AboutProject />
        </div>
    )
}

export default Main;