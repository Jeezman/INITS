import React, { useState, useEffect } from 'react';
import {
  Platform,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Modal
} from 'react-native';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import SelectBtn from '../components/SelectButton';
import ListCard from '../components/ListCard';
import { ButtonStyle, ButtonText } from './style';
import {
  addListing,
  deleteListing,
  updateListing
} from '../reducer/listingReducer';
const uuidv4 = require('uuid/v4');

const image = 'https://randomuser.me/api/portraits/women/16.jpg';

export default function AdminDashboard(props) {
  const dispatch = useDispatch();
  const { listing } = useSelector(state => state.listing);
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setID] = useState({});
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState('');
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    setID('');
    setBusinessName('');
    setPhone('');
    setEmail('');
    setWebsite('');
    setImage('');
    setCategory('');
    setDescription('');
  }, [listing]);

  const handleAddListing = () => {
    dispatch(
      addListing({
        id: uuidv4(),
        name: businessName,
        phone,
        email,
        website,
        category: category.split(','),
        desc: description,
        image
      })
    );
    setModalVisible(!modalVisible);
  };

  const handleUpdateListing = () => {
    dispatch(
      updateListing({
        id: id,
        name: businessName,
        phone,
        email,
        website,
        category: category.split(','),
        desc: description,
        image
      })
    );
    setModalVisible(!modalVisible);
  };

  const handleDeleteListing = id => {
    dispatch(deleteListing(id));
  };

  const handleEditListing = id => {
    setEdit(true);
    let _listing = listing;
    let filteredListing = _listing.filter((value, index) => value.id === id);
    let newListing = filteredListing[0];
    setID(newListing.id);
    setBusinessName(newListing.name);
    setPhone(newListing.phone);
    setEmail(newListing.email);
    setWebsite(newListing.website);
    setImage(newListing.image);
    setCategory(newListing.category.join(','));
    setDescription(newListing.desc);

    setModalVisible(!modalVisible);
  };

  const handleSetCategory = value => {
    setCategory(value);
  };

  props.navigation.setOptions({
    header: () => null
  });
  return (
    <SafeAreaView style={{ backgroundColor: '#F1F3FA' }}>
      <StatusBar backgroundColor="#f1f3fa" barStyle="dark-content" />
      <Container>
        <Header>
          <HeaderTitle>Hello, Admin</HeaderTitle>
          <HeaderImageCover>
            <HeaderImage
              source={{
                uri: 'https://randomuser.me/api/portraits/women/16.jpg'
              }}
            />
          </HeaderImageCover>
        </Header>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 40 }}>
            <SelectBtn
              title="Add Biz Listing"
              value="Name, Desc, Email, Phone"
              emoji="📇"
              onPress={() => {
                setEdit(false);
                setModalVisible(true);
                setID('');
                setBusinessName('');
                setPhone('');
                setEmail('');
                setWebsite('');
                setImage('');
                setCategory('');
                setDescription('');
              }}
            />
          </View>
          <Section>
            <SectionTitle>Business Listings</SectionTitle>
            <Divider />
            {listing.length > 0 ? (
              listing.map((listing, index) => (
                <ListCard
                  isDelete={handleDeleteListing}
                  edit={handleEditListing}
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
              ))
            ) : (
              <Text style={{ fontSize: 24, textAlign: 'center' }}>
                No listing - Please click above to add listing
              </Text>
            )}
          </Section>
        </ScrollView>
      </Container>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ marginTop: 22 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 32, fontFamily: 'space-mono' }}>
              Enter New Listing
            </Text>
            <TextInputStyle
              onChangeText={text => setBusinessName(text)}
              placeholder="Business Name"
              value={businessName}
            />
            <TextInputStyle
              onChangeText={text => setPhone(text)}
              placeholder="Phone Number"
              value={phone}
            />
            <TextInputStyle
              onChangeText={text => setEmail(text)}
              placeholder="Email"
              value={email}
            />
            <TextInputStyle
              onChangeText={text => setWebsite(text)}
              placeholder="Website"
              value={website}
            />
            <TextInputStyle
              onChangeText={text => setImage(text)}
              placeholder="Image url"
              value={image}
            />
            <TextInputStyle
              onChangeText={text => handleSetCategory(text)}
              placeholder="Category (separate with comma)"
              value={category}
            />
            <TextInputStyle
              multiline={true}
              numberOfLines={6}
              onChangeText={text => setDescription(text)}
              placeholder="Description"
              value={description}
            />

            <ButtonStyle
              onPress={() =>
                isEdit ? handleUpdateListing() : handleAddListing()
              }
              style={{ width: '100%', marginTop: 20 }}
            >
              <ButtonText>
                {isEdit ? 'Update Listing' : 'Save Listing'}
              </ButtonText>
            </ButtonStyle>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const heightPadding = Platform.OS == 'ios' ? 56 : 50;

const Container = styled.View`
  padding-top: ${heightPadding}px;
  background-color: #f1f3fa;
  min-height: ${Dimensions.get('screen').height - heightPadding}px;
  padding-left: 24px;
  padding-right: 24px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

const HeaderTitle = styled.Text`
  flex: 0.6;
  font-size: 20px;
  letter-spacing: 0.12px;
  color: rgba(0, 0, 17, 0.8);
  font-family: 'space-mono';
`;

const HeaderImageCover = styled.View`
  width: 58px;
  height: 58px;
  border-radius: 44px;
  overflow: hidden;
`;

const HeaderImage = styled.Image`
  height: null;
  width: null;
  flex: 1;
`;

const Section = styled.View`
  margin-bottom: 32px;
`;

const SectionTitle = styled.Text`
  color: rgba(0, 1, 37, 0.8);
  letter-spacing: 0.07px;
  font-size: 20px;
  line-height: 24px;
  font-family: 'space-mono';
`;

const Divider = styled.View`
  border-width: 1px;
  border-color: rgba(0, 2, 21, 0.06);
  margin-top: 12px;
  margin-bottom: 24px;
`;

const TextInputStyle = styled.TextInput`
  border: 0;
  border-bottom-width: 1px;
  height: 40px;
  border-bottom-color: #ddd;
  margin-bottom: 15px;
`;
