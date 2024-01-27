import PropTypes from "prop-types";

const Tag = ({ backgroundColor, children }) => {
  return (
    <div className="p-1 rounded-sm" style={{ background: backgroundColor }}>
      <p className=" text-white text-[7px] leading-none">{children}</p>
    </div>
  );
};

Tag.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tag;
