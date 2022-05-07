import React, { ReactElement, useEffect, useState } from 'react';
import { Row } from 'ui/Layout';
import { INote } from 'models/notes';
import { useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ECookiesTypes } from 'models/cookies';
import { getNotesByCustomer } from 'requests/notes';
import { isResponseError } from 'models/guards';
import { composeMessages } from 'helpers/messages';
import { IWebsiteUserDetails } from 'models/webiste-user';
import { getWebsiteUser } from 'requests/website-user';
import { getTask } from 'requests/task';
import { NoData } from 'widgets/NoData';
import { NotesList } from './NotesList';
import { NotesForm } from './NotesForm';
import { Loader } from '../../../ui/Loader';

const Notes = (): ReactElement | null => {
  const { id } = useParams() as { id: string };
  const [notes, setNotes] = useState<INote[] | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [websiteUser, setWebsiteUser] = useState<IWebsiteUserDetails | null>(null);
  const { pathname } = useLocation();

  const getTaskInfo = async (token: string) => {
    if (!token) {
      return null;
    }
    if (pathname === `/task/${id}/notes`) {
      const taskInfo = await getTask(token, id);
      if (!isResponseError(taskInfo)) {
        return taskInfo.websiteUser as IWebsiteUserDetails;
      }
    } else {
      const websiteUserData = await getWebsiteUser(token, id);
      if (!isResponseError(websiteUserData)) {
        return websiteUserData.data as IWebsiteUserDetails;
      }
    }
    return null;
  };

  const updateNotesList = async (pageNumber = 0) => {
    const token = Cookies.get(ECookiesTypes.accessToken) || '';
    if (!token) {
      return;
    }

    const data = await getTaskInfo(token);
    setWebsiteUser(data);

    if (!data) {
      return;
    }

    const notesResponse = await getNotesByCustomer(token, data.id, {
      criteria: {},
      page: {
        pageNumber,
        pageSize: 20,
        sort: {
          orders: [
            {
              direction: 'DESC',
              property: 'createdOn',
            },
          ],
        },
      },
    });

    if (isResponseError(notesResponse)) {
      return;
    }

    setPage(pageNumber + 1);
    setHasMore(notesResponse.data.content.length === 20);
    if (pageNumber) {
      setNotes((oldNotes) =>
        composeMessages(notesResponse.data.content, oldNotes !== null ? oldNotes : []),
      );
      return;
    }

    setNotes((oldNotes) =>
      composeMessages(oldNotes !== null ? oldNotes : [], notesResponse.data.content),
    );
  };

  useEffect(() => {
    updateNotesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (notes === null) {
    return <Loader />;
  }

  if (!websiteUser) {
    return null;
  }

  return (
    <>
      {notes.length > 0 ? (
        <NotesList notes={notes} hasMore={hasMore} next={() => updateNotesList(page)} />
      ) : (
        <NoData />
      )}
      <Row mtop="20px">
        <NotesForm websiteUser={websiteUser} updateNotesList={updateNotesList} />
      </Row>
    </>
  );
};
export { Notes };
