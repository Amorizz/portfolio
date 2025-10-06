import { cookies } from 'next/headers';

export async function getLanguage(): Promise<'en' | 'fr'> {
  try {
    const cookieStore = await cookies();
    const lang = cookieStore.get('preferred-language')?.value;
    return (lang === 'fr' ? 'fr' : 'en');
  } catch {
    // If cookies() is called outside request context (e.g., in generateStaticParams),
    // return default language
    return 'en';
  }
}

