import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from "./locales/en/translation.json";
import translationCZ from "./locales/cz/translation.json";

i18n.use(initReactI18next).init({
  lng: 'sk',
  fallbackLng: 'sk',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    sk: {
      translation: {
        home: {
          title: 'Zdieľaj fotky a videá v plnej kvalite',
          subtitle: 'Tiež máš problém, že ti niektoré aplikácie znížujú kvalitu fotiek a videí? Tu ich môžeš zdielať bez problémov v plnej kvalite!',
          uploadAreaText: 'Presuň sem fotky alebo ich vyber kliknutím',
          uploadAreaButton: 'Nahrať fotky',
          pricing: {
            default: {
              title: 'Bez registrácie',
              monthly: 'mesačne',
              maxTenPhotos: 'maximálne <strong>10</strong> fotiek',
              deletedAfter24Hours: 'fotky budú po <strong>24 hodinách</strong> automaticky zmazané',
              register: 'Registrácia',
            },
            free: {
              title: 'Zadarmo',
              monthly: 'mesačne',
              maxOneGB: 'maximálne <strong>1GB</strong> <small>(≈ 300 fotiek)</small>',
              video: 'video',
              listOfAlbums: 'zoznam vytvorených albumov',
              filesWillBeDeletedAfter7Days: 'súbory budú po <strong>7 dňoch</strong> automaticky zmazané',
              register: 'Registrácia',
            },
            standard: {
              title: 'Štandard',
              monthly: 'mesačne',
              maxTenGB: 'maximálne <strong>10GB</strong> <small>(≈ 3000 fotiek)</small>',
              video: 'video',
              listOfAlbums: 'zoznam vytvorených albumov',
              passwordProtect: 'zaheslovať prístup',
              publicProfile: 'verejný profil',
              filesWillNotBeDeleted: 'súbory sa <strong>nemažú</strong>',
              register: 'Registrácia',
            },
          },
        },
        login: {
          title: 'Prihlásiť sa',
          subtitle: 'Ešte nemáš účet?',
          subtitleLink: 'Registrovať sa',
          form: {
            email: 'E-mailová adresa',
            requiredField: 'Toto pole je povinné.',
            password: 'Heslo',
            forgotPassword: 'Zabudnuté heslo?',
            signInButton: 'Prihlásiť sa',
          },
        },
        register: {
          title: 'Registrácia',
          subtitle: 'Máš už účet?',
          subtitleLink: 'Prihlásiť sa',
          error: {
            userAlreadyExists: 'Užívateľ s touto e-mailovou adresou už existuje!',
            userNotCreated: 'Nepodarilo sa vytvoriť užívateľa!',
          },
          form: {
            name: 'Meno',
            email: 'E-mailová adresa',
            password: 'Heslo',
            requiredField: 'Toto pole je povinné.',
            minEightCharacters: 'Minimálne 8 znakov',
            atLeastOneUppercase: 'Aspoň jedno veľké písmeno',
            atLeastOneLowercase: 'Aspoň jedno malé písmeno',
            atLeastOneSpecialCharacter: 'Aspoň jeden špeciálny znak',
            atLeastOneNumber: 'Aspoň jedno číslo',
            signUpButton: 'Registrovať sa',
          },
          confirmForm: {
            title: 'Overenie e-mailovej adresy',
            subtitle: 'Na tvoj e-mail bol odoslaný overovací kód.',
            code: 'Overovací kód',
            requiredField: 'Toto pole je povinné.',
            submitButton: 'Dokončiť registráciu',
          },
          thankYou: {
            title: 'Ďakujem za registráciu!',
            subtitle: 'Tvoja e-mailová adresa bola overená. Možeš pokračovať prihlásením sa do svojho účtu',
            subtitleLink: 'tu',
          },
        },
        menu: {
          albums: 'Albumy',
          about: 'O aplikácii',
          profile: 'Profil',
          signIn: 'Prihlásiť sa',
          signOut: 'Ohlásiť sa',
          subscription: 'Predplatné',
        },
        footer: {
          about: 'O aplikácii',
          contact: 'Kontakt',
          description: 'Aplikácia pomáha užívateľom rýchlo a ľahko zdielať fotografie a videá bez zníženia kvality.',
          home: 'Domov',
          links: 'Odkazy',
          register: 'Registrácia',
          status: 'Status',
        },
      }
    },
    en: {
      translation: translationEN,
    },
    cz: {
      translation: translationCZ,
    },
  },
});

export default i18n;
