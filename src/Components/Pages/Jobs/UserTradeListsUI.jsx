import {FaCalendarDays, FaLocationDot} from "react-icons/fa6";
import React from "react";

function UserTradeListsUI({data}){

    return (
        <>
            <div id={data._id} className={"flex justify-between bg-purple-950 p-3 border-2 rounded border-purple-500 w-full"}>

                <div className={""}>
                    <p className="text-purple-100 bg-purple-800 border-2 border-purple-400 rounded-2xl text-xs px-2 py-0.5 inline-block mb-1 -mt-3 lg:mt-0">
                        {data.category || 'No Category'}
                    </p>
                    <h2 className="text-1xl font-bold text-white mb-1">{data.title || 'No Title'}</h2>

                    <p className="text-gray-100 text-xs pb-1.5 lg:pb-0 w-full">
                        {data.description || 'No Description'}
                    </p>

                </div>

            </div>
        </>
    )

}

export default UserTradeListsUI;