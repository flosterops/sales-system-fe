import { IMessageDetailResponseData } from 'models/email-message';
import React from 'react';
import { MessageComponent } from 'widgets/Message';
import { MessagesContainer } from './styles';

interface IMessagesList {
  messages: IMessageDetailResponseData[];
}

const MessagesList = ({ messages }: IMessagesList) => (
  <MessagesContainer mbottom="45px">
    {messages.map((message: IMessageDetailResponseData, key: number) =>
      MessageComponent(message, key),
    )}
  </MessagesContainer>
);

export { MessagesList };
