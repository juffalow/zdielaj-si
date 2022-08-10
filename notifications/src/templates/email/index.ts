import register from './register';

const getTemplate = (template: string): Template => {
  switch (template) {
    case 'register': return register;
    default:
      throw 'Template does not exist!';
  }
}

export default getTemplate;
