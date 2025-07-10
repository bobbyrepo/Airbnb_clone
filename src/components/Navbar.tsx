import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Paper,
} from "@mui/material"
import {
    ContentCopy,
    Language as LanguageIcon,
    Menu as MenuIcon,
    // Favorite as FavoriteIcon,
    // FavoriteBorder as FavoriteBorderIcon,
    // ChevronRight as ChevronRightIcon,
} from "@mui/icons-material"
import SearchIcon from "@mui/icons-material/Search";

import { styled } from "@mui/material/styles"

import { Link } from "react-router-dom"

import SearchBar from "../components/SearchBar"

// const StyledAppBar = styled(AppBar)(() => ({
//     width: "90%",
//     margin: "auto",
//     backgroundColor: "white",
//     boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
//     color: "black",
// }))

function Navbar() {
    return (
        <Box position="static"
            sx={{
                width: { xs: "96%", md: "90%" },
                margin: "auto",
                backgroundColor: "white",
                boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
                color: "black",
            }} >
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 3
            }}>

                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <Box display="flex" justifyContent="start" alignItems="center">
                        {/* Full Logo for md and up */}
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                color: "#FF385C",
                                fontWeight: "bold",
                                cursor: "pointer",
                                display: { xs: "none", md: "block" },
                            }}
                        >
                            PocketStay
                        </Typography>

                        {/* Short Logo for smaller screens */}
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                color: "#FF385C",
                                fontWeight: "bold",
                                cursor: "pointer",
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            PS
                        </Typography>
                    </Box>
                </Link>

                <Box width={"60%"} display="flex" justifyContent="center" alignItems="center">
                    <SearchBar />
                </Box>

                <Box display="flex" justifyContent="end" alignItems="center" >
                    <Button
                        variant="text"
                        sx={{
                            color: "black",
                            textTransform: "none",
                            fontWeight: 600,
                            display: { xs: "none", lg: "block" },
                        }}
                    >
                        Become a host
                    </Button>
                    <IconButton>
                        <LanguageIcon />
                    </IconButton>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>

        </Box>


    )
}

export default Navbar