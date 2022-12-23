export type TTag = {
  name: string;
  url: string;
};

export type TImage = {
  "#text": string,
  size: string
}

export type TBaseType = {
  name: string;
  url: string;
  image: TImage[];
  tags: TTag[];
}

export type TSearchBaseType = {
  name: string;
  url: string;
  streamable: number;
};

export type TSearchAlbum = {
  id?: number;
  image: TImage[];
  artist: string;
} & TSearchBaseType;

export type TArtist = {
  id?: number;
  mbid?: string;
} & TBaseType;

export type TSearchArtist = {
  id: number;
  image: string;
} & TSearchBaseType;

export type TTrack = {
  artist: TArtist;
  mbid?: string;
} & TBaseType;

export type TSearchTrack = {
  listeners: number;
  image: TImage[];
  artist: string;
} & TSearchBaseType;

export type TSearchTrackInfo = {
  id?: number;
  artist: {
    name: string;
  };
  album: {
    image: TImage[];
  };
  listeners: number;
  duration: number;
} & TSearchBaseType;

export type TSearchArtistInfo = {
  stats: {
    listeners: number;
  };
  image: TImage[];
} & TSearchBaseType;