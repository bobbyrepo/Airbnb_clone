import { useState, } from "react";
import {
    Box, Button, Typography, IconButton, Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

import { Link } from "react-router-dom";

import { type Range } from "react-date-range";

import LocationSelector from "../Modals/LocationSelector";
import Calendar from "../Modals/CalendarSelector";
import GuestSelector from "../Modals/GuestSelector";

import { getNumberOfNights, getTotalGuests, normalizeDateRange } from "../utils/helper";
import CalendarSelector from "../Modals/CalendarSelector";

interface GuestCount {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

export const DEFAULT_DATE_RANGE: Range = {
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // +1 day
    key: "selection",
};

const StyledButton = styled(Button)(() => ({
    border: "1px solid #e0e0e0",
    borderRadius: "999px",
    padding: "8px 8px",
    width: "100%",
    justifyContent: "space-between",
    boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
    "&:hover": {
        boxShadow: "0 1px 6px rgba(0,0,0,.3)",
        backgroundColor: "white",
    },
}));

const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    bgcolor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1300, // same as Dialog
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const steps: string[] = ["Location", "Dates", "Guests"];

const SearchBar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [location, setLocation] = useState<string>("");
    const [guestCount, setGuestCount] = useState<GuestCount>({ adults: 0, children: 0, infants: 0, pets: 0 });

    const [dateRange, setDateRange] = useState<Range | null>(null);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleChange = (value: Range) => {
        const normalized = normalizeDateRange(value);
        setDateRange(normalized);
    };

    const resetFields = () => {
        setLocation("");
        setGuestCount({ adults: 0, children: 0, infants: 0, pets: 0 });
        setDateRange(null);
    }

    // const summary = formatGuestSummary(guestCount);
    // console.log(parseInt(summary))

    return (
        <Box width={"100%"}>
            <Paper elevation={0} sx={{ borderRadius: 999 }}>
                <StyledButton onClick={() => setOpen(true)}
                    sx={{
                        width: "fit-content", mx: "auto",
                        display: { xs: "none", sm: "flex" },
                    }}>
                    <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ px: 2 }}>
                        {(location || "Anywhere").slice(0, 10)}
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        color="text.primary"
                        sx={{
                            px: 2,
                            borderLeft: "2px solid #e0e0e0",
                            borderRight: "2px solid #e0e0e0",
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        {dateRange ? getNumberOfNights(dateRange) : "Any week"}
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ px: 2 }}>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            color="text.primary"
                            sx={{ display: { xs: "none", sm: "block" } }}
                        >
                            {getTotalGuests(guestCount) > 0
                                ? `${getTotalGuests(guestCount)} guest${getTotalGuests(guestCount) > 1 ? "s" : ""}`
                                : "Add Guests"}
                        </Typography>
                    </Box>
                    <IconButton size="small" sx={{ backgroundColor: "error.main", color: "white" }}>
                        <SearchIcon fontSize="small" />
                    </IconButton>
                </StyledButton>

                <StyledButton onClick={() => setOpen(true)}
                    sx={{
                        width: "100%",
                        display: { xs: "flex", sm: "none" },
                    }}>
                    <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ px: 2 }}>
                        Search
                    </Typography>
                    <IconButton size="small" sx={{ backgroundColor: "error.main", color: "white" }}>
                        <SearchIcon sx={{
                            fontSize: {
                                xs: "1.15rem",
                                sm: "1.25rem"
                            },
                        }} />
                    </IconButton>
                </StyledButton>
            </Paper >

            {open && (
                <Box
                    sx={modalStyle}
                    onClick={() => setOpen(false)} // optional: close on backdrop click
                >
                    <Box
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                        sx={{
                            width: "100%",
                            maxWidth: 600, // same as maxWidth="sm"
                            bgcolor: "background.paper",
                            borderRadius: 10,
                            boxShadow: 24,
                            py: 3,
                            px: {
                                xs: 3,
                                sm: 5,
                                md: 7
                            },
                            mx: 3,
                        }}
                    >
                        {/* <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper> */}

                        <Box mt={2}>

                            {activeStep === 0 && <LocationSelector location={location} setLocation={setLocation} />}

                            {activeStep === 1 && (
                                <CalendarSelector
                                    heading1={"When do you plan to go?"}
                                    heading2={"Make sure everyone is free!"}
                                    align="center"
                                    value={dateRange ?? DEFAULT_DATE_RANGE}
                                    setDateRange={setDateRange}
                                    onChange={handleChange}
                                />
                            )}

                            {activeStep === 2 && (
                                <GuestSelector guestCount={guestCount} setGuestCount={setGuestCount} />
                            )}
                        </Box>

                        <Box mt={2} display="flex" justifyContent="space-between">
                            <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                            {activeStep < steps.length - 1 ? (
                                <Button
                                    onClick={handleNext}
                                    variant="contained"
                                    disabled={
                                        (activeStep === 0 && !location) ||                       // Step 0: Location must be selected
                                        (activeStep === 1 && (!dateRange?.startDate || !dateRange?.endDate))
                                    }
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button disabled={getTotalGuests(guestCount) === 0} variant="contained">
                                    <Link to={"/search"}
                                        state={{ location, guestCount: getTotalGuests(guestCount) }}
                                        style={{ color: "white", textDecoration: "none" }}
                                        onClick={() => {
                                            resetFields();
                                            setOpen(false);
                                        }}                                    >
                                        Search
                                    </Link>
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            )
            }
        </Box>
    );
};

export default SearchBar;