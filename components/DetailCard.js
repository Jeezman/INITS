import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const DetailCard = ({ status, email, desc, phone, website, category }) => (
  <DetailCardStyle status={status}>
    <DetailCardHeaderWrap status={status}></DetailCardHeaderWrap>
    <DetailCardBody>
      <DetailItemWrap>
        <DetailItem>
          <DetailIcon style={{ elevation: 2 }}>
            <Feather style={{ color: '#8c8c8c' }} name="phone" size={14} />
          </DetailIcon>
          <DetailCardBodyText>{phone}</DetailCardBodyText>
        </DetailItem>
        <DetailItem>
          <DetailIcon style={{ elevation: 2 }}>
            <MaterialCommunityIcons
              style={{ color: '#8c8c8c' }}
              name="email"
              size={14}
            />
          </DetailIcon>
          <DetailCardBodyText>{email}</DetailCardBodyText>
        </DetailItem>
        <DetailItem>
          <DetailIcon style={{ elevation: 2 }}>
            <MaterialCommunityIcons
              style={{ color: '#8c8c8c' }}
              name="web"
              size={14}
            />
          </DetailIcon>
          <DetailCardBodyText>{website}</DetailCardBodyText>
        </DetailItem>
      </DetailItemWrap>
      <DetailCardBodyHeader>Categories</DetailCardBodyHeader>
      {category && (
        <View style={{ flexDirection: 'row' }}>
          <ListCardcategory style={{ elevation: 1 }} category={category}>
            {category}
          </ListCardcategory>
          <ListCardcategory style={{ elevation: 1 }} category={category}>
            {category}
          </ListCardcategory>
        </View>
      )}
    </DetailCardBody>
  </DetailCardStyle>
);

const DetailCardStyle = styled.View`
  border-radius: 12px;
  background: #fff;
`;

const DetailCardHeaderWrap = styled.View`
  flex-direction: row;
  background: #ddd;
`;

const DetailCardBody = styled.View`
  padding: 15px 10px;
`;

const DetailCardBodyHeader = styled.Text`
  font-size: 12px;
  color: #2c2c2c;
  font-family: 'space-mono';
  margin-bottom: 3px;
`;

const DetailItemWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  flex-wrap: wrap;
`;

const DetailItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 3px;
`;

const DetailIcon = styled.View`
  padding: 3px;
  border-radius: 5px;
  background: #eee;
  box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.2);
`;

const DetailCardBodyText = styled.Text`
  font-size: 12px;
  line-height: 17px;
  color: #8c8c8c;
  margin-left: 5px;
  font-family: 'space-mono';
`;

const ListCardcategory = styled.Text`
  overflow: hidden;
  border-radius: 12px;
  background: #eee;
  font-size: 10px;
  line-height: 14px;
  color: #2c2c2c;
  padding: 3px 5px;
  margin-right: 5px;
`;

export default DetailCard;
