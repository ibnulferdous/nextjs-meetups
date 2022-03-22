import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import Meta from "./Meta";

function Layout(props) {
  return (
    <>
      <Meta />
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
}

export default Layout;
