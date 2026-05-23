
import { fetchObjects } from '@/lib/fetchObjects'; 


export async function generateStaticParams() {
  const objects = await fetchObjects();
  return objects.map((obj) => ({ id: obj.id }));
}


import PlaceDetailClient from './PlaceDetailClient';

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PlaceDetailClient id={id} />;
}