import React from "react";
import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import "../App.css";


const DropDown = ({ overlay, title, ...rest }) => {

    return (
        <Dropdown overlay={overlay} trigger="click" {...rest} overlayClassName = "dropDown">
            <Button size="large" className={`buttonPrimary suggestionButton`} >
                {title} <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default DropDown;
