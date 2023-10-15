
import React from 'react';
import { FaLocationDot, FaCalendarDays } from 'react-icons/fa6';
import JobTradeButtonUI from "./JobTradeButtonUI.jsx";
import JobRemoveButtonUI from "./JobRemoveButtonUI.jsx";
import { useUser } from "../../AuthPageComp/AuthProvider.jsx";
import "./JobsCardUI.jsx.css"

const getBackgroundColor = (username) => {
    if (username) {

        const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hue = hash % 360; // Hue value between 0 and 360
        return `hsl(${hue}, 70%, 50%)`; // Adjust the saturation and lightness as needed
    } else {
        // Return a default color if username is not defined
        return 'hsl(0,10%,76%)'; // Default to red
    }
};


const JobsCardUI = ({ data, onRemove }) => {

    const user = useUser();
    const emailInitial = data.username ? data.username[0].toUpperCase() : '#';
    const backgroundColor = getBackgroundColor(data.username);

    return (
        <div id={data._id} className={"flex justify-between p-3 border-2 rounded border-purple-500 bg-gray-900"}>
            <div className={"flex"}>
                <div className="mb-2 sm:mb-0 lg:mr-4 flex-shrink-0 sm:text-left">
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-5xl font-semibold"
                        style={{ backgroundColor: backgroundColor }}
                    >
                        {emailInitial}
                    </div>
                </div>

                <div className={""}>
                    <p className="text-purple-100 bg-purple-800 border-2 border-purple-400 rounded-2xl text-sm px-2 py-0.5 inline-block mb-1 -mt-3 lg:mt-0">
                        {data.category || 'No Category'}
                    </p>
                    <h2 className="text-2xl font-bold text-white mb-1">{data.title || 'No Title'}</h2>
                    <p className="text-gray-100 text-sm pb-1.5 lg:pb-0 w-full">
                        {data.description || 'No Description'}
                    </p>
                </div>
            </div>

            <div className={"flex flex-col justify-between"}>
                <div className={"flex flex-col gap-1"}>
                    <p className="text-sm text-white items-center gap-1 hidden lg:flex">
                        <FaCalendarDays fontSize={15} />
                        {data.timestamp ? new Date(data.timestamp).toDateString() : 'No Date'}
                    </p>
                    <div className="items-center text-sm text-white gap-0.5 mr-3 hidden lg:flex">
                        <FaLocationDot fontSize={15} />
                        {data.location || 'No Location'}
                    </div>
                </div>
                <div className={"flex-col flex lg:flex gap-1.5 mt-2"}>
                    {data.user_id !== user.id && (
                        <div className="self-end">
                            <JobTradeButtonUI otherChosenID={data._id}  cardTitleChosen={data.title} cardDescriptionChosen={data.description} />
                        </div>
                    )}
                    {data.user_id === user.id && (
                        <div className={""}>
                            <JobRemoveButtonUI cardID={data._id} cardTitle={data.title} onRemove={onRemove}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobsCardUI;
