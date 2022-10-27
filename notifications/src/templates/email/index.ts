import register from './register';
import login from './login';

const getTemplate = (template: string): Template => {
  switch (template) {
    case 'register': return register;
    case 'login': return login;
    default:
      throw `Template ${template} does not exist!`;
  }
}

export default getTemplate;
