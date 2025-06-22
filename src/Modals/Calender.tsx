import React from "react";
import { Box } from "@mui/material";
import { DateRange, type RangeKeyDict } from "react-date-range";
import type { Range } from "react-date-range";

interface CalendarProps {
    value: Range;
    onChange: (ranges: RangeKeyDict) => void;
    // disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ value, onChange,
    // disabledDates = []
}) => {
    return (
        <Box display="flex" justifyContent="center">
            <DateRange
                ranges={[value]}
                onChange={onChange}
                minDate={new Date()}
                direction="vertical"
                showDateDisplay={false}
                rangeColors={["#232322"]}
            // disabledDates={disabledDates}
            />
        </Box>
    );
};

export default Calendar;
