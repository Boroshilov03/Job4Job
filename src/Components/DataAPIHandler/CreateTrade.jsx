
const createTrade = async (posterJob, requestJob, nameRequest) => {
    try {
        const url = `http://127.0.0.1:5000/createtrade/${posterJob}/${requestJob}/${nameRequest}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            return "Trade offer created successfully.";
        } else {
            return `Error creating trade: ${response.statusText}`;
        }
    } catch (error) {
        return `Error creating trade: ${error.message}`;
    }
};

export default createTrade;
