import { use, useState, useEffect } from 'react';
import type { FunctionComponent, ChangeEvent, FormEvent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  createPublicProfile,
  getPublicProfile,
  updatePublicProfile,
} from '../../api/publicprofiles';

interface Props {
  getCurrentUserPromise: Promise<User>;
}

const PublicProfiles: FunctionComponent<Props> = ({ getCurrentUserPromise }: Props) => {
  const user = use(getCurrentUserPromise);
  const [ formType, setFormType ] = useState<string>('create');
  const [ publicProfile, setPublicProfile ] = useState<PublicProfile | null>(null);
  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    if ('publicProfileId' in user === false || typeof user.publicProfileId !== 'string') {
      return;
    }

    const fetchPublicProfile = async () => {
      try {
        const profile = await getPublicProfile(user.publicProfileId as string);
        setPublicProfile(profile);
        setFormType('update');
      } catch (error) {
        setError('Nepodarilo sa načítať verejný profil.');
      }
    };

    fetchPublicProfile();
  }, []);

  const handleActivate = async () => {
    setFormType('create');
    setPublicProfile({ id: '', name: '', description: '' });
  };

  const onCancel = () => {
    setFormType('create');
    setPublicProfile(null);
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setPublicProfile({
      ...publicProfile as PublicProfile,
      [event.target.name]: value
    });
  };

  const onCreateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (publicProfile === null) {
      return;
    }

    const form = event.currentTarget;

    if (form.checkValidity()) {
      createPublicProfile(publicProfile.id, publicProfile.name, publicProfile.description)
        .then((publicProfile) => {
          setPublicProfile(publicProfile);
          setFormType('update');
        })
        .catch(() => {
          setError('Nepodarilo sa vytvoriť verejný profil.');
        });
    }
  };

  const onUpdateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (publicProfile === null) {
      return;
    }

    const form = event.currentTarget;

    if (form.checkValidity()) {
      updatePublicProfile(publicProfile.id, { name: publicProfile.name, description: publicProfile.description })
        .then(() => {
          console.log('');
        })
        .catch(() => {
          setError('Nepodarilo sa upraviť verejný profil.');
        });
    }
  };

  return (
    <>
      <h4>Verejný profil</h4>
      {
        error !== null ? (
          <Alert variant="danger">{error}</Alert>
        ) : null
      }

      {
        publicProfile === null && error === null ? (
          <>
            <Alert variant="info">Nemáš aktivovaný verejný profil.</Alert>
            <Button onClick={handleActivate}>Aktivovať</Button>
            <p><small>Po aktivácii verejného profilu ti bude vygenerovaná unikátna URL adresa pre tvoj profil, na ktorej budú mocť iní užívatelia vidiet tvoje albumy.</small></p>
          </>
        ) : null
      }

      {
        publicProfile !== null && formType === 'create' ? (
          <>
            <Form noValidate onSubmit={onCreateSubmit}>
              <Form.Group controlId="publicProfileName">
                <Form.Label>Meno</Form.Label>
                <Form.Control type="text" name="name" placeholder="" value={publicProfile.name} onChange={onChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="publicProfileId" className="mt-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control required type="text" name="id" placeholder="" value={publicProfile.id} onChange={onChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
                <Form.Text id="passwordHelpBlock" muted>
                  Povolené sú len malé písmená, čísla a pomlčka. <br />
                  Profil bude dostupný na adrese: <a href={`https://zdielaj.si/profil/${publicProfile.id}`}>https://zdielaj.si/profil/{publicProfile.id}</a>
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="publicProfileDescription" className="mt-3">
                <Form.Label>Popis</Form.Label>
                <Form.Control as="textarea" name="description" rows={3} value={publicProfile.description} onChange={onChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="text-center mt-4">
                <Button variant="primary" type="submit">
                  Vytvoriť
                </Button>

                <Button variant="secondary" className="ms-2" onClick={onCancel}>
                  Zrušiť
                </Button>
              </Form.Group>
            </Form>
          </>
        ) : null
      }

      {
        publicProfile !== null && formType === 'update' ? (
          <>
            <Form noValidate onSubmit={onUpdateSubmit}>
              <Form.Group controlId="publicProfileName">
                <Form.Label>Meno</Form.Label>
                <Form.Control type="text" name="name" placeholder="" value={publicProfile.name} onChange={onChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="publicProfileId" className="mt-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control required type="text" name="id" placeholder="" value={publicProfile.id} aria-describedby="idHelpBlock" disabled />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
                <Form.Text id="idHelpBlock" muted>
                  Profil je dostupný na adrese: <a href={`https://zdielaj.si/profil/${publicProfile.id}`}>https://zdielaj.si/profil/{publicProfile.id}</a>
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="publicProfileDescription" className="mt-3">
                <Form.Label>Popis</Form.Label>
                <Form.Control as="textarea" name="description" rows={3} value={publicProfile.description} onChange={onChange} />
                <Form.Control.Feedback type="invalid">Toto pole je povinné.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="text-center mt-4">
                <Button variant="primary" type="submit">
                  Uložiť
                </Button>
              </Form.Group>
            </Form>
          </>
        ) : null
      }
    </>
  );
};

export default PublicProfiles;
