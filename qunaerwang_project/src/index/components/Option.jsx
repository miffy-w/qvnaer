import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/Option.css';

export default function Option(props) {
    const { searchType, handleSearchType } = props;
    return (
        <div className="optionWrapper">
            <label>
                <input 
                    name="searchType"
                    onChange={() => handleSearchType(!searchType)}
                    checked={searchType} type="checkbox"
                    value={searchType}
                />
                只看高铁/动车
            </label>
        </div>
    )
}

Option.propTypes = {
    searchType: PropTypes.bool.isRequired,
    handleSearchType: PropTypes.func.isRequired,
}
