import { getCollection } from 'astro:content';
import { langParam, langs, type Lang } from './ui';

/**
 * Content lives in one folder per language (`src/content/blog/en/hello-world.md`).
 * Files with the same name in different language folders are translations of each other.
 */
export interface Localized<T> {
  slug: string;
  translations: Partial<Record<Lang, T>>;
}

function groupBySlug<T extends { id: string }>(entries: T[]): Localized<T>[] {
  const bySlug = new Map<string, Partial<Record<Lang, T>>>();
  for (const entry of entries) {
    const [lang, ...rest] = entry.id.split('/');
    const slug = rest.join('/');
    bySlug.set(slug, { ...bySlug.get(slug), [lang as Lang]: entry });
  }
  return [...bySlug].map(([slug, translations]) => ({ slug, translations }));
}

/** The entry in `lang`, or the first available translation if there is none. */
export function resolve<T>(item: Localized<T>, lang: Lang): { entry: T; lang: Lang } {
  const found = [lang, ...langs].find((l) => item.translations[l])!;
  return { entry: item.translations[found]!, lang: found };
}

export async function getPosts() {
  return groupBySlug(await getCollection('blog', ({ data }) => !data.draft));
}

export async function getApps() {
  return groupBySlug(await getCollection('apps'));
}

/** `getStaticPaths` result for app pages: every app in every language, falling back to untranslated content. */
export async function appPaths() {
  return (await getApps()).flatMap((item) =>
    langs.map((lang) => ({
      params: { lang: langParam(lang), id: item.slug },
      props: { lang, app: resolve(item, lang).entry },
    })),
  );
}

/** All posts as listed on a `lang` page: the translation if available, otherwise the original. Newest first. */
export async function getPostList(lang: Lang) {
  return (await getPosts())
    .map((item) => ({ slug: item.slug, ...resolve(item, lang) }))
    .sort((a, b) => b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf());
}

export type PostListItem = Awaited<ReturnType<typeof getPostList>>[number];
