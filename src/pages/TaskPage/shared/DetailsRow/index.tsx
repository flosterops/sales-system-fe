import { EFontFamilies, FontSizeTypes } from 'models/layout';
import React from 'react';
import { Title, TitleTags } from 'ui/Title';
import { DetailsSection } from './DetailsSection';
import { DetailsRowContent, DetailsRowHeader } from './style';

type DetailsRowComponent = {
  key: string;
  component?: JSX.Element | null;
};

interface IDetailsRow {
  sectionHeaders?: string[];
  components?: DetailsRowComponent[];
}

const DetailsRow = ({ sectionHeaders, components }: IDetailsRow) => {
  if (components?.filter((c) => !c.component).length === components?.length) {
    return null;
  }

  return (
    <>
      <DetailsRowHeader fullWidth={sectionHeaders?.length === 1} mbottom="13px">
        {sectionHeaders?.map((h) => (
          <Title
            fontSize={FontSizeTypes.l}
            tagName={TitleTags.default}
            fontFamily={EFontFamilies.bree}
            key={h}
          >
            {h}
          </Title>
        ))}
      </DetailsRowHeader>
      <DetailsRowContent isMultiElement={components && components?.length > 1}>
        {components?.map((c) => (
          <DetailsSection fullWidth={components.length === 1} key={c.key}>
            {c.component}
          </DetailsSection>
        ))}
      </DetailsRowContent>
    </>
  );
};

export { DetailsRow };
