import { createAction } from '@reduxjs/toolkit';

const ADD_LISTING = 'ADD_LISTING';
const DELETE_LISTING = 'DELETE_LISTING';
const UPDATE_LISTING = 'UPDATE_LISTING';
const SEARCH_LISTING = 'SEARCH_LISTING';
const CLEAR_SEARCH_LISTING = 'CLEAR_SEARCH_LISTING';

const INITIAL_STATE = {
  listing: [
    {
      id: 1,
      name: 'Kelwarams Plc',
      desc: 'Best in automobile services',
      phone: '08069561146',
      email: 'kew@kw.ng',
      website: 'kw.com.ng',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmpEPzi5pBBJ3RK5pP7x4hgAepzADMLHXcUFcrb3_HH_DriUhf',
      category: ['FMCG', 'Automobile']
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
      category: ['Finance', 'Pharma']
    }
  ],
  isSearching: false,
  searchedListing: []
};

export const addListing = createAction(ADD_LISTING);
export const deleteListing = createAction(DELETE_LISTING);
export const updateListing = createAction(UPDATE_LISTING);
export const searchListing = createAction(SEARCH_LISTING);
export const clearSearchListing = createAction(CLEAR_SEARCH_LISTING);

export default (state = INITIAL_STATE, action) => {
  if (action.type === ADD_LISTING) {
    const { locations } = action.payload;

    return {
      ...state,
      listing: state.listing.concat(action.payload)
    };
  }

  if (action.type === UPDATE_LISTING) {
    let _listing = state.listing;
    const { id } = action.payload;
    const idIndex = _listing.findIndex(listing => listing.id === id);
    _listing[idIndex] = action.payload;

    return {
      ...state,
      listing: [...(state.listing = _listing)]
    };
  }

  if (action.type === DELETE_LISTING) {
    return {
      ...state,
      listing: state.listing.filter(
        (listing, index) => listing.id !== action.payload
      )
    };
  }

  if (action.type === SEARCH_LISTING) {
    let searchTerm = action.payload;
    let listing = state.listing;
    let updatedListing = listing.filter(
      value =>
        value.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1 ||
        value.desc.toLowerCase().search(searchTerm.toLowerCase()) !== -1
    );
    return {
      ...state,
      isSearching: true,
      searchedListing: updatedListing
    };
  }

  if (action.type === CLEAR_SEARCH_LISTING) {
    return {
      ...state,
      isSearching: false,
      searchedListing: []
    };
  }
  return state;
};
