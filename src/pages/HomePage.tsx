import type React from "react"
import { Box } from "@mui/material"
import PropertyCarousel from "../components/PropertyCarousel"
import { PropertiesData, type Property } from "../airbnb_clone_data_dummy"

const groupPropertiesByCityCountry = (properties: Property[]) => {
    const locationGroups: { [key: string]: Property[] } = {}

    for (const property of properties) {
        const { city, country } = property.details.location
        const key = `${city}, ${country}`

        if (!locationGroups[key]) {
            locationGroups[key] = []
        }

        locationGroups[key].push(property)
    }

    return locationGroups
}

const AirbnbHomepage: React.FC = () => {
    const groupedProperties = groupPropertiesByCityCountry(PropertiesData)

    return (
        <Box sx={{ width: "90%", margin: "auto" }}>
            <Box sx={{
                my: {
                    xs: 2,
                    md: 4,
                    lg: 6,
                }
            }}>
                {Object.entries(groupedProperties).map(([location, properties]) => (
                    <PropertyCarousel key={location} title={location} properties={properties} />
                ))}
            </Box>
        </Box>
    )
}

export default AirbnbHomepage


// import { Box } from "@mui/material"

// import PropertyCardComponent from "../components/Cards/PropertyCard"

// import { PropertiesData } from "../airbnb_clone_data_dummy"

// // const SearchContainer = styled(Paper)(({ theme }) => ({
// //     display: "flex",
// //     alignItems: "center",
// //     borderRadius: "32px",
// //     border: "1px solid #ddd",
// //     boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
// //     padding: "8px",
// //     margin: "20px auto",
// //     maxWidth: "850px",
// // }))

// // const SearchSection = styled(Box)(({ theme }) => ({
// //     padding: "14px 24px",
// //     borderRadius: "32px",
// //     cursor: "pointer",
// //     "&:hover": {
// //         backgroundColor: "#f7f7f7",
// //     },
// // }))

// // const SearchButton = styled(IconButton)(({ theme }) => ({
// //     backgroundColor: "#FF385C",
// //     color: "white",
// //     padding: "16px",
// //     marginLeft: "8px",
// //     "&:hover": {
// //         backgroundColor: "#E31C5F",
// //     },
// // }))



// // const SectionTitle = styled(Typography)(({ theme }) => ({
// //     fontSize: "22px",
// //     fontWeight: 600,
// //     marginBottom: "24px",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// // }))

// const AirbnbHomepage: React.FC = () => {
//     return (
//         <Box sx={{ width: "90%", margin: "auto" }}>
//             <Box sx={{ my: 6 }}>
//                 {/* <SectionTitle>
//                     Popular homes
//                     <IconButton>
//                         <ChevronRightIcon />
//                     </IconButton>
//                 </SectionTitle> */}
//                 <Box
//                     sx={{
//                         display: "grid",
//                         gridTemplateColumns: {
//                             xs: "repeat(2, 1fr)",   // 2 columns
//                             sm: "repeat(3, 1fr)",   // 3 columns
//                             md: "repeat(4, 1fr)",   // 4 columns
//                             lg: "repeat(5, 1fr)",   // 5 columns
//                             xl: "repeat(6, 1fr)",   // 6 columns
//                         },
//                         gap: 3,
//                     }}
//                 >
//                     {PropertiesData.map((property) => (
//                         <Box key={property.id} sx={{ width: "auto" }}>
//                             <PropertyCardComponent property={property} />
//                         </Box>
//                     ))}
//                 </Box>
//             </Box>
//         </Box >
//     )
// }

// export default AirbnbHomepage