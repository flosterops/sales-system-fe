import React, { ChangeEvent, ReactElement } from 'react';
import { colors } from 'styles/colors';
import { ISpaceTypes } from 'models/layout';
import { EIconTypes } from 'models/icons';
import { FieldHelperProps } from 'formik';
import { Icon } from 'ui/Icon';
import { HiddenInput } from './styles';

export interface IUploadFiles extends ISpaceTypes {
  name: string;
  value: Array<File>;
  color?: string;
  icon?: EIconTypes;
  helpers: FieldHelperProps<Array<File>>;
  className?: string;
  accept?: string;
  multiple?: boolean;
}

const UploadFiles = ({
  color = colors.primary,
  icon = EIconTypes.paperClip,
  name,
  helpers,
  value = [],
  className,
  multiple,
  accept,
}: IUploadFiles): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = event.currentTarget;
    if (multiple) {
      return helpers.setValue([...value, ...(files as Array<File>)]);
    }

    return helpers.setValue(files as Array<File>);
  };

  return (
    <>
      <HiddenInput
        type="file"
        name={name}
        id={name}
        multiple={multiple}
        onChange={handleChange}
        accept={accept}
      />
      <label htmlFor={name} className={className}>
        <Icon type={icon} fontSize="30px" color={color} pointer />
      </label>
    </>
  );
};

export { UploadFiles };
