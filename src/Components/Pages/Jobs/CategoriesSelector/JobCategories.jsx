

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {JobCategoriesData} from "../../../../Data/JobCategoriesData.jsx";

function JobCategories() {
    return (
        <Select placeholder="Choose one…">
            {JobCategoriesData.map((value, index) => (
                <Option key={index} value={value}>
                    {value}
                </Option>
            ))}
        </Select>
    );
}

export default JobCategories;
