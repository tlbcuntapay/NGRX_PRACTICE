export interface Walk {
  id: string;
  name: string;
  description?: string;
  lengthInKm: number;
  walkImageUrl: string;
  region: Region;
  difficulty: Difficulty
}


interface Region {
  id: string;
  code: string;
  name: string;
  regionImageUrl: string;
}

interface Difficulty {
  id: string;
  name: string;
}