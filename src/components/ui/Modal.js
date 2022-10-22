import classes from "./ui.module.css";

const NewsModal = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

export default NewsModal;
