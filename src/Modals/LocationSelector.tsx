import React from "react";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { PropertiesData } from "../airbnb_clone_data_dummy";

const locations = [
    ...new Set(
        PropertiesData.map(
            (property) => `${property.details.location.city}, ${property.details.location.country}`
        )
    ),
];

interface LocationSelectorProps {
    setLocation: (loc: string) => void;
    location: string;
}

const LocationSelector = ({ setLocation, location }: LocationSelectorProps) => {
    return (
        <>
            <Typography variant="h6">Where are you going?</Typography>
            <List
                sx={{
                    maxHeight: 300,       // Set desired max height
                    overflowY: 'auto',    // Enable vertical scroll if content overflows
                    border: '1px solid #e0e0e0', // Optional: visual boundary
                    borderRadius: 1,
                }}
            >
                {locations.map((loc) => (
                    <ListItemButton key={loc} selected={location === loc} onClick={() => setLocation(loc)}>
                        <ListItemText primary={loc} />
                    </ListItemButton>
                ))}
            </List>
        </>
    );
};

export default LocationSelector;
