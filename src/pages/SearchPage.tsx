import type React from "react"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material"
import MapIcon from "@mui/icons-material/Map"
import ListIcon from "@mui/icons-material/List"
import GridViewIcon from "@mui/icons-material/GridView"
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

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    // State to track whether to show map or list on medium screens (default to list)
    // For small screens, we'll always show both with the map on top
    const [showMap, setShowMap] = useState<boolean>(false)
    const [activePropertyId, setActivePropertyId] = useState<number | null>(null)

    // Reset to list view when screen size changes to mobile but not small
    useEffect(() => {
        if (isMobile && !isSmallScreen) {
            setShowMap(false)
        }
    }, [isMobile, isSmallScreen])


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
        <Box sx={{
            width: { sm: "90%" },
            margin: "auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            position: "relative",
            height: "100vh"
        }}>
            {/* List Section */}
            <Box
                sx={{
                    pb: 10,
                    width: { xs: "100%", md: "60%" },
                    overflowY: "auto",
                    height: isSmallScreen ? "60vh" : "100vh",
                    borderRight: { xs: "none", md: "1px solid #e0e0e0" },
                    scrollbarWidth: 'none',
                    display: isMobile && showMap && !isSmallScreen ? "none" : "block",
                    position: isSmallScreen ? "absolute" : "static",
                    bottom: isSmallScreen ? 0 : "auto",
                    left: 0,
                    right: 0,
                    zIndex: isSmallScreen ? 2 : 1,
                    backgroundColor: "white",
                    transition: "all 0.3s ease",
                    ...(isSmallScreen && {
                        position: "absolute",
                        height: "60vh",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        boxShadow: "0px -4px 10px rgba(0,0,0,0.1)",
                        paddingTop: "10px",
                        px: 3
                    })
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

            {/* Map Section */}
            <Box sx={{
                width: { xs: "100%", md: "40%" },
                height: isSmallScreen ? "100%" : isMobile && !showMap ? "0" : "85vh",
                marginY: { xs: 0, md: "30px" },
                borderRadius: { xs: 0, md: "20px" },
                overflow: "hidden",
                position: isSmallScreen ? "relative" : "relative",
                top: 0,
                left: 0,
                right: 0,
                bgcolor: "#ddd",
                display: isMobile && !showMap && !isSmallScreen ? "none" : "block",
                zIndex: 1,
                paddingBottom: isSmallScreen ? "60vh" : 0
            }}>
                <MyMap
                    location={state.location}
                    properties={searchedResults}
                    activePropertyId={activePropertyId}
                    setActivePropertyId={setActivePropertyId}
                />
            </Box>

            {/* Floating Toggle Button (only visible on medium screens, not small screens) */}
            {isMobile && !isSmallScreen && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 3,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={showMap ? <GridViewIcon /> : <MapIcon />}
                        onClick={() => setShowMap(!showMap)}
                        sx={{
                            bgcolor: "black",
                            color: "white",
                            borderRadius: "30px",
                            px: 3,
                            py: 1.5,
                            textTransform: "none",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                            "&:hover": {
                                bgcolor: "#333"
                            }
                        }}
                    >
                        {showMap ? "Show list" : "Show map"}
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default SearchPage
