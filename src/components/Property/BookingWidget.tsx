import React from "react";
import { Box, Typography, Card, Button } from "@mui/material";
// import Calendar from "../../Modals/CalendarSelector";
import { styled } from "@mui/material/styles";
import { type Range } from "react-date-range";
import { getNumberOfNights, normalizeDateRange } from "../../utils/helper";

import { Link } from "react-router-dom";
import CalendarSelector from "../../Modals/CalendarSelector";

const ReserveButton = styled(Button)({
    backgroundColor: "#FF385C",
    color: "white",
    borderRadius: "8px",
    padding: "14px",
    fontWeight: 600,
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#E31C5F",
    },
});



interface Props {
    id: number,
    price: number;
    guestLabel: string;
    dateRange: Range;
    setDateRange: (range: Range) => void;
}

const BookingWidget: React.FC<Props> = ({ id, price, guestLabel, dateRange, setDateRange }) => {

    const nightsCount = getNumberOfNights(dateRange)?.slice(0, 1);
    const totalNights = nightsCount ? parseInt(nightsCount) : 0;
    const totalPrice = totalNights > 1 ? totalNights * price : price;

    const handleChange = (value: Range) => {
        const normalized = normalizeDateRange(value);
        setDateRange(normalized);
    };

    return (
        <Card sx={{
            borderRadius: 2,
            boxShadow: "0 6px 16px rgba(0,0,0,0.12)"
        }}>
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 3, flexWrap: "wrap" }}>
                    <Typography variant="h5" fontWeight={600}>
                        ${totalPrice}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {totalNights > 1
                            ? `total for ${totalNights} nights`
                            : "per night"} for
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                        {guestLabel} Guest{guestLabel !== "1" ? "s" : ""}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 600,
                        bgcolor: "background.paper",
                        // border: "1px solid #ddd",
                        borderRadius: 2,
                        p: 3,
                        mb: 3,
                    }}
                >
                    {/* <CalendarSelector setDateRange={setDateRange} value={dateRange} onChange={handleChange} /> */}
                </Box>

                <Link to={`/booking_request/${id}`}
                    state={{ dateRange, guestLabel }}
                >
                    <ReserveButton fullWidth size="large">Reserve</ReserveButton>
                </Link>

                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
                    You won't be charged yet
                </Typography>
            </Box>
        </Card>
    );
}

export default BookingWidget;
