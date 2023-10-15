

import NavBarUI from "./NavBarUI.jsx";

function NavBarLayout({children}){

    return (
        <>
            <NavBarUI/>
            {children}
        </>
    )

}


export default NavBarLayout;