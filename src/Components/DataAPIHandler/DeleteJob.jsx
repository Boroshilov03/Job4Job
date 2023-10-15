
const deleteJob = async (jobId) => {
    try {
        const url = `http://127.0.0.1:5000/deletejob/${jobId}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            return "Job deleted successfully";
        } else {
            return `Error deleting job: ${response.statusText}`;
        }
    } catch (error) {
        return `Error deleting job: ${error.message}`;
    }
};

export default deleteJob;