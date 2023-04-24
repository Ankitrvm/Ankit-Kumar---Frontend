import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ fetchData }) => {
  return (
    <TextField
      id="search"
      type="search"
      label="Search"
      onChange={(e) => {
        fetchData(e.target.value);
      }}
      sx={{ width: "100%" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
