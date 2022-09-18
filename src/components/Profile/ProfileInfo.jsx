import { Box, Card, Divider, Stack, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import GlobalContexts from "../context/global-contexts";
import TypoTitleForm from "../Custom/TypoTitleForm";
import classes from "./Profile.module.css";

const BoxCSS = styled(Box)({
  display: "flex",
  textAlign: "left",
  alignContent: "flex-end",
});

const TypoInfoCSS = styled(Typography)({
  flex: 3,
  padding: ".5rem",
});

const ProfileInfo = () => {
  const { userInfo } = useContext(GlobalContexts);

  return (
    <section className={classes.profile}>
      <Card sx={{ width: "100%" }}>
        <Typography
          variant="h4"
          sx={{ p: 3 }}
        >{`${userInfo.name}'s profile`}</Typography>

        <Stack>
          <BoxCSS>
            <TypoTitleForm profilename={"Name"} />
            <TypoInfoCSS>{userInfo.name}</TypoInfoCSS>
          </BoxCSS>
          <Divider />

          <BoxCSS>
            <TypoTitleForm profilename={"Surname"} />
            <TypoInfoCSS>{userInfo.surname}</TypoInfoCSS>
          </BoxCSS>
          <Divider />
          <BoxCSS>
            <TypoTitleForm profilename={`${userInfo.name}'s Song"}`} />
            <TypoInfoCSS>{userInfo.song}</TypoInfoCSS>
          </BoxCSS>
          <Divider />
        </Stack>

        <NavLink to="/profileedit">
          <button>Edit</button>
        </NavLink>
      </Card>
    </section>
  );
};

export default ProfileInfo;
