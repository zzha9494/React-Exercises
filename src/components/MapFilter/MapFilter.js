import React from 'react';
import './MapFilter.scss';
import { Button, SvgIcon, LinearProgress } from '@mui/material';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping.svg';

function MapFilter() {
  return (
    <div className="mapFilterWrapper">
      <div className="filterTitle">Filter</div>
      <div className="categoryWrapper">
        <div className="categoryLabel">Category</div>
        <div className="categories">
          <div className="categoryItems" style={{ backgroundColor: '#69a273' }}>
            <SvgIcon
              component={ShoppingIcon}
              inheritViewBox
              sx={{ color: '#fff', fontSize: '18px' }}
            />
            <span>Food</span>
          </div>
          <div className="categoryItems" style={{ backgroundColor: '#e4352c' }}>
            <SvgIcon
              component={ShoppingIcon}
              inheritViewBox
              sx={{ color: '#fff', fontSize: '18px' }}
            />
            <span>Food</span>
          </div>
          <div className="categoryItems" style={{ backgroundColor: '#0057fd' }}>
            <SvgIcon
              component={ShoppingIcon}
              inheritViewBox
              sx={{ color: '#fff', fontSize: '18px' }}
            />
            <span>Food</span>
          </div>
        </div>
        <div className="categoryLabel">Category</div>
        <div className="categories">
          <div className="categoryItems" style={{ backgroundColor: '#727272' }}>
            <SvgIcon
              component={ShoppingIcon}
              inheritViewBox
              sx={{ color: '#fff', fontSize: '18px' }}
            />
            <span>Food</span>
          </div>
          <div className="categoryItems" style={{ backgroundColor: '#49bfd9' }}>
            <SvgIcon
              component={ShoppingIcon}
              inheritViewBox
              sx={{ color: '#fff', fontSize: '18px' }}
            />
            <span>Food</span>
          </div>
        </div>
      </div>
      <div className="distanceWrapper">
        <div className="distanceLabel">Distance</div>
        <LinearProgress
          variant="determinate"
          value={5}
          sx={{
            width: '240px',
            height: '8px',
            marginTop: '8px',
            borderRadius: '4px',
            marginBottom: '20px',
            marginLeft: '8px',
          }}
        />
        <div className="distanceLabel">Distance</div>
        <LinearProgress
          variant="determinate"
          value={5}
          sx={{
            width: '240px',
            height: '8px',
            marginTop: '8px',
            borderRadius: '4px',
            marginLeft: '8px',
          }}
        />
      </div>
      <div className="btnWrapper">
        <Button
          variant="contained"
          sx={{ textTransform: 'none' }}
          startIcon={
            <SvgIcon
              component={ShoppingIcon}
              inheritViewBox
              sx={{ color: '#fff' }}
            />
          }
        >
          Show all (34) items
        </Button>
      </div>
    </div>
  );
}

export default MapFilter;
