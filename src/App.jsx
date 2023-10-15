
import './App.css'
import NavBarUI from "./Components/NavBarComp/NavBarUI.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthLogin from "./Components/AuthPageComp/AuthLogin.jsx";
import NavBarLayout from "./Components/NavBarComp/NavBarLayout.jsx";
import {useState} from "react";
import JobsUI from "./Components/Pages/Jobs/JobsUI.jsx";
import {AuthProvider} from "./Components/AuthPageComp/AuthProvider.jsx";
import ProfileUI from "./Components/Pages/Profile/ProfileUI.jsx";
import ChatRoom from "./Components/Pages/ChatRoom/ChatRoom.jsx";
import SearchPage from "./Components/Pages/Search/SearchPage.jsx";
import HomePage from "./Components/Pages/HomePage/HomePage.jsx";

function App() {

    return (
        <AuthProvider>
            <NavBarLayout>
                <Routes>
                    <Route path={"/"} element={<HomePage />}></Route>
                    <Route path={"/signin"} element={<AuthLogin/>}> </Route>
                    <Route path={"/jobs"} element={<JobsUI />}> </Route>
                    <Route path={"/profile"} element={<ProfileUI />}></Route>
                    <Route path={"/search"} element={<SearchPage />}></Route>
                    <Route path={"/chat"} element={<ChatRoom />}></Route>
                </Routes>
            </NavBarLayout>
        </AuthProvider>
    )

}

export default App
