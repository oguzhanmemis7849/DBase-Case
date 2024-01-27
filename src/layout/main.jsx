import PropTypes from "prop-types";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div id="layout">
      <div id="header">
        <Navbar />
      </div>
      <div id="content">{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
