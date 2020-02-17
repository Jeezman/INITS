import { createAction } from '@reduxjs/toolkit';

const SAVE_LISTING = 'SAVE_LISTING';
const DELETE_LISTING = 'DELETE_LISTING';

const INITIAL_STATE = {
  listing: [
    {
      id: 1,
      name: 'Kelwarams Plc',
      desc: 'Alba Plastic Surgery and med spa',
      phone: '08069561146',
      email: 'kew@kw.ng',
      website: 'kw.com.ng',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmpEPzi5pBBJ3RK5pP7x4hgAepzADMLHXcUFcrb3_HH_DriUhf',
      category: 'Approved'
    },
    {
      id: 2,
      name: 'Johnson and Johnson',
      desc: 'Cosmetic agency',
      phone: '08069561146',
      email: 'kew@jnj.ng',
      website: 'kw.com.ng',
      image:
        'https://pbs.twimg.com/profile_images/1101560913885315074/9KHsZD7M_400x400.png',
      category: 'Approved'
    }
  ]
};

export const saveListing = createAction(SAVE_LISTING);
export const deleteListing = createAction(DELETE_LISTING);

export default (state = INITIAL_STATE, action) => {
  if (action.type === SAVE_LISTING) {
    const { locations } = action.payload;

    return {
      ...state,
      locations: locations
    };
  }

  if (action.type === DELETE_LISTING) {
    return {
      ...state,
      locations: []
    };
  }
  return state;
};
