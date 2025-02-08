import { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import SEO from '../components/SEO';
import { getQueryParameter } from '../utils/functions';
import { getNotificationSettings, setNotificationSettings} from '../api/services';

const Notifications: FunctionComponent = () => {
  const [settings, setSettingsState] = useState<Setting[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getNotificationSettings(getQueryParameter('email'))
      .then(settings => {
        setSettingsState(settings);
      })
      .catch(() => setHasError(true));
  }, []);

  const setSetting = (setting: Setting) => {
    setNotificationSettings(
      getQueryParameter('email'),
      [{notification: setting.notification, isEnabled: setting.isEnabled}],
      getQueryParameter('token')
    ).then(json => {
      setSettingsState(json.data.notifications);
    }).catch(e => {
      setHasError(true);
      alert(e.message);
    });
  };

  const onSettingChange = (event: any) => {
    console.log(event);

    console.log('name', event.target.name);
    console.log('value', event.target.checked);

    const notification = event.target.name;
    const isEnabled = event.target.checked;

    setNotificationSettings(
      getQueryParameter('email'),
      [{ notification, isEnabled }],
      getQueryParameter('token')
    ).then(json => {
      setSettingsState(json.data.notifications);
    }).catch(e => {
      setHasError(true);
      alert(e.message);
    });
  }

  return (
    <SEO title="Notifikácie" description="">
      <Container>
        <Row>
          <Col>
            <h1>Notifikácie</h1>
            <p className="lead"></p>
            {
              hasError ? (
                <Alert variant="danger">Neplatná url adresa alebo vypršala platnosť!</Alert>
              ) : (
                <Form>
                  <h3 className="mt-4">Informácie o účte</h3>
                  <Form.Group className="mb-3" controlId="notificationGeneral">
                    <Form.Check
                      disabled
                      readOnly
                      type="switch"
                      id="custom-switch"
                      label="Notifikácie (povinné)"
                      checked={true}
                    />
                    <Form.Text className="text-muted">
                      Upozornenia týkajúce sa účtu obsahujú dôležité informácie, ako sú aktualizácie a zmeny týkajúce sa
                      vášho účtu.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="notificationLogin">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Prihlásenie do účtu"
                      name="login"
                      checked={settings.find(setting => setting.notification === 'login')?.isEnabled ?? false}
                      onChange={onSettingChange}
                      // onClick={() => setSetting({
                      //   notification: 'login',
                      //   isEnabled: !settings.find(setting => setting.notification === 'login')?.isEnabled
                      // })}
                    />
                    <Form.Text className="text-muted">
                      Úspešné prihlásenie do účtu z nového zariadenia.
                    </Form.Text>
                  </Form.Group>
                  <h3 className="mt-4">Produktové informácie</h3>
                  <Form.Group className="mb-3" controlId="notificationNewFeature">
                    <Form.Check
                      disabled
                      readOnly
                      type="switch"
                      id="custom-switch"
                      label="Oznámenie o aktualizácii"
                      checked={false}
                    />
                    <Form.Text className="text-muted">
                      Nové funkcie, zmena limitov, podpora nového formátu.
                    </Form.Text>
                  </Form.Group>
                </Form>
              )
            }
          </Col>
        </Row>
      </Container>
    </SEO>
  );
};

export default Notifications;
