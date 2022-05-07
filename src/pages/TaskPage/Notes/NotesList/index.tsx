import React, { ReactElement } from 'react';
import { ENoteType, INote } from 'models/notes';
import { colors } from 'styles/colors';
import { Column, Row } from 'ui/Layout';
import { Description } from 'ui/Description';
import { AlignTextTypes, FontSizeTypes, WeightTypes } from 'models/layout';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from 'ui/Loader';
import FileLink from 'ui/FileLink';
import { format } from 'date-fns';
import { NoteBox, NoteContainer, NotesContainer, NoteTypeLabel } from './styles';

const SCROLLABLE_ELEMENT_ID = 'scrollableDiv';

interface INoteStyles {
  bgColor: string;
  textColor: string;
}

interface INoteComponent {
  note: INote;
}

const getNoteStyles = (type: ENoteType): INoteStyles => {
  switch (type) {
    case ENoteType.global:
      return {
        bgColor: colors.primary,
        textColor: colors.white,
      };
    case ENoteType.sales:
      return {
        bgColor: colors.yellow,
        textColor: colors.black,
      };
    case ENoteType.task:
      return {
        bgColor: colors.turquoise,
        textColor: colors.white,
      };
    default:
      return {
        bgColor: colors.white,
        textColor: colors.black,
      };
  }
};

const mapNoteTypeToText = (type: ENoteType): string => {
  switch (type) {
    case ENoteType.global:
      return `${ENoteType.global}`;
    case ENoteType.task:
      return 'TASK SUMMARY';
    case ENoteType.sales:
      return `${ENoteType.sales}`;
    default:
      return '';
  }
};

const NoteComponent = ({ note }: INoteComponent): ReactElement => {
  const noteStyles = getNoteStyles(note.noteType as ENoteType);
  return (
    <NoteContainer mbottom="28px" wrap>
      <Row>
        <Description weight={WeightTypes.w400}>
          {note.fullName ? note.fullName : ''}
        </Description>
      </Row>
      <NoteBox bg={noteStyles.bgColor} padding="20px" componentHeight="100%">
        <NoteTypeLabel color={noteStyles.bgColor}>
          {mapNoteTypeToText(note.noteType as ENoteType)}
        </NoteTypeLabel>
        <Row mbottom="20px">
          <Description
            fontSize={FontSizeTypes.s}
            color={noteStyles.textColor}
            componentWidth="calc(85% - 10px)"
          >
            {note.content}
          </Description>
        </Row>
        <Column>
          {note.businessNoteAttachments.map((attachment) => (
            <FileLink
              key={attachment.id}
              href={attachment.mediaMetadata.fileUrl}
              fileName={attachment.mediaMetadata.fileName}
              iconColor={noteStyles.textColor}
              textColor={noteStyles.textColor}
            />
          ))}
        </Column>
      </NoteBox>
      <Description textAlign={AlignTextTypes.right} componentWidth="100%">
        {format(new Date(note.createdOn), 'dd.MM.yyyy hh:mm a')}
      </Description>
    </NoteContainer>
  );
};

interface INotesList {
  notes: INote[];
  next: () => void;
  hasMore: boolean;
}

const NotesList = ({ notes, next, hasMore }: INotesList): ReactElement => (
  <NotesContainer id={SCROLLABLE_ELEMENT_ID}>
    <InfiniteScroll
      dataLength={notes.length}
      next={next}
      style={{ display: 'flex', flexDirection: 'column-reverse', overflowX: 'hidden' }}
      hasMore={hasMore}
      loader={<Loader />}
      scrollableTarget={SCROLLABLE_ELEMENT_ID}
      inverse
    >
      {notes.map((note) => (
        <NoteComponent note={note} key={note.id} />
      ))}
    </InfiniteScroll>
  </NotesContainer>
);

export { NotesList };
