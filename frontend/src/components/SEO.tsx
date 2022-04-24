import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SEO: React.FC<Props> = (props) => (
  <>
    <Helmet>
      {
        props.title.length === 0 ? (
          <title>Zdielaj.si</title>
        ) : (
          <title>{props.title} | Zdielaj.si</title>
        )
      }
      <meta name="description" content={props.description} />
    </Helmet>
    {props.children}
  </>
);

export default SEO;
