import { AlignItemsTypes, ComponentSizesTypes, JustifyContentTypes } from 'models/layout';
import React, { ReactElement } from 'react';
import { ModalWrapper, Title, CloseButton } from 'widgets/LoaderComponent/styles';
import { StyledLoader } from 'ui/Loader';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { EButtonsVariants } from 'models/button';
import { isFunction } from 'models/guards';

interface ILoader {
  show: boolean;
  title: string;
  close?: (...args: any) => void;
}

const CommonLoader = ({ close, show = false, title = 'Loading…' }: ILoader): ReactElement => (
  <ModalWrapper
    componentWidth="100%"
    componentHeight="100vh"
    ai={AlignItemsTypes.center}
    jc={JustifyContentTypes.center}
    visible={show}
  >
    <Title>{title}</Title>
    <StyledLoader />
    {isFunction(close) && (
      <CloseButton
        variant={EButtonsVariants.white}
        componentSize={ComponentSizesTypes.auto}
        onClick={() => close()}
      >
        <Icon type={EIconTypes.times} />
      </CloseButton>
    )}
  </ModalWrapper>
);

export { CommonLoader };
