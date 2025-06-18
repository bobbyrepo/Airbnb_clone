import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DateRange, type Range, type RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
    setDateRange: (range: Range) => void;
    value: Range;
    onChange: (fieldName: string, value: Range) => void;
    disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
    setDateRange,
    value,
    onChange,
    disabledDates,
}) => {

    const handleChange = (value: RangeKeyDict) => {
        onChange("dateRange", value.selection);
    };

    useEffect(() => {
        setDateRange(value)

    }, [])

    return (
        <Box>
            <Typography variant="h5" textAlign="center" fontWeight={600} mb={1}>
                When do you plan to go?
            </Typography>
            <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
                Make sure everyone is free!
            </Typography>

            <Box display="flex" justifyContent="center">
                <DateRange
                    ranges={[value]}
                    onChange={handleChange}
                    minDate={new Date()}
                    direction="vertical"
                    showDateDisplay={false}
                    rangeColors={["#FF385C"]}
                    disabledDates={disabledDates}
                />
            </Box>
        </Box>
    );
};

export default Calendar;