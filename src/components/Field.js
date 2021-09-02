import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MINE_ID } from '../constants/gameConstants';

function Field(props) {
  const { id, value, flipped, onClick } = props;

  function handleClick() {
    if (typeof onClick === 'function') {
      onClick(value, id);
    }
  }

  const renderFieldValue = useMemo(() => {
    if (flipped.includes(id)) {
      switch (value) {
        case MINE_ID:
          return <div className="board-cell--mine">💩</div>;

        default:
          return <div className="board-cell--point">{value}</div>;
      }
    }

    return null;
  }, [flipped, value, id]);

  return (
    <div className="board-cell" data-value={value} onClick={handleClick}>
      {renderFieldValue}
    </div>
  );
}

Field.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flipped: PropTypes.array,
};

export default Field;
