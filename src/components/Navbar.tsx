import React from "react"
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    Paper,
    IconButton,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Rating,
} from "@mui/material"
import {
    Search as SearchIcon,
    Language as LanguageIcon,
    Menu as MenuIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder as FavoriteBorderIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material"
import { red } from "@mui/material/colors"
import { styled } from "@mui/material/styles"

import { Link } from "react-router-dom"

import SearchBar from "../components/SearchBar"

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    width: "90%",
    margin: "auto",
    backgroundColor: "white",
    boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
    color: "black",
}))

function Navbar() {
    return (
        <StyledAppBar position="static">
            <Toolbar sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                alignItems: "center",
            }}>

                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <Box display="flex" justifyContent="start" alignItems="center">
                        <Typography variant="h5" component="div" sx={{ color: "#FF385C", fontWeight: "bold", cursor: "pointer" }}>
                            PocketStay
                        </Typography>
                    </Box>
                </Link>

                <Box display="flex" justifyContent="center" alignItems="center">
                    <SearchBar />
                </Box>

                <Box display="flex" justifyContent="end" alignItems="center" >
                    <Button variant="text" sx={{ color: "black", textTransform: "none", fontWeight: 600 }}>
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

        </StyledAppBar>


    )
}

export default Navbar