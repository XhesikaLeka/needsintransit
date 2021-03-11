import React from "react";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import { Drawer, Grid } from "antd";
import '../App.css'

const { useBreakpoint } = Grid;

const Drawer1 = ({ visible, onClose, placement, mask, children, width }) => {
  const screens = useBreakpoint()
  const size = Object.entries(screens)
    .filter(screen => !!screen[1])
    .map(screen => screen[0])

  return (
    <Drawer
      placement={placement}
      closable={false}
      onClose={onClose}
      visible={visible}
      mask={mask}
      width={size[0] ==='xs' ? '100%' : 370}
      bodyStyle={{
        backgroundColor: 'transparent',
        background: "linear-gradient(to right bottom, #268f98, #3b9ea1, #4fada9, #62bcb2, #76cbba)"
        // background: "linear-gradient(to left bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1))"
      }}
    >
      {children}
    </Drawer>
  );
};
Drawer1.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  placement: PropTypes.string,
};
Drawer1.defaultProps = {
  placement: "right",
  mask: false,
};

export default Drawer1;
