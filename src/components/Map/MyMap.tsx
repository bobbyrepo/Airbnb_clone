import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import type { Property } from "../../airbnb_clone_data_dummy";
import { Box } from "@mui/material";
import MarkerPopup from "./MarkerPopup";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface MyMapProps {
    location: string;
    properties: Property[];
    activePropertyId: number | null;
    setActivePropertyId: (id: number) => void;
}

type Marker = {
    id: number;
    lat: number;
    lng: number;
};

const MyMap: React.FC<MyMapProps> = ({ location, properties, activePropertyId, setActivePropertyId }) => {
    const [viewPort, setViewPort] = useState({
        latitude: properties[0]?.details?.location?.lat,
        longitude: properties[0]?.details?.location?.lng,
        zoom: 14,
    });
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
    console.log(location)
    return (
        <Box style={{ width: '100%', height: "100%" }}>
            <Map
                {...viewPort}
                mapboxAccessToken={TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={(evt) => setViewPort(evt.viewState)}
            >
                {properties.map((property) => (
                    <Marker
                        key={property.id}
                        latitude={property.details.location.lat}
                        longitude={property.details.location.lng}
                    >
                        <Box
                            onClick={() => {
                                setSelectedProperty(property)
                                setActivePropertyId(property.id)
                            }}
                            sx={{
                                backgroundColor: (activePropertyId == property.id) ? "black" : "white",
                                // border: "2px solid #ff385c",
                                borderRadius: "10px",
                                px: "10px",
                                py: "2px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "14px",
                                color: (activePropertyId == property.id) ? "white" : "black",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            ${property.price}
                        </Box>
                    </Marker>
                ))}

                {/* Property Popup */}
                {selectedProperty && (
                    <Popup
                        latitude={selectedProperty.details.location.lat}
                        longitude={selectedProperty.details.location.lng}
                        onClose={() => setSelectedProperty(null)}
                        closeButton={false}
                        closeOnClick={false}
                        offset={[0, 10]}

                    >
                        <MarkerPopup
                            property={selectedProperty}
                            onClose={() => setSelectedProperty(null)}
                        />
                    </Popup>
                )}
            </Map>
        </Box>
    );
};

export default MyMap;