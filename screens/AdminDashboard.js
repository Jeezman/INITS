import React, { useState } from 'react';
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
import SelectBtn from '../components/SelectButton';
import ListCard from '../components/ListCard';
import { ButtonStyle, ButtonText } from './style';

const image = 'https://randomuser.me/api/portraits/women/16.jpg';

/**
 * 
- Name
- Description
- Phone Number
- Email
- Website Url
- Categories (one or more eg web, mobile, health, etc)
- Images (one or more images, https://placeimg.com/160/160/any)
 */

export default function AdminDashboard(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([
    {
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
      name: 'Johnson and Johnson',
      desc: 'Cosmetic agency',
      phone: '08069561146',
      email: 'kew@jnj.ng',
      website: 'kw.com.ng',
      image:
        'https://pbs.twimg.com/profile_images/1101560913885315074/9KHsZD7M_400x400.png',
      category: 'Approved'
    }
  ]);
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleAddListing = () => {
    setData(
      data.concat({
        name: businessName,
        phone,
        email,
        website,
        desc: description,
        image
      })
    );
    setModalVisible(!modalVisible);
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
            <HeaderImage source={{ uri: image }} />
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
                setModalVisible(true);
              }}
            />
          </View>
          <Section>
            <SectionTitle>Business Listings</SectionTitle>
            <Divider />
            {data.map((listing, index) => (
              <ListCard
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
              multiline={true}
              numberOfLines={6}
              onChangeText={text => setDescription(text)}
              placeholder="Description"
              value={description}
            />

            <ButtonStyle
              onPress={() => handleAddListing()}
              style={{ width: '100%', marginTop: 20 }}
            >
              <ButtonText>Save Listing</ButtonText>
            </ButtonStyle>
            {/* 
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableHighlight> */}
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
  margin-bottom: 56px;
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
