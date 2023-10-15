
const addJob = async (data) => {

    console.log(JSON.stringify(data))
    try {
        const response = await fetch("http://127.0.0.1:5000/addjob/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return "Job added successfully";
        } else {
            return `Error adding job: ${response.statusText}`;
        }
    } catch (error) {
        return `Error adding job: ${error.message}`;
    }
};

export default addJob;
