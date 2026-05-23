import fs from 'fs';
import path from 'path';

export interface MapObject {
  id: string;
  name: string;
  category: string;
  layers: string[];
  coordinates: [number, number];
  properties: Record<string, boolean>;
  description: string;
  photos: string[];
  contacts: {
    phone?: string;
    website?: string;
  };
}

export async function fetchObjects(): Promise<MapObject[]> {
  // Просто читаем файл напрямую — работает и в dev, и в production
  const filePath = path.join(process.cwd(), 'public', 'data', 'objects.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}