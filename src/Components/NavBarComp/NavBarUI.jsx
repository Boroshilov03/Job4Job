
import NavBarLogo from "./NavBarLogo.jsx";
import NavBarListsUI from "./NavBarListsUI.jsx";


function NavBarUI(){

    return (
        <div className={"flex justify-between items-center bg-black py-4 px-4"}>
            <NavBarLogo />
            <NavBarListsUI />
        </div>
    )


}


export default NavBarUI;