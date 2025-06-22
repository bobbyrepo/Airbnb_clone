import React from "react";
import { Box, Typography } from "@mui/material";
import GuestCounter from "./GuestCounter";
import { formatGuestSummary } from "../utils/helper";

interface GuestCount {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

interface GuestSelectorProps {
    guestCount: GuestCount;
    setGuestCount: React.Dispatch<React.SetStateAction<GuestCount>>;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({ guestCount, setGuestCount }) => {
    const summary = formatGuestSummary(guestCount);

    const handleChange = (key: keyof GuestCount, delta: number) => {
        setGuestCount((prev) => ({
            ...prev,
            [key]: Math.max(0, prev[key] + delta),
        }));
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Who’s coming?
            </Typography>

            <GuestCounter guestCount={guestCount} onChange={handleChange} />

            <Box sx={{ mt: 3, p: 2, backgroundColor: "#f7f7f7", borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total guests:
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                    {summary || 0}
                </Typography>
            </Box>
        </Box>
    );
};

export default GuestSelector;
