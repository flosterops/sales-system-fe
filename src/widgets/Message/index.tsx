import React from 'react';
import {
  EEmailMessageType,
  EMessageDirection,
  IMessageDetailResponseData,
} from 'models/email-message';
import parse from 'html-react-parser';
import { format } from 'date-fns';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { colors } from 'styles/colors';
import FileLink from 'ui/FileLink';
import { Column } from 'ui/Layout';
import { BodyRow, DateRow, MessageContainer, MessageRow, TitleRow } from './styles';
import { EmessageDirectionDictionary } from './helpers';

const MessageComponent = (message: IMessageDetailResponseData, key: number) => {
  const {
    body,
    timestampSent,
    messageType,
    messageDirection,
    title,
    emailMessageAttachments,
  } = message;

  return (
    <MessageContainer
      ai={
        messageDirection === EMessageDirection.outgoing
          ? AlignItemsTypes.flexEnd
          : AlignItemsTypes.flexStart
      }
      key={key}
    >
      <MessageRow
        bg={
          messageDirection === EMessageDirection.outgoing ? colors.primary : colors.lightGray
        }
      >
        {EEmailMessageType.email === messageType ? (
          <TitleRow
            color={
              messageDirection === EMessageDirection.outgoing ? colors.white : colors.black
            }
          >
            {title}
          </TitleRow>
        ) : (
          ''
        )}
        <BodyRow
          color={messageDirection === EMessageDirection.outgoing ? colors.white : colors.black}
        >
          {parse(body)}
        </BodyRow>

        {!!emailMessageAttachments && (
          <Column mtop="20px">
            {emailMessageAttachments.map((attachment) => (
              <FileLink
                key={attachment.id}
                href={attachment.mediaMetadata.fileUrl}
                fileName={attachment.mediaMetadata.fileName}
                iconColor={colors.white}
                textColor={colors.white}
              />
            ))}
          </Column>
        )}
      </MessageRow>
      <DateRow
        jc={
          messageDirection === EMessageDirection.outgoing
            ? JustifyContentTypes.flexEnd
            : JustifyContentTypes.flexStart
        }
      >
        {EmessageDirectionDictionary[messageDirection]}
        {': '}
        {timestampSent
          ? format(new Date(timestampSent), 'dd.MM.yyyy hh:mma').toLocaleUpperCase()
          : '-'}
      </DateRow>
    </MessageContainer>
  );
};

export { MessageComponent };
