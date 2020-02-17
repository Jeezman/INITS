import React from 'react';
import { Dimensions, View } from 'react-native';
import Modal from './Modal';

containerStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: Dimensions.get('window').height * 2
};

export default FixedHeightModal = ({
  isModalOpen,
  closeModal,
  modalHeight,
  renderHeader,
  renderModalContent,
  showHeaderBackBtn
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal
        {...this.props}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        snapPoints={[0, modalHeight]}
        renderHeader={!!renderHeader ? renderHeader : undefined}
        renderModalContent={renderModalContent}
        containerStyle={containerStyle}
        showHeaderBackBtn={showHeaderBackBtn}
      />
    </View>
  );
};
