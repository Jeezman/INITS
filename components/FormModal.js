import React, { Component } from 'react';
import { Platform, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components';
import CustomModal from './CustomModal';

const defaultModalHeight = Platform.OS == 'ios' ? 650 : 600;

export default class FormModal extends Component {
  renderModalContent = () => {
    const { title, subtitle, renderFormContent } = this.props;
    return (
      <Body>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
        <VerticalSpacer height={55} />
        <KeyboardAvoidingView
          behavior="height"
          keyboardVerticalOffset={Platform.OS == 'ios' ? 250 : 150}
        >
          <ScrollView behaviour="position" showsVerticalScrollIndicator={false}>
            {renderFormContent()}
          </ScrollView>
        </KeyboardAvoidingView>
      </Body>
    );
  };

  render() {
    const {
      isModalOpen,
      closeModal,
      modalHeight,
      renderModalContent,
      showHeaderBackBtn
    } = this.props;
    return (
      <CustomModal
        {...this.props}
        showHeaderBackBtn={showHeaderBackBtn}
        modalHeight={modalHeight ? modalHeight : defaultModalHeight}
        renderModalContent={
          !!renderModalContent ? renderModalContent : this.renderModalContent
        }
      />
    );
  }
}

const Body = styled.View`
  background-color: #f1f3fa;
  padding-left: 24px;
  padding-right: 24px;
  height: 100%;
`;

const VerticalSpacer = styled.View`
  height: ${({ height }) => (height ? `${height}px` : 0)};
`;

const Title = styled.Text`
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.07px;
  color: rgba(0, 2, 21, 0.8);
  text-align: center;
  margin-bottom: 10px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.06px;
  color: rgba(0, 2, 21, 0.4);
  text-align: center;
  letter-spacing: 0.06px;
`;
