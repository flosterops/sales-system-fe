import { IMessageDetailResponseData } from 'models/email-message';
import { isResponseError } from 'models/guards';
import React, { useEffect, useRef, useState } from 'react';
import { messagesList } from 'requests/email-message';
import { Row } from 'ui/Layout';
import { Loader } from 'ui/Loader';
import { NoData } from 'widgets/NoData';
import { useWebsiteUserDetails } from './hooks';
import { MessagesForm } from './MessagesForm';
import { MessagesList } from './MessagesList';

const Messages = () => {
  const { isLoading, websiteUser } = useWebsiteUserDetails();
  const [messages, setMessages] = useState<IMessageDetailResponseData[] | null>(null);

  const formRef = useRef<HTMLDivElement>();
  const executeScroll = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView();
    }
  };

  const refreshListMessages = async () => {
    if (websiteUser) {
      const messagesData = await messagesList(websiteUser.id);
      if (!isResponseError(messagesData)) {
        setMessages(messagesData.data);
      }
    }
  };

  useEffect(() => {
    refreshListMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websiteUser]);

  useEffect(() => {
    if (!isLoading && formRef.current) {
      executeScroll();
    }
  }, [isLoading, formRef, messages]);

  if (isLoading || messages === null) {
    return <Loader />;
  }
  if (websiteUser) {
    return (
      <>
        <Row>{messages.length > 0 ? <MessagesList messages={messages} /> : <NoData />}</Row>
        <Row layoutRef={formRef}>
          <MessagesForm websiteUser={websiteUser} refreshListMessages={refreshListMessages} />
        </Row>
      </>
    );
  }
  return null;
};

export { Messages };
