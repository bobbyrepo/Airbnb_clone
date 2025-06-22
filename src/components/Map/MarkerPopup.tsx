import {
    Box,
    Card,
    Typography,
    Grid,
    IconButton,
} from "@mui/material";
import { Star as StarIcon, ChevronLeft, ChevronRight, Close as CloseIcon } from "@mui/icons-material";
import type { Property } from "../../airbnb_clone_data_dummy";
import { useCarousel } from "../../hooks/useCarousel";
import { styled } from "@mui/system";

const DotsContainer = styled(Box)({
    position: "absolute",
    bottom: 12,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 4,
    zIndex: 2,
})

const Dot = styled(Box)<{ active: boolean }>(({ active }) => ({
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: active ? "white" : "rgba(255, 255, 255, 0.5)",
    transition: "background-color 0.2s ease",
}))

type Props = {
    property: Property;
    onClose: () => void;
};

const MarkerPopup: React.FC<Props> = ({ property, onClose }) => {
    const { currentIndex, prev, next } = useCarousel(property.details.images);

    return (
        <Card
            // sx={{ width: 300, borderRadius: 8, boxShadow: 3, position: "relative" }}
            sx={{
                width: 270,
                borderRadius: 8,
                boxShadow: 3,
                position: "relative",
                transform: "translateX(-50%) scale(1.1)",
                left: "50%",
                top: 3
            }}        >
            <IconButton onClick={onClose} sx={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1,
                backgroundColor: "rgba(255,255,255,.9)"
            }} size="small">
                <CloseIcon fontSize="inherit" />
            </IconButton>

            <Box position={"relative"}>
                <img
                    src={property.details.images[currentIndex]}
                    alt={property.place_name}
                    style={{ width: "100%", height: 180, objectFit: "cover" }}
                />

                {property.details?.images?.length > 1 && (
                    <DotsContainer>
                        {property?.details?.images.map((_: string, index: number) => (
                            <Dot key={index} active={index === currentIndex} />
                        ))}
                    </DotsContainer>
                )}
            </Box>

            <Box sx={{ px: 2, pb: 1 }}>
                <Typography variant="subtitle2" fontWeight={600} noWrap>
                    {property.place_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                    {property.details.location.city}, {property.details.location.country}
                </Typography>
                <Grid container justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight={600}>
                        ${property.price}/night
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <StarIcon fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                            {property.rating} ({property.num_reviews})
                        </Typography>
                    </Box>
                </Grid>
            </Box>

            {
                property.details.images.length > 1 && (
                    <>
                        <IconButton onClick={prev} sx={navButtonStyle("left")}>
                            <ChevronLeft />
                        </IconButton>
                        <IconButton onClick={next} sx={navButtonStyle("right")}>
                            <ChevronRight />
                        </IconButton>
                    </>
                )
            }
        </Card >
    );
};

const navButtonStyle = (side: "left" | "right") => ({
    position: "absolute",
    top: "50%",
    [side]: 12,
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 32,
    height: 32,
    "&:hover": {
        backgroundColor: "rgba(255,255,255,1)",
    },
});

export default MarkerPopup;
