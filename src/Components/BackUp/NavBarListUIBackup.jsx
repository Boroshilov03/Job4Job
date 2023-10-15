

import React from 'react';
import { FaLocationDot, FaCalendarDays } from 'react-icons/fa6';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';

const JobsCardUI = () => {
    return (
        <div className="px-2">
            <div className="p-4 border-2 border-purple-300 rounded-lg mb-4 flex flex-col sm:flex-row bg-purple-700 relative">
                <div className="flex">
                    <div className="mb-2 sm:mb-0 mr-4 flex-shrink-0 text-center sm:text-left">
                        <img
                            src="https://t4.ftcdn.net/jpg/05/09/59/75/360_F_509597532_RKUuYsERhODmkxkZd82pSHnFtDAtgbzJ.jpg"
                            alt="Profile Picture"
                            className="w-16 h-16 rounded-full inline-block"
                        />
                        <p className="mt-2 text-sm text-white">@mirlan b</p>
                    </div>

                    <div className="flex-1 text-gray-500">
                        <div className="flex justify-between">
                            <p className="text-purple-100 bg-purple-800 border-2 border-purple-400 rounded-2xl text-sm px-2 py-0.5 inline-block mb-1">
                                Information Technology
                            </p>

                            <p className="flex text-sm text-white items-center gap-1 -mt-4">
                                <FaCalendarDays fontSize={15} />
                                September 14, 2023
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Senior Full Stack Software Developer
                            </h2>

                            <div className="flex items-center text-sm text-white gap-0.5 -mt-9 mr-3">
                                <FaLocationDot fontSize={15} />
                                San Francisco, CA
                            </div>
                        </div>

                        <p className="text-gray-100 text-sm">
                            Join our dynamic team as a Senior Full Stack Software Developer and help us develop innovative web and mobile applications using various cutting-edge technologies. This is a fantastic opportunity for experienced developers who are passionate about creating exceptional software solutions and want to take their career to the next level.
                        </p>

                        <div className="flex justify-end">
                            <button className="bg-purple-900 text-white px-2 py-1 rounded-md flex items-center transition-colors duration-300 border-2 border-purple-500 hover:bg-purple-950">
                                <SwapHorizRoundedIcon /> Request Trade
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JobsCardUI;
