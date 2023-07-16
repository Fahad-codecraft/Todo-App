import { useState } from "react"
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery
} from "@mui/material"
import { Menu, Close } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state"
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween"
// import { AddBox } from "@mui/icons-material";



const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 650px)");

  const fullName = `${user.firstName} ${user.lastName}`;

  const ProfileCircle = ({ fullName }) => {
    const firstLetter = fullName.charAt(0).toUpperCase();

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "black",
          outline: "3px solid gray",
          transition: "outline-color 0.2s",
          cursor: "pointer",
          "&:hover": {
            outlineColor: "#ffffff",
          },
        }}
      >
        <Typography color="white" fontWeight="400" fontSize="20px">
          {firstLetter}
        </Typography>
      </Box>
    );
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor="#21212b">
      <FlexBetween>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#e52b64"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: "#e52b64",
              cursor: "pointer",
            },
          }}
        >
          Tsks
        </Typography>
        {/* <AddBox
          sx={{
            cursor: "pointer",
            backgroundColor: "purple",
          }}
        /> */}
      </FlexBetween>

      <Typography
        color="white"
        fontSize="2rem"
        fontFamily="Poppins, cursive"
      >
        Hello, <span style={{fontFamily: "Poppins, cursive"}}> {fullName.toUpperCase()}</span>
      </Typography>

      {/*Desktop Navbar*/}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <ProfileCircle fullName={fullName} />
          <Box onClick={() => dispatch(setLogout())} sx={{ cursor: "pointer" }}  >
            <Typography sx={{
              color: "white",
              "&:hover": {
                color: "gray"
              }
            }}>
              Log Out
            </Typography>
          </Box>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor="#25252e"
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/*Menu Items */}
          <FlexBetween>
            <FormControl variant="standard" value={fullName}>
              <ProfileCircle fullName={fullName} />

              <Select
                value={fullName}
                sx={{
                  display: "none",
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar;
