export const languages = {
  en: 'English',
  de: 'Deutsch',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';
export const langs = Object.keys(languages) as Lang[];

const dateLocales: Record<Lang, string> = { en: 'en-US', de: 'de-DE' };

export const ui = {
  en: {
    'site.description': 'Apps and blog by Maximilian Aschenbrenner.',
    'footer.about': 'About',
    'nav.apps': 'Apps',
    'nav.blog': 'Blog',
    'footer.legalNotice': 'Legal notice',
    'footer.privacy': 'Privacy',
    'about.title': 'Hi, I’m Maxi.',
    'about.intro': 'I build apps and write about them here.',
    'home.latestPosts': 'Latest posts',
    'home.allPosts': 'All posts →',
    'blog.description': 'All posts on hatsa.de.',
    'apps.description': 'All apps by hatsa.de.',
    'post.updated': 'updated',
    'post.inLang.en': 'in English',
    'post.inLang.de': 'in German',
    'app.status.in-entwicklung': 'In development',
    'app.status.beta': 'Beta',
    'app.status.veroeffentlicht': 'Available',
    'app.appStore': 'Download on the App Store',
    'app.playStore': 'Get it on Google Play',
    'app.support': 'Support',
    'app.privacy': 'Privacy',
    'rss.title': 'hatsa.de Blog',
  },
  de: {
    'site.description': 'Apps und Blog von Maximilian Aschenbrenner.',
    'footer.about': 'Über mich',
    'nav.apps': 'Apps',
    'nav.blog': 'Blog',
    'footer.legalNotice': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'about.title': 'Hallo, ich bin Maxi.',
    'about.intro': 'Ich entwickle Apps und schreibe hier darüber.',
    'home.latestPosts': 'Neueste Beiträge',
    'home.allPosts': 'Alle Beiträge →',
    'blog.description': 'Alle Beiträge auf hatsa.de.',
    'apps.description': 'Alle Apps von hatsa.de.',
    'post.updated': 'aktualisiert am',
    'post.inLang.en': 'auf Englisch',
    'post.inLang.de': 'auf Deutsch',
    'app.status.in-entwicklung': 'In Entwicklung',
    'app.status.beta': 'Beta',
    'app.status.veroeffentlicht': 'Verfügbar',
    'app.appStore': 'Im App Store laden',
    'app.playStore': 'Bei Google Play laden',
    'app.support': 'Support',
    'app.privacy': 'Datenschutz',
    'rss.title': 'hatsa.de Blog (Deutsch)',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key];
}

/** Pages whose slug differs per language. */
export const localizedPaths = {
  legalNotice: { en: '/legal-notice/', de: '/de/impressum/' },
  privacy: { en: '/privacy/', de: '/de/datenschutz/' },
} as const satisfies Record<string, Record<Lang, string>>;

/** Prefixes a language-neutral path like `/blog/` with the language, except for the default language. */
export function localizePath(lang: Lang, path: string) {
  return lang === defaultLang ? path : `/${lang}${path}`;
}

/** Inverse of `localizePath`: `/de/blog/` → `/blog/`. */
export function stripLang(pathname: string) {
  const [, first, ...rest] = pathname.split('/');
  return first !== defaultLang && langs.includes(first as Lang) ? `/${rest.join('/')}` : pathname;
}

/** Value of the `[...lang]` route param: empty for the default language. */
export function langParam(lang: Lang) {
  return lang === defaultLang ? undefined : lang;
}

/** `getStaticPaths` result for pages that exist once per language. */
export function langPaths() {
  return langs.map((lang) => ({ params: { lang: langParam(lang) }, props: { lang } }));
}

export function formatDate(lang: Lang, date: Date) {
  return date.toLocaleDateString(dateLocales[lang], { dateStyle: 'medium' });
}
