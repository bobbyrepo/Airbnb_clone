import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { PropertiesData } from "../airbnb_clone_data_dummy";
import { LocationCity as CityIcon } from "@mui/icons-material"

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
    // console.log(location)
    return (
        <>
            <Typography variant="h6" sx={{
                fontSize: {
                    xs: 18,
                    sm: 19,
                    md: 20,
                }
            }}>Where are you going?</Typography>
            {/* <List
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
            </List> */}
            <List
                sx={{
                    maxHeight: 300,       // Set desired max height
                    overflowY: 'auto',    // Enable vertical scroll if content overflows
                    borderRadius: 1,
                }}
            >
                {locations.map((loc) => (
                    <ListItemButton
                        key={loc} selected={location === loc} onClick={() => setLocation(loc)}
                        sx={{
                            borderRadius: "12px",
                            "&:hover": {
                                backgroundColor: "#f7f7f7",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 56,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f4f4f4",
                                borderRadius: "8px",
                                width: 48,
                                height: 48,
                            }}
                        >
                            <CityIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body1" >
                                    {loc.split(", ")[0]}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                                    {loc.split(", ")[1]}
                                </Typography>
                            }
                            sx={{ ml: 2 }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </>
    );
};

export default LocationSelector;
