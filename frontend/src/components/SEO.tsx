import type { FunctionComponent, ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

const SEO: FunctionComponent<Props> = (props) => (
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
