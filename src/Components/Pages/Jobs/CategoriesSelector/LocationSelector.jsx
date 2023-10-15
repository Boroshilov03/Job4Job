
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {LocationData} from "../../../../Data/LocationData.jsx";

function LocationSelector() {
    return (
        <Select placeholder="Choose one…" >
            {LocationData.map((value, index) => (
                <Option key={index} value={value}>
                    {value}
                </Option>
            ))}
        </Select>
    );
}

export default LocationSelector;
