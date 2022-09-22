import classes from "./News.module.css";

const NewsModal = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

export default NewsModal;
