import React from "react";
import { Box, IconButton, Typography, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface GuestCount {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

interface GuestCounterProps {
    guestCount: GuestCount;
    onChange: (key: keyof GuestCount, delta: number) => void;
}

const categories: {
    label: string;
    sub: string;
    key: keyof GuestCount;
}[] = [
        { label: "Adults", sub: "Ages 13 or above", key: "adults" },
        { label: "Children", sub: "Ages 2–12", key: "children" },
        { label: "Infants", sub: "Under 2", key: "infants" },
        { label: "Pets", sub: "Bringing a service animal?", key: "pets" },
    ];

const GuestCounter: React.FC<GuestCounterProps> = ({ guestCount, onChange }) => {
    return (
        <>
            {categories.map(({ label, sub, key }) => (
                <Box key={key}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                        <Box>
                            <Typography fontWeight={600}>{label}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {sub}
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton
                                onClick={() => onChange(key, -1)}
                                disabled={guestCount[key] <= 0}
                                sx={{
                                    border: "1px solid #ddd",
                                    width: 32,
                                    height: 32,
                                    "&:disabled": {
                                        borderColor: "#f0f0f0",
                                        color: "#ccc",
                                    },
                                }}
                            >
                                <RemoveIcon fontSize="small" />
                            </IconButton>

                            <Typography minWidth={20} textAlign="center" fontWeight={500}>
                                {guestCount[key]}
                            </Typography>

                            <IconButton
                                onClick={() => onChange(key, 1)}
                                sx={{
                                    border: "1px solid #ddd",
                                    width: 32,
                                    height: 32,
                                }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 1 }} />
                </Box>
            ))}
        </>
    );
};

export default GuestCounter;
