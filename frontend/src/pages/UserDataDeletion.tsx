import type { FunctionComponent } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SEO from '../components/SEO';

const UserDataDeletion: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <SEO title={t('userDataDeletion.title')} description="">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">{t('userDataDeletion.title')}</h1>
            <p className="lead">
              <Trans i18nKey="userDataDeletion.subtitle"
                values={{ email: 'info@zdielaj.si' }}
                components={{ mailto: <a href="mailto:info@zdielaj.si" /> }}
              />
            </p>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default UserDataDeletion;
