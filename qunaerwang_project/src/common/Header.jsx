import React, { memo } from 'react';
import './Header.css';

const Header = memo((props) => {
    const { goback, title } = props;
    return (
        <header className="header-wrapper">
            <div className="icon-back">
                <i className="iconfont" onClick={ goback }>&#xeb99;</i>
            </div>
            <h1 className="title">{ title }</h1>
        </header>
    )
});

export default Header;