import type React from "react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import { PropertiesData } from "../airbnb_clone_data_dummy"
import type { Property } from "../airbnb_clone_data_dummy"
import MyMap from "../components/Map/MyMap"
import SearchedPropertyCardComponent from "../components/Cards/SearchedPropertyCard"

const SearchPage: React.FC = () => {
    const location = useLocation()
    const state = location.state as {
        location: string
        guestCount: number
    }

    console.log(state)
    const [activePropertyId, setActivePropertyId] = useState<number | null>(null);


    function filterProperties(locationQuery: string, minGuests: number): Property[] {
        return PropertiesData.filter((property) => {
            const { city, country } = property.details.location
            const fullLocation = `${city}, ${country}`.toLowerCase()

            const matchesLocation = fullLocation.includes(locationQuery.toLowerCase())

            const guestMatch = property.details.has.match(/^(\d+)\s/)
            const maxGuests = guestMatch ? Number.parseInt(guestMatch[1], 10) : 0
            const matchesGuestCount = maxGuests >= minGuests

            return matchesLocation && matchesGuestCount
        })
    }

    const searchedResults = filterProperties(state.location, state.guestCount)

    if (searchedResults.length == 0) {
        return (
            <Box
                sx={{
                    height: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
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
        <Box sx={{ width: "90%", margin: "auto", display: "flex", gap: 4 }}>
            <Box
                sx={{
                    pb: 10,
                    width: "60%",
                    overflowY: "auto",
                    height: "100vh",
                    borderRight: "1px solid #e0e0e0",
                    // Hide scrollbar for Firefox
                    scrollbarWidth: 'none',
                }}
            >
                <Typography variant="body1" color="black" my={1}>
                    {searchedResults.length} Matches
                </Typography>


                {/* Results Section */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(1, 1fr)",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                        },
                        gap: 3,
                    }}
                >
                    {searchedResults.map((property) => (
                        <Box key={property.id}
                            onMouseEnter={() => setActivePropertyId(property.id)}
                            onMouseLeave={() => setActivePropertyId(null)}
                        >
                            <SearchedPropertyCardComponent property={property} />
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box sx={{
                width: "40%",
                height: "85vh",
                marginY: "30px",
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                bgcolor: "#ddd"
            }}>
                {/* Map Section */}
                <MyMap
                    location={state.location}
                    properties={searchedResults}
                    activePropertyId={activePropertyId}
                    setActivePropertyId={setActivePropertyId}
                />

            </Box>
        </Box >
    )
}

export default SearchPage
