import React, { useState } from "react";
import { Box, Typography, Card, Button, TextField, Divider, Collapse } from "@mui/material";
// import Calendar from "../../Modals/CalendarSelector";
import { styled } from "@mui/material/styles";
import { type Range, type RangeKeyDict } from "react-date-range";
import { getNumberOfNights, getTotalGuests, normalizeDateRange } from "../../utils/helper";

import { Link } from "react-router-dom";
import CalendarSelector from "../../Modals/CalendarSelector";
import { format } from "date-fns";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import GuestCounter from "../../Modals/GuestCounter";
import Calendar from "../../Modals/Calender";

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

const SectionLabel = styled(Typography)({
    fontSize: "10px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px",
    color: "#222",
})

const GuestsContainer = styled(Box)({
    cursor: "pointer",
    // border: "1px solid #ddd",
    // borderRadius: "8px",
    "&:hover": {
        "& .MuiBox-root": {
            borderColor: "#222",
        },
    },
})

const GuestsHeader = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 14px",
    marginBottom: "14px"
})

interface GuestCount {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

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

    const [guestsOpen, setGuestsOpen] = useState<boolean>(false)
    const [guestCount, setGuestCount] = useState<GuestCount>({ adults: 0, children: 0, infants: 0, pets: 0 });
    const [showCalendar, setShowCalendar] = useState<boolean>(false);



    const handleGuestsToggle = () => {
        setGuestsOpen(!guestsOpen)
    }

    const handleGuestCountChange = (key: keyof GuestCount, delta: number) => {
        setGuestCount((prev) => ({
            ...prev,
            [key]: Math.max(0, prev[key] + delta),
        }));
    };

    const handleDateChange = (value: RangeKeyDict) => {
        setDateRange(value.selection);

    };

    const checkIn: string = dateRange?.startDate
        ? format(new Date(dateRange.startDate), "dd/MM/yyyy")
        : "Add date";

    const checkOut: string = dateRange?.endDate
        ? format(new Date(dateRange.endDate), "dd/MM/yyyy")
        : "Add date";

    return (
        <Card sx={{
            borderRadius: 2,
            boxShadow: "0 6px 16px rgba(0,0,0,0.12)"
        }}>
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 3, flexWrap: "wrap" }}>
                    <Typography variant="h5" fontWeight={600} sx={{
                        fontSize: {
                            xs: "20px",
                            sm: "23px",
                            md: "24px",
                        }, textDecoration: "underline"
                    }}>
                        ${totalPrice}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {totalNights > 1
                            ? `total for ${totalNights} nights`
                            : "per night"}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 600,
                        bgcolor: "background.paper",
                        // border: "1px solid #ddd",
                        borderRadius: 2,
                        mb: 3,
                    }}
                >
                    <Box sx={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", cursor: "pointer" }}                    >
                        {/* Check-in and Check-out */}
                        <Box sx={{ display: "flex", maxWidth: "350px" }}
                            onClick={() => setShowCalendar((prev) => !prev)}
                        >
                            <Box sx={{ flex: 1, borderRight: "1px solid #ddd" }}>
                                <Box sx={{ padding: "8px 14px 0px 18px " }}>
                                    <SectionLabel>CHECK-IN</SectionLabel>
                                </Box>
                                <Box
                                    sx={{
                                        px: 2,
                                        mb: 1,
                                        fontSize: {
                                            xs: 14,
                                            sm: 15,
                                            md: 16,
                                        },
                                        fontWeight: 500,
                                        color: checkOut ? "text.primary" : "text.secondary",
                                    }}
                                >
                                    {checkIn}
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ padding: "8px 14px 0px 18px " }}>
                                    <SectionLabel>CHECKOUT</SectionLabel>
                                </Box>
                                <Box
                                    sx={{
                                        px: 2,
                                        mb: 1,
                                        fontSize: {
                                            xs: 14,
                                            sm: 15,
                                            md: 16,
                                        },
                                        fontWeight: 500,
                                        color: checkOut ? "text.primary" : "text.secondary",
                                    }}
                                >
                                    {checkOut}
                                </Box>
                            </Box>
                        </Box>

                        {showCalendar && (
                            <Calendar
                                value={dateRange}
                                onChange={(range) => {
                                    handleDateChange(range);
                                    if (range.selection.startDate != range.selection.endDate) {
                                        setShowCalendar(false); // Only hide when both dates are selected
                                    }
                                }}
                            />
                        )}

                        <Divider />

                        <GuestsContainer
                            onClick={handleGuestsToggle}
                        >
                            <Box sx={{ padding: "8px 14px 0px 18px " }}>
                                <SectionLabel>GUESTS</SectionLabel>
                            </Box>
                            <GuestsHeader>
                                <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                                    {getTotalGuests(guestCount)} guest{getTotalGuests(guestCount) !== 1 ? "s" : ""}
                                </Typography>
                                {guestsOpen ? <ExpandLess /> : <ExpandMore />}
                            </GuestsHeader>
                        </GuestsContainer>

                        <Collapse in={guestsOpen} sx={{
                            px: {
                                xs: 2,
                                sm: 3,
                                md: 4,
                            }
                        }}>
                            <GuestCounter guestCount={guestCount} onChange={handleGuestCountChange} />
                        </Collapse>
                    </Box>

                </Box>

                <Link to={`/booking_request/${id}`}
                    state={{ dateRange, guestLabel: getTotalGuests(guestCount) }}
                >
                    <ReserveButton fullWidth size="large">Reserve</ReserveButton>
                </Link>

                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{
                    mt: 2,
                    fontSize: {
                        xs: 14,
                        md: 15,
                    }
                }}>
                    You won't be charged yet
                </Typography>
            </Box>
        </Card >
    );
}

export default BookingWidget;
