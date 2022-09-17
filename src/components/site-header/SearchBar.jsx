import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  height: "40%",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  width: "100%",
  marginLeft: theme.spacing(3),
  // width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(1),
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    backgroundColor: "var(--color1)",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    marginTop: 4,
    [theme.breakpoints.up("lg")]: {
      width: "25ch",
      "&:focus": {
        width: "30ch",
      },
    },
    [theme.breakpoints.down("lg")]: {
      width: "10ch",
      "&:focus": {
        width: "16ch",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "0",
      "&:focus": {
        width: "6ch",
      },
    },
  },
}));
const onSearchSubmit = () => {
  return;
};

export default function SearchBar() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onSubmit={onSearchSubmit}
      />
    </Search>
  );
}