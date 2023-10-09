import React from 'react';
import Popover from '@mui/material/Popover';
import { SvgIcon } from '@mui/material';
import { ReactComponent as ClockIcon } from '../../assets/clock.svg';
import { ReactComponent as CloseIcon } from '../../assets/close-circle.svg';
import waterImg from '../../assets/water.jpg';
import './ItemPopup.scss';

function ItemPopup({ open, onClose, id }) {
  return (
    <Popover
      id={id}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
    >
      <div className="itemPopupWrapper">
        <div className="popupHeader">
          <div className="reminder">
            <SvgIcon
              component={ClockIcon}
              inheritViewBox
              sx={{ color: '#fff', fontSize: '18px' }}
            />
            <span>Expiring in 1 day</span>
          </div>
          <div className="closeIcon" onClick={onClose}>
            <SvgIcon
              component={CloseIcon}
              inheritViewBox
              sx={{ color: '#000', fontSize: '40px' }}
            />
          </div>
        </div>
        <div className="popupContent">
          <div className="itemImage">
            <img src={waterImg} alt="" />
          </div>
          <div className="itemInfo">
            <div className="itemLabel">Item name</div>
            <div className="itemDesc">AUSTRALIAN NATURAL SPRING WATER</div>
          </div>
          <div className="itemInfo">
            <div className="itemLabel">Quantity</div>
            <div className="itemDesc">1 BOX</div>
          </div>
          <div className="itemInfo">
            <div className="itemLabel">Location</div>
            <div className="itemDesc">201 Sample St</div>
          </div>
          <div className="itemInfo">
            <div className="itemLabel">Available</div>
            <div className="itemDesc">17:00 - 18:30 August 28</div>
          </div>
        </div>
      </div>
    </Popover>
  );
}

export default ItemPopup;
