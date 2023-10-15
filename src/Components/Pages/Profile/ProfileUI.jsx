
import { useUser } from "../../AuthPageComp/AuthProvider.jsx";
import JobsCardUI from "../Jobs/JobsCardUI.jsx";
import React, { useEffect, useState } from "react";
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

function ProfileUI() {
    const user = useUser();
    const [ProfileDataList, setProfileDataList] = useState([]);
    const [AcceptedDataList, setAcceptedDataList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfileData() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/alljobsbyuser/${user.id}`);
                const data = await response.json();
                setProfileDataList(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false);
            }
        }

        async function fetchAcceptedData() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/alltradedbyuser/${user.id}`);
                const data = await response.json();
                setAcceptedDataList(data);
            } catch (error) {
                console.error("Error fetching accepted data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfileData();
        fetchAcceptedData();
    }, [user.id]);

    const emailInitial = user.email?.charAt(0).toUpperCase(); // Get the first letter of the email

    return (
        <div className="h-screen bg-purple-600 lg:flex block">
            {/* Left side - User Profile */}
            <div className="w-1/3 bg-black p-4 text-white shadow-lg">
                <div className="text-purple-500 text-center">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto text-5xl font-semibold">
                        {emailInitial}
                    </div>
                    <h2 className="text-xl font-bold mt-2">{user.email}</h2>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-center mb-2">Profile Information</h3>
                    <hr />
                    <div className="mt-2">
                        <div className="flex flex-col gap-4">
                            <p><strong className="text-purple-400">User ID:</strong> {user.id}</p>
                            <p><strong className="text-purple-400">Email:</strong> {user.email}</p>
                            <p><strong className="text-purple-400">Phone:</strong> {user.phone || 'N/A'}</p>
                            <p><strong className="text-purple-400">Email Confirmed:</strong> {user.email_confirmed_at}</p>
                            <p><strong className="text-purple-400">Confirmation Sent At:</strong> {user.confirmation_sent_at}</p>
                            <p><strong className="text-purple-400">Confirmed At:</strong> {user.confirmed_at}</p>
                            <p><strong className="text-purple-400">Last Sign-in At:</strong> {user.last_sign_in_at}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Posting Listing Card */}
            <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
                <div className="">
                    <h3 className="text-purple-500 text-2xl font-semibold mb-1 flex items-center gap-2 underline"><ListAltRoundedIcon /> My Listings</h3>
                    {loading ? (
                        <p className={"text-black text-center text-3xl font-bold"}>Loading...</p>
                    ) : (
                        ProfileDataList.map((value, index) => (
                            <JobsCardUI key={index} data={value} />
                        ))
                    )}
                </div>

                <div className="">
                    <h3 className="text-purple-500 text-2xl font-semibold mt-3 mb-1 flex items-center gap-2 underline"><CheckRoundedIcon /> Accepted</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        AcceptedDataList.map((value, index) => (
                            <JobsCardUI key={index} data={value} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileUI;
