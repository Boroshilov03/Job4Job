import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="-mt-32 bg-gradient-to-b from-black via-purple-600 to-blue-900 min-h-screen flex flex-col items-center justify-center">
            <div className="text-white text-center">
                <h1 className="text-5xl font-extrabold mb-6">Jobs 4 Jobs</h1>
                <p className="text-lg text-gray-300 mb-8">
                    Trade your skills for other's skills
                </p>
                <Link to="/signin" className="text-decoration-none">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300 flex items-center">
                        Get Started
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
