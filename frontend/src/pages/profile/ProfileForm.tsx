import type { FunctionComponent } from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  user: User;
}

const ProfileForm: FunctionComponent<Props> = ({ user }: Props) => {
  return (
    <>
      <Form noValidate>
        <Form.Group>
          <Form.Label>E-mailová adresa</Form.Label>
          <Form.Control type="email" name="email" placeholder="meno.priezvisko@priklad.sk" value={user.email} readOnly disabled />
        </Form.Group>
      </Form>
    </>
  );
};

export default ProfileForm;
