import { Box, Card, Divider, Stack, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import GlobalContexts from "../context/global-contexts";
import TypoTitleForm from "../Custom/TypoTitleForm";
import ButtonAll from "../ui/ButtonAll";
import classes from "./Profile.module.css";

const BoxCSSDesktop = styled(Box)({
  display: "flex",
  textAlign: "left",
});
const BoxCSSMobile = styled(Box)({
  textAlign: "left",
});

const TypoTitleFormCSS = styled(TypoTitleForm)({
  width: "100px",
});

const TypoInfoCSS = styled(Typography)({
  flex: 3,
  padding: ".5rem",
});

const ProfileInfo = () => {
  const { userInfo, screenSize } = useContext(GlobalContexts);

  const formLine = (profilename, userData) => {
    if (screenSize <= 450) {
      return (
        <Fragment>
          <BoxCSSMobile>
            <TypoTitleFormCSS profilename={profilename} />
            <TypoInfoCSS>{userData}</TypoInfoCSS>
          </BoxCSSMobile>
          <Divider />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <BoxCSSDesktop>
            <TypoTitleFormCSS profilename={profilename} />
            <TypoInfoCSS>{userData}</TypoInfoCSS>
          </BoxCSSDesktop>
          <Divider />
        </Fragment>
      );
    }
  };
  // useEffect(() => {
  // if (screenSize <= 900) {
  //   formLine = (
  //     <Fragment>
  //       <BoxCSSMobile>
  //         <TypoTitleFormCSS profilename={profilename} />
  //         <TypoInfoCSS>{userData}</TypoInfoCSS>
  //       </BoxCSSMobile>
  //       <Divider />
  //     </Fragment>
  //   );
  //   } else {
  //     formLine = (
  //       <Fragment>
  //         <BoxCSSDesktop>
  //           <TypoTitleFormCSS profilename={"Name"} />
  //           <TypoInfoCSS>{userInfo.name}</TypoInfoCSS>
  //         </BoxCSSDesktop>
  //         <Divider />
  //       </Fragment>
  //     );
  //   }
  // }, [screenSize]);

  return (
    <section className={classes.profile}>
      <Card sx={{ width: "100%", p: "1rem 1rem 0 1rem" }}>
        <Typography
          variant="h4"
          sx={{ p: 3 }}
        >{`${userInfo.name}'s profile`}</Typography>

        <Stack>
          {formLine("Name", userInfo.name)}
          {formLine("Surname", userInfo.surname)}
          {formLine("Song", userInfo.song)}
        </Stack>
      </Card>
    </section>
  );
};

export default ProfileInfo;
