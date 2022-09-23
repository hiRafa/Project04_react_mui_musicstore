import React, { useContext, Fragment } from "react";
import GlobalContexts from "../context/global-contexts";
import classes from "./News.module.css";
import NewsSlideItem from "./NewsSlideItem";

const NewsSlider = () => {
  const { currentIndex, setCurrentIndex, recentNewsArray } =
    useContext(GlobalContexts);

  // useEffect(() => {
  //   fetch(
  //     "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/news.json"
  //   ).then((response) => {
  //     response.json().then((responseData) => {
  //       // console.log(responseData);
  //       // firebase sends an object, we have to change it to array here
  //       const newsArray = [];
  //       for (const key in responseData) {
  //         newsArray.push({
  //           id: key,
  //           date: key,
  //           title: responseData[key].title,
  //           by: responseData[key].by,
  //           description: responseData[key].description,
  //           review: responseData[key].review,
  //         });
  //         console.log("number2");
  //       }
  //       setrecentNewsArray(newsArray);
  //       //setting the fetched data with useState
  //     });
  //   });
  // }, []);

  console.log(recentNewsArray);

  // const sliderCSS = {
  //   height: "100%",
  //   position: "relative",
  // };

  // const slideCSS = {
  //   width: "100%",
  //   height: "100%",
  //   borderRadius: "10px",
  //   backgroundPosition: "center",
  //   backgroundSize: "cover",
  //   backgroundImage: `url(${slides[currentIndex].url})`,
  // };

  const toPrevious = () => {
    const firstSlide = currentIndex === 0;
    const newIndex = firstSlide ? 5 - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const toNext = () => {
    const lastSlide = currentIndex === 5 - 1;
    const newIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Parent Fetches data and passes to child only if the data is fetched, thus avoiding problems when rendering the component
  // I was having problems, because the data can not be fetched before the component is rendered, cause that's how react works
  // So one way is to make the parent render all data and then when it gets to rendering the child, the data is ready
  return (
    <Fragment>
      <div
        className={`${classes.arrow_base} ${classes.arrow_left}`}
        onClick={toPrevious}
      >
        ←
      </div>

      <div
        className={classes.sliderContainer}
        // onClick={props.openModalHandler}
      >
        {/* This condition is really important, because the fetched data  'recentNewsArray' needs to be ready first before rendering the child */}
        {recentNewsArray && <NewsSlideItem />}
      </div>
      <div
        className={`${classes.arrow_base} ${classes.arrow_right}`}
        onClick={toNext}
      >
        →
      </div>
    </Fragment>
  );
};

export default NewsSlider;
