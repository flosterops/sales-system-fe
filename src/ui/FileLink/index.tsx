import React from 'react';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { Description } from 'ui/Description';

interface IFileLink {
  href: string;
  fileName: string;
  iconColor: string;
  textColor: string;
}

const FileLink = ({ href, iconColor, textColor, fileName }: IFileLink) => (
  <a href={href} download={!!fileName} target="_blank" rel="noreferrer">
    <Icon type={EIconTypes.paperClip} color={iconColor} fontSize="16px" mright="5px" pointer />
    <Description color={textColor}>{fileName}</Description>
  </a>
);

export default FileLink;
