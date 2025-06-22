import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DateRange, type Range, type RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import '../css/customDateRange.css';
import Calendar from "./Calender";

interface CalendarSelectorProps {
    heading1: string;
    heading2: string;
    align: "left" | "center";
    setDateRange: (range: Range) => void;
    value: Range;
    onChange: (value: Range) => void;
    // disabledDates?: Date[];
}

const CalendarSelector: React.FC<CalendarSelectorProps> = ({
    heading1,
    heading2,
    align,
    setDateRange,
    value,
    onChange,
    // disabledDates,
}) => {

    const handleChange = (value: RangeKeyDict) => {
        onChange(value.selection);
    };

    useEffect(() => {
        setDateRange(value)
    }, [])

    return (
        <Box>
            <Typography variant="h5" textAlign={align} fontWeight={600} mb={1}>
                {heading1}
            </Typography>
            <Typography variant="body2" textAlign={align} color="text.secondary" mb={3}>
                {heading2}
            </Typography>

            <Calendar
                value={value}
                onChange={handleChange}
            // disabledDates={disabledDates}
            />
        </Box>
    );
};

export default CalendarSelector;