import React from "react";
import { useContext } from "react";
import GlobalContexts from "./context/global-contexts";
import NewsSlideItemCard from "./Homepage/NewsSlideItemCard";
import BoxPages from "./ui/BoxPages";

const ArticlesPage = () => {
  const { recentNewsArray } = useContext(GlobalContexts);

  return (
    <BoxPages sx={{ display: "flex" }}>
      <div className="articlesPage">
        {recentNewsArray && <NewsSlideItemCard />}
      </div>
    </BoxPages>
  );
};

export default ArticlesPage;
