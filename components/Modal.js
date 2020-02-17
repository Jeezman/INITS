import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const { block, set, sub } = Animated;

export default class Modal extends React.Component {
  bottomSheetRef = React.createRef();
  value_fall = new Animated.Value(1);
  value_backdrop = new Animated.Value(0);
  touched = false;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isModalOpen !== this.props.isModalOpen) {
      if (this.props.isModalOpen) {
        this.bottomSheetRef.current.snapTo(1); // open modal
      } else {
        this.bottomSheetRef.current.snapTo(0); // close modal
      }
    }

    if (prevProps.shouldHideModal !== this.props.shouldHideModal) {
      if (this.props.shouldHideModal) {
        this.bottomSheetRef.current.snapTo(2);
      } else {
        this.bottomSheetRef.current.snapTo(1);
      }
    }
  }

  componentDidMount() {
    if (this.props.isModalOpen) {
      this.bottomSheetRef.current.snapTo(1);
    }
  }

  closeModalWrapper = () => {
    if (this.touched) {
      if (this.props.closeModal) this.props.closeModal();
    } else {
      this.touched = true;
    }
  };

  renderDefaultHeader = () => {
    return <Header></Header>;
  };

  defaultContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: this.props.children ? 'rgb(0, 0, 17)' : null
  };

  onClickOut = () => {
    if (this.props.disableClosing) return;

    this.closeModalWrapper();
  };

  render() {
    const {
      snapPoints,
      enablePointerEvents,
      isModalOpen,
      closeModal,
      containerStyle,
      renderHeader,
      renderModalContent,
      onOpenStart,
      disableClosing
    } = this.props;

    return (
      <View
        style={!!containerStyle ? containerStyle : this.defaultContainerStyle}
        pointerEvents={
          enablePointerEvents ? 'auto' : isModalOpen ? 'auto' : 'none'
        }
      >
        <Animated.Code>
          {() =>
            block([
              this.props.children
                ? Animated.set(
                    this.value_backdrop,
                    Animated.multiply(1, this.value_fall)
                  )
                : set(this.value_backdrop, sub(0.8, this.value_fall)) //backdrop opacity, 0.8 - %
            ])
          }
        </Animated.Code>
        <BottomSheet
          ref={this.bottomSheetRef}
          renderHeader={
            !!renderHeader ? renderHeader : this.renderDefaultHeader
          }
          renderContent={renderModalContent}
          onOpenStart={onOpenStart}
          onCloseEnd={this.closeModalWrapper}
          snapPoints={snapPoints}
          initialSnap={0}
          callbackNode={this.value_fall}
          enabledContentGestureInteraction={false}
          enabledGestureInteraction={!disableClosing}
        />
        {this.props.children ? (
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: this.value_backdrop
            }}
          >
            {this.props.children}
          </Animated.View>
        ) : (
          <TouchableWithoutFeedback onPress={this.onClickOut}>
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: this.props.isModalOpen
                  ? 'rgb(0, 0, 17)'
                  : 'transparent',
                opacity: this.value_backdrop
              }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  containerStyle: PropTypes.object,
  isModalOpen: PropTypes.bool.isRequired,
  renderHeader: PropTypes.func,
  renderModalContent: PropTypes.func.isRequired,
  showHeaderBackBtn: PropTypes.bool,
  snapPoints: PropTypes.array.isRequired,
  enablePointerEvents: PropTypes.bool,
  onOpenStart: PropTypes.func,
  disableClosing: PropTypes.bool
};

const Header = styled.View`
  background-color: #f1f3fa;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding-top: 10px;
  padding-bottom: ${({ withoutPadding }) => (withoutPadding ? 0 : 32)};
  align-items: center;
  margin-bottom: -1px;
`;
