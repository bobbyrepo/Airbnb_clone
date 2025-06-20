// import React from "react"
// import { Box, Typography, IconButton, Divider, Link } from "@mui/material"
// import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material"

// interface GuestCount {
//     adults: number
//     children: number
//     infants: number
//     pets: number
// }

// interface GuestSelectorProps {
//     guestCount: GuestCount
//     setGuestCount: React.Dispatch<React.SetStateAction<GuestCount>>
// }

// interface GuestCategoryProps {
//     title: string
//     description: string
//     count: number
//     onIncrement: () => void
//     onDecrement: () => void
//     minCount?: number
// }

// const GuestCategory: React.FC<GuestCategoryProps> = ({
//     title,
//     description,
//     count,
//     onIncrement,
//     onDecrement,
//     minCount = 0,
// }) => {
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 py: 3,
//             }}
//         >
//             <Box sx={{ flex: 1 }}>
//                 <Typography
//                     variant="body1"
//                     sx={{
//                         fontWeight: 600,
//                         color: "text.primary",
//                         mb: 0.5,
//                     }}
//                 >
//                     {title}
//                 </Typography>
//                 <Typography
//                     variant="body2"
//                     sx={{
//                         color: "text.secondary",
//                     }}
//                 >
//                     {description}
//                 </Typography>
//             </Box>

//             <Box
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 2,
//                 }}
//             >
//                 <IconButton
//                     onClick={onDecrement}
//                     disabled={count <= minCount}
//                     sx={{
//                         border: "1px solid #ddd",
//                         width: 32,
//                         height: 32,
//                         "&:disabled": {
//                             borderColor: "#f0f0f0",
//                             color: "#ccc",
//                         },
//                         "&:hover": {
//                             borderColor: "#333",
//                         },
//                     }}
//                 >
//                     <RemoveIcon fontSize="small" />
//                 </IconButton>

//                 <Typography
//                     variant="body1"
//                     sx={{
//                         minWidth: 20,
//                         textAlign: "center",
//                         fontWeight: 500,
//                     }}
//                 >
//                     {count}
//                 </Typography>

//                 <IconButton
//                     onClick={onIncrement}
//                     sx={{
//                         border: "1px solid #ddd",
//                         width: 32,
//                         height: 32,
//                         "&:hover": {
//                             borderColor: "#333",
//                         },
//                     }}
//                 >
//                     <AddIcon fontSize="small" />
//                 </IconButton>
//             </Box>
//         </Box>
//     )
// }

// const GuestSelector: React.FC<GuestSelectorProps> = ({ guestCount, setGuestCount }) => {
//     const updateGuestCount = (category: keyof GuestCount, increment: boolean) => {
//         setGuestCount((prev) => ({
//             ...prev,
//             [category]: increment ? prev[category] + 1 : Math.max(0, prev[category] - 1),
//         }))
//     }

//     const guestCategories = [
//         {
//             key: "adults" as keyof GuestCount,
//             title: "Adults",
//             description: "Ages 13 or above",
//             minCount: 0,
//         },
//         {
//             key: "children" as keyof GuestCount,
//             title: "Children",
//             description: "Ages 2-12",
//             minCount: 0,
//         },
//         {
//             key: "infants" as keyof GuestCount,
//             title: "Infants",
//             description: "Under 2",
//             minCount: 0,
//         },
//         {
//             key: "pets" as keyof GuestCount,
//             title: "Pets",
//             description: "",
//             minCount: 0,
//         },
//     ]

//     return (
//         <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
//             {guestCategories.map((category, index) => (
//                 <React.Fragment key={category.key}>
//                     <GuestCategory
//                         title={category.title}
//                         description={category.description}
//                         count={guestCount[category.key]}
//                         onIncrement={() => updateGuestCount(category.key, true)}
//                         onDecrement={() => updateGuestCount(category.key, false)}
//                         minCount={category.minCount}
//                     />

//                     {/* Special link for pets */}
//                     {category.key === "pets" && (
//                         <Box sx={{ mt: -2, mb: 2 }}>
//                             <Link
//                                 href="#"
//                                 underline="always"
//                                 sx={{
//                                     color: "text.secondary",
//                                     fontSize: "14px",
//                                     "&:hover": {
//                                         color: "text.primary",
//                                     },
//                                 }}
//                             >
//                                 Bringing a service animal?
//                             </Link>
//                         </Box>
//                     )}

//                     {index < guestCategories.length - 1 && <Divider sx={{ opacity: 0.3 }} />}
//                 </React.Fragment>
//             ))}

//             {/* Summary */}
//             <Box sx={{ mt: 3, p: 2, backgroundColor: "#f7f7f7", borderRadius: 2 }}>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                     Total guests:
//                 </Typography>
//                 <Typography variant="body1" fontWeight={600}>
//                     {guestCount.adults + guestCount.children} guests
//                     {guestCount.infants > 0 && `, ${guestCount.infants} infant${guestCount.infants > 1 ? "s" : ""}`}
//                     {guestCount.pets > 0 && `, ${guestCount.pets} pet${guestCount.pets > 1 ? "s" : ""}`}
//                 </Typography>
//             </Box>
//         </Box>
//     )
// }

// export default GuestSelector

/////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatGuestSummary } from "../utils/helper";

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
        <Box >
            <Typography variant="h6" gutterBottom>
                Who’s coming?
            </Typography>

            {categories.map(({ label, sub, key }) => (
                <Box>

                    <Box key={key} display="flex" justifyContent="space-between" alignItems="center" py={2}>
                        <Box>
                            <Typography fontWeight={600}>{label}</Typography>
                            <Typography variant="body2" color="text.secondary">{sub} </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton
                                onClick={() => handleChange(key, -1)}
                                disabled={guestCount[key] <= 0}
                                sx={{
                                    border: "1px solid #ddd", width: 32, height: 32,
                                    "&:disabled": { borderColor: "#f0f0f0", color: "#ccc", },
                                }}
                            >
                                <RemoveIcon fontSize="small" />
                            </IconButton>

                            <Typography minWidth={20} textAlign="center" fontWeight={500}>
                                {guestCount[key]}
                            </Typography>

                            <IconButton
                                onClick={() => handleChange(key, 1)}
                                sx={{ border: "1px solid #ddd", width: 32, height: 32, }} >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 1 }} />
                </Box>
            ))}


            {/* Summary */}
            <Box sx={{ mt: 3, p: 2, backgroundColor: "#f7f7f7", borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total guests:
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                    {summary || 0}
                </Typography>
            </Box>

        </Box >
    );
};

export default GuestSelector;
