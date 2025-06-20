"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, IconButton, Paper } from "@mui/material"
import { Search, Fullscreen, Add, Remove, Home } from "@mui/icons-material"
import Map, { Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import type { Property } from "../../airbnb_clone_data_dummy"

interface PropertyMapProps {
    property: Property
}

const PropertyMap: React.FC<PropertyMapProps> = ({ property }) => {
    // Fix: Swap longitude and latitude - longitude should use lng, latitude should use lat
    const [viewState, setViewState] = useState({
        longitude: property.details.location.lng, // Fixed: was using lat
        latitude: property.details.location.lat, // Fixed: was using lng
        zoom: 13,
    })

    return (
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
            {/* Header */}
            <Box sx={{ p: 3, backgroundColor: "white" }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    Where you'll be
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {(property.details.location.city + ", " + property.details.location.country) || "Property Location"}
                </Typography>
            </Box>

            {/* Map Container */}
            <Box sx={{ height: 500, position: "relative", borderRadius: 10, overflow: "hidden" }}>
                <Map
                    {...viewState}
                    onMove={(evt) => setViewState(evt.viewState)}
                    style={{ width: "100%", height: "100%" }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    mapboxAccessToken={
                        import.meta.env.VITE_MAPBOX_TOKEN || "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example"
                    }
                >

                    {/* Center Home Marker */}
                    <Marker longitude={property.details.location.lng} latitude={property.details.location.lat} anchor="bottom">
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: "black",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                border: "3px solid white",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                            }}
                        >
                            <Home sx={{ color: "white", fontSize: 20 }} />
                        </Box>
                    </Marker>

                    {/* Map Controls */}
                    <Box sx={{ position: "absolute", bottom: 80, right: 16, display: "flex", flexDirection: "column", gap: 1 }}>
                        <IconButton
                            onClick={() => setViewState((prev) => ({ ...prev, zoom: prev.zoom + 1 }))}
                            sx={{
                                backgroundColor: "white",
                                boxShadow: 1,
                                "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                        >
                            <Add />
                        </IconButton>
                        <IconButton
                            onClick={() => setViewState((prev) => ({ ...prev, zoom: prev.zoom - 1 }))}
                            sx={{
                                backgroundColor: "white",
                                boxShadow: 1,
                                "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                        >
                            <Remove />
                        </IconButton>
                    </Box>
                </Map>
            </Box>
        </Box>
    )
}

export default PropertyMap


// import { Box } from '@mui/material';
// import React, { useState } from 'react'
// import Map, { Marker } from "react-map-gl";
// import type { Property } from '../../airbnb_clone_data_dummy';

// const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// interface PropertyMapProps {
//     property: Property;
//     lat: number;
//     long: number
// }
// const PopertyMap: React.FC<PropertyMapProps> = ({ property, lat, long }) => {

//     const [viewPort, setViewPort] = useState({
//         latitude: lat,
//         longitude: long,
//         zoom: 14,
//     });
//     return (

//         <Box style={{ width: '100%', height: "100%" }}>
//             <Map
//                 {...viewPort}
//                 mapboxAccessToken={TOKEN}
//                 mapStyle="mapbox://styles/mapbox/streets-v12"
//                 onMove={(evt) => setViewPort(evt.viewState)}
//             >
//                 {/* {properties.map((property) => ( */}
//                 <Marker
//                     key={property.id}
//                     latitude={property.details.location.lat}
//                     longitude={property.details.location.lng}
//                 >
//                     <Box
//                         sx={{
//                             backgroundColor: "white",
//                             // border: "2px solid #ff385c",
//                             borderRadius: "10px",
//                             px: "10px",
//                             py: "2px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             cursor: "pointer",
//                             fontWeight: "bold",
//                             fontSize: "14px",
//                             color: "black",
//                             boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//                             transition: "all 0.2s ease-in-out",
//                             "&:hover": {
//                                 transform: "scale(1.1)",
//                             },
//                         }}
//                     >
//                         ${property.price}
//                     </Box>
//                 </Marker>
//                 {/* ))} */}

//             </Map>
//         </Box>
//         // <Box style={{ width: '100%', height: "100%" }}>

//         //     <Map
//         //         {...viewPort}
//         //         mapboxAccessToken={TOKEN}
//         //         mapStyle="mapbox://styles/mapbox/streets-v12"
//         //         onMove={(evt) => setViewPort(evt.viewState)}
//         //     >

//         //     </Map>
//         // </Box>
//     )
// }

// export default PopertyMap