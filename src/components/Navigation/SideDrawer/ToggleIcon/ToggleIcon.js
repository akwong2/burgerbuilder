import React from 'react';
import classes from './ToggleIcon.css';

const toggleIcon = ( props ) => (
    <div onClick={props.clicked} className={classes.ToggleIcon}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default toggleIcon;