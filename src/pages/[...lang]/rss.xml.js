import rss from '@astrojs/rss';
import { getPosts } from '../../i18n/content';
import { langPaths, localizePath, useTranslations } from '../../i18n/ui';

export const getStaticPaths = langPaths;

// One feed per language, containing only posts written in (or translated to) that language.
export async function GET(context) {
  const { lang } = context.props;
  const t = useTranslations(lang);
  const posts = (await getPosts()).filter(({ translations }) => translations[lang]);
  return rss({
    title: t('rss.title'),
    description: t('site.description'),
    site: context.site,
    customData: `<language>${lang}</language>`,
    items: posts.map(({ slug, translations }) => ({
      title: translations[lang].data.title,
      description: translations[lang].data.description,
      pubDate: translations[lang].data.pubDate,
      link: localizePath(lang, `/blog/${slug}/`),
    })),
  });
}
