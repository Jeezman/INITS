import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import ListCard from '../components/ListCard';
import styled from 'styled-components/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { searchListing, clearSearchListing } from '../reducer/listingReducer';

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const { listing, isSearching, searchedListing } = useSelector(
    state => state.listing
  );
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    return () => dispatch(clearSearchListing());
  }, [listing]);

  const handleSearch = text => {
    setSearchTerm(text);
    let _searchTerm = searchTerm.trim();
    if (_searchTerm.length > 0) {
      dispatch(searchListing(text));
    } else {
      dispatch(clearSearchListing());
    }
  };
  let _listings = isSearching ? searchedListing : listing;
  return (
    <SafeAreaView style={{ backgroundColor: '#F1F3FA', marginTop: 24 }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
        <SearchContainer>
          <SearchIconWrapper>
            <Feather name="search" style={{ color: '#7FB78C' }} size={18} />
          </SearchIconWrapper>
          <SearchInputWrapper>
            <SearchInput
              underlineColorAndroid="transparent"
              placeholder="Search Name or Description"
              selectionColor="#7FB78C"
              placeholderTextColor="#7FB78C"
              onChangeText={text => handleSearch(text)}
            />
          </SearchInputWrapper>
        </SearchContainer>
        {_listings.map((listing, index) => (
          <ListCard
            id={listing.id}
            key={index}
            name={listing.name}
            desc={listing.desc}
            phone={listing.phone}
            email={listing.email}
            website={listing.website}
            image={listing.image}
            category={listing.category}
            showMore={true}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const SearchContainer = styled.View`
  background-color: rgba(0, 1, 37, 0.04);
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const SearchIconWrapper = styled.TouchableOpacity`
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 18px;
  padding-right: 12px;
`;

const SearchInputWrapper = styled.View`
  flex: 1;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 20px;
  font-family: 'space-mono';
`;
