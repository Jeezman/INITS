import React from 'react';
import styled from 'styled-components';
import { View, Animated, TouchableOpacity } from 'react-native';
import DetailCard from './DetailCard';
import RectImage from './RectImage';
import Swipeable from 'react-native-gesture-handler/Swipeable';

class ListCard extends React.Component {
  state = {
    bounceValue: new Animated.Value(65),
    showAppointment: true,
    istoggled: false
  };

  toggleCardView = () => {
    let initialValue = this.state.istoggled
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.istoggled
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState({
      istoggled: !this.state.istoggled
    });

    this.state.bounceValue.setValue(initialValue);

    Animated.spring(this.state.bounceValue, {
      toValue: finalValue,
      velocity: 3,
      bounciness: 2
    }).start();
  };

  _setMaxHeight = event => {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  };

  _setMinHeight = event => {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  };

  RightActions = dragX => {
    let { istoggled } = this.state;
    if (istoggled) return null;
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
    let { id } = this.props;
    return (
      <TouchableOpacity onPress={() => this.props.isDelete(id)}>
        <View
          style={{
            backgroundColor: '#FEECEC',
            height: 65,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingHorizontal: 20
          }}
        >
          <Animated.Text
            style={[{ color: '#EB5757' }, { transform: [{ scale }] }]}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  LeftActions = () => {
    let { istoggled } = this.state;
    if (istoggled) return null;
    let { id } = this.props;
    return (
      <TouchableOpacity onPress={() => this.props.edit(id)}>
        <View
          style={{
            backgroundColor: '#7FB78C',
            height: 65,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingHorizontal: 20
          }}
        >
          <Animated.Text style={[{ color: '#fff' }]}>Edit</Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    let {
      image,
      name,
      phone,
      website,
      email,
      desc,
      category,
      showMore,
      style,
      isDelete
    } = this.props;
    let { bounceValue, istoggled } = this.state;
    return (
      <Swipeable
        renderLeftActions={isDelete ? this.LeftActions : null}
        renderRightActions={isDelete ? this.RightActions : null}
      >
        <Animated.View
          style={[
            {
              paddingHorizontal: 5,
              marginBottom: 5,
              overflow: 'hidden',
              backgroundColor: istoggled ? '#F4F4F4' : '#fff'
            },
            { height: bounceValue },
            style
          ]}
          onPress={this.toggleCardView}
        >
          <ListCardHeader
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#f2f2f2'
            }}
            disabled={!showMore}
            onLayout={this._setMinHeight}
            onPress={this.toggleCardView}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}
            >
              <RectImage src={image} />
              <ListCardTextWrap>
                <ListCardTextPrimary>{name}</ListCardTextPrimary>
                <ListCardTextSecondary>{desc}</ListCardTextSecondary>
              </ListCardTextWrap>
            </View>
          </ListCardHeader>
          {showMore && (
            <View style={{ height: 130 }} onLayout={this._setMaxHeight}>
              <DetailCard
                email={email}
                phone={phone}
                website={website}
                category={category}
                desc={desc}
              />
            </View>
          )}
          {this.props.children}
        </Animated.View>
      </Swipeable>
    );
  }
}

const ListCardHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ListCardTextPrimary = styled.Text`
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 3px;
`;

const ListCardTextWrap = styled.View`
  margin-left: 15px;
`;

const ListCardTextSecondary = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: #8c8c8c;
`;
export default ListCard;
