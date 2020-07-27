import React, { memo } from 'react';
import PropTypes from "prop-types";

const ContactPhone = memo((props) => {
    const { reservedPhone, setReservedPhone } = props;
    return (
        <form className="touchPhone">
            <span className="tip">联系手机</span>
            <input type="number" name="touchPhone" placeholder="通知出票是信息" 
                value={reservedPhone}
                onChange={(e) => setReservedPhone(e.target.value)}
            />
        </form>
    );
});

export default ContactPhone;

ContactPhone.propTypes = {
    reservedPhone: PropTypes.string.isRequired,
    setReservedPhone: PropTypes.func.isRequired,
};
