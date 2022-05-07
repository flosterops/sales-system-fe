import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Column } from 'ui/Layout';
import { Box } from 'ui/Box';
import { Header } from 'widgets/Header';
import {
  AlignItemsTypes,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Title, TitleTags } from 'ui/Title';

const NotFoundRedirect = () => <Redirect to="/404NotFound" />;

const NotFoundPage = () => (
  <>
    <Header />
    <Column ai={AlignItemsTypes.center} jc={JustifyContentTypes.center} mtop="50px">
      <Box padding="30px 40px 49px" componentWidth="75vw">
        <Title
          tagName={TitleTags.h1}
          mbottom="30px"
          weight={WeightTypes.w800}
          fontSize={FontSizeTypes.xl}
        >
          Page not found!
        </Title>
        <Link to="/">Go back to Dashboard</Link>
      </Box>
    </Column>
  </>
);

export { NotFoundPage, NotFoundRedirect };
