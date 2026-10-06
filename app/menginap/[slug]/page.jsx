import { redirect } from 'next/navigation';

export default function MenginapSlugPage({ params }) {
  redirect(`/penginapan/${params.slug}`);
}
