import React from 'react'
import { useLocation } from 'react-router-dom';
import { Box, Typography } from "@mui/material"
import { PropertiesData } from '../airbnb_clone_data_dummy';
import type { Property } from '../airbnb_clone_data_dummy';
import PropertyCardComponent from '../components/PropertyCard';

const SearchPage: React.FC = () => {
    const location = useLocation();
    const state = location.state as {
        location: string
        guestCount: number;
    };

    function filterProperties(
        locationQuery: string,
        minGuests: number
    ): Property[] {
        return PropertiesData.filter((property) => {
            const { city, country } = property.details.location;
            const fullLocation = `${city}, ${country}`.toLowerCase();

            const matchesLocation = fullLocation.includes(locationQuery.toLowerCase());

            const guestMatch = property.details.has.match(/^(\d+)\s/);
            const maxGuests = guestMatch ? parseInt(guestMatch[1], 10) : 0;
            const matchesGuestCount = maxGuests >= minGuests;

            return matchesLocation && matchesGuestCount;
        });
    }

    const searchedResults = filterProperties(state.location, state.guestCount);

    if (searchedResults.length == 0) {
        return (
            <Box sx={{
                height: '60vh', // adjust as needed
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center', // center text inside
            }}>
                <Typography variant="h4" fontWeight={600}>
                    No exact matches
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Try adjusting your dates to explore more places to stay.
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ width: "90%", margin: "auto" }}>
            <Box sx={{ my: 4 }}>
                <Typography variant="body1" color="black" my={1}>
                    {searchedResults.length} Matches
                </Typography>
                {/* <SectionTitle>
                Popular homes
                <IconButton>
                    <ChevronRightIcon />
                </IconButton>
            </SectionTitle> */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, 1fr)",   // 2 columns
                            sm: "repeat(3, 1fr)",   // 3 columns
                            md: "repeat(4, 1fr)",   // 4 columns
                            lg: "repeat(5, 1fr)",   // 5 columns
                            xl: "repeat(6, 1fr)",   // 6 columns
                        },
                        gap: 2,
                    }}
                >
                    {searchedResults.map((property) => (
                        <Box key={property.id} sx={{ width: "200px" }}>
                            <PropertyCardComponent property={property} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box >)
}

export default SearchPage