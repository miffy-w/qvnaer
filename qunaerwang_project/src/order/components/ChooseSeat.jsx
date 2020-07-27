import React, { memo, useMemo } from 'react';
import PropTypes from "prop-types";
import '../CSS/ChooseSeat.scss';

const leftSeats = ['A', 'B', 'C'];
const rightSeats = ['D', 'F'];

const Seat = memo((props) => {
    const { seatType, members, updateMember } = props;
    return (
        <div>
            {
                members.map(member => (
                    <div key={member.id} 
                        className={ member.seat === seatType ? "active seat" : "seat" }
                        onClick={() => { updateMember(member.id, { seat: seatType }) }}
                    >
                        { seatType }
                    </div>
                ))
            }
        </div>
    );
});

Seat.propTypes = {
    seatType: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired,
    updateMember: PropTypes.func.isRequired,
};


const ChooseSeat = memo((props) => {
    const { updateMember, members } = props;

    const getChckedSeatNum = useMemo(() => {
        const result = members.filter(item => !!item.seat);
        return result.length;
    },[members]);

    return (
        <div className="online-seat-wrapper">
            <p className="title">
                <span className="left-title">在线选座</span>
                <span className="right-num">
                    <span className={ getChckedSeatNum ? "highColor" : "" }>{ getChckedSeatNum }</span>
                /{ members.length }</span>
            </p>

            <div className="wrapper">
                <div className="window">窗</div>

                <div className="left-seat">
                    <div className="wrapper">
                        {
                            leftSeats.map(item => 
                                <Seat key={item} members={members}
                                    updateMember={updateMember}
                                    seatType={item}
                                />
                            )
                        }
                    </div>
                </div>

                <div className="aisle">过道</div>

                <div className="right-seat">
                    <div className="wrapper">
                        {
                            rightSeats.map(item => 
                                <Seat key={item} members={members}
                                    updateMember={updateMember}
                                    seatType={item}
                                />
                            )
                        }
                    </div>
                </div>

                <div className="window">窗</div>
            </div>
        </div>
    )
})

ChooseSeat.propTypes = {
    members: PropTypes.array.isRequired,
    updateMember: PropTypes.func.isRequired,
};

export default ChooseSeat;