import React, { memo } from 'react';
import { colors } from 'styles/colors';
import { EIconTypes } from 'models/icons';
import { FieldHelperProps } from 'formik';
import { Column, Row } from 'ui/Layout';
import { Icon } from 'ui/Icon';
import FileLink from 'ui/FileLink';
import { IconButton } from './styles';

interface IFilesViews {
  value: Array<File>;
  helpers: FieldHelperProps<Array<File>>;
}

const FilesViews = ({ helpers, value = [] }: IFilesViews) => {
  const handleRemoveClick = (removedFileIndex: number) => {
    helpers.setValue(value.filter((file, index) => removedFileIndex !== index));
  };

  return (
    <Column>
      {value.map((file: File, index) => {
        const href = window.URL.createObjectURL(file);

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Row mbottom="12px" key={`${file.name} ${index}`}>
            <FileLink
              href={href}
              fileName={file.name}
              iconColor={colors.turquoise}
              textColor={colors.black}
            />
            <IconButton onClick={() => handleRemoveClick(index)} role="button">
              <Icon type={EIconTypes.times} fontSize="16px" color={colors.error} pointer />
            </IconButton>
          </Row>
        );
      })}
    </Column>
  );
};

export default memo(FilesViews);
