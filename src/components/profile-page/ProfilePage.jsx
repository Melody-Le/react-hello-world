import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AvatarComponent from "../avatar/Avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";

import { ProfileShowTabs } from "../profile-show-tabs/ProfileShowTabs";
import ProfileAboutPanel from "../profile-about-panel/ProfileAboutPanel";
import ProfileConnectionPanel from "../profile-connection-panel/ProfileConnectionPanel";
import ProfileMyProjectsPanel from "../profile-my-projects-panel/ProfileMyProjectsPanel";
import ProfileOtherProjectsPanel from "../profile-other-projects-panel/ProfileOtherProjectsPanel";
import Button from "../buttons/Button";

import "./ProfilePage.scss";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

const baseProfileAvatar =
  "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195_960_720.png";

function ProfilePage() {
  const params = useParams();
  const username = params.username;
  const { auth } = useContext(AuthContext);
  const authUserName = auth.username;
  const isAuth = authUserName === username;

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`/users/${username}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // toast(err.response.data.message);
      });
  }, [params.username]);
  // Logic for handling tabs
  useEffect(() => {
    if (profile) {
      setTabValue("1");
      return setPanel(<ProfileAboutPanel profile={profile} />);
    }
  }, [profile]);
  // const { facebook, github, twitter, linkedin } = profile?.socmed;
  // console.log(profile.socmed);
  const [tabValue, setTabValue] = useState("1");
  const [panel, setPanel] = useState(null);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
    switch (newTabValue) {
      case "1":
        setPanel(<ProfileAboutPanel profile={profile} />);
        break;
      case "2":
        setPanel(<ProfileConnectionPanel />);
        break;
      case "3":
        setPanel(<ProfileMyProjectsPanel />);
        break;
      case "4":
        setPanel(<ProfileOtherProjectsPanel />);
        break;
      default:
        setPanel(<ProfileAboutPanel profile={profile} />);
    }
  };

  return profile ? (
    <>
      <Container>
        <Box display={"flex"} marginTop={5}>
          <AvatarComponent
            imgAlt={profile.username}
            imgUrl={profile.profile_pic_url || baseProfileAvatar}
            sx={{ width: 128, height: 128, border: "solid 1px var(--color3)" }}
          />
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            marginLeft={5}
          >
            <Typography
              variant="h4"
              component="h4"
              sx={{ color: "var(--color3)", textTransform: "capitalize" }}
            >
              {profile.name}
            </Typography>
            <Typography sx={{ color: "var(--color4)" }}>
              {profile.tagline || "Hello world, this is my empty tagline"}
            </Typography>
            <Box>
              {/* BUG: can not go to this link  */}
              {profile?.socmed?.github && (
                <Link href={profile?.socmed?.github}>
                  <GitHubIcon
                    sx={{ marginY: 1, color: "var(--color4)" }}
                    fontSize={"large"}
                  />
                </Link>
              )}
              {profile?.socmed?.linkedin && (
                <Link href={profile?.socmed?.linkedin}>
                  <LinkedInIcon
                    sx={{ marginY: 1, color: "var(--color4)" }}
                    fontSize={"large"}
                  />
                </Link>
              )}

              {profile?.socmed?.twitter && (
                <Link href={profile?.socmed?.twitter}>
                  <TwitterIcon
                    sx={{ marginY: 1, color: "var(--color4)" }}
                    fontSize={"large"}
                  />
                </Link>
              )}

              {profile?.socmed?.facebook && (
                <Link href={profile?.socmed?.facebook}>
                  <FacebookIcon
                    sx={{ marginY: 1, color: "var(--color4)" }}
                    fontSize={"large"}
                  />
                </Link>
              )}
            </Box>
          </Box>
          <Box
            marginLeft="auto"
            // display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            sx={{ justifyContent: "flex-start", alignContent: "flex-end" }}
          >
            {username === authUserName && (
              <Link to={`/users/${authUserName}/edit`}>
                <EditIcon
                  sx={{
                    marginY: 1,
                    color: "var(--disable-color)",
                    "&:hover": {
                      color: "var(--color3a)",
                    },
                  }}
                  fontSize={"large"}
                />
              </Link>
            )}
            {username !== authUserName && (
              <Button
                category={"action"}
                title={"Follow"}
                variant={"outlined"}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            border: "solid 1px var(--color3)",
            backgroundColor: "var(--color2)",
          }}
          paddingX={4}
          paddingBottom={4}
          marginTop={4}
          id="panel-box"
        >
          <ProfileShowTabs
            tabValue={tabValue}
            handleTabChange={handleTabChange}
            isAuth={isAuth}
          />
          {profile ? panel : ""}
        </Box>
      </Container>
    </>
  ) : (
    ""
  );
}

export default ProfilePage;