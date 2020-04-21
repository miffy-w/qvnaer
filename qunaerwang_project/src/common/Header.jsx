import React from 'react';
import './Header.css';

export default function Header(props) {
    const { goback, title } = props;
    return (
        <header className="header-wrapper">
            <div className="icon-back">
                <i className="iconfont" onClick={ goback }>&#xeb99;</i>
            </div>
            <h1 className="title">{ title }</h1>
        </header>
    )
}
