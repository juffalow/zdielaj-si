import React from 'react';

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SEO: React.FC<Props> = (props) => (
  <>
    {
      props.title.length === 0 ? (
        <title>Zdielaj.si</title>
      ) : (
        <title>{ `${props.title} | Zdielaj.si`}</title>
      )
    }
    <meta name="description" content={props.description} />
    {props.children}
  </>
);

export default SEO;
