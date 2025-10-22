export enum SourceId {
  Wikipedia = 'Wikipedia',
  HackerNews = 'HackerNews',
  OpenLibrary = 'OpenLibrary',
  GitHub = 'GitHub',
}

export const DEFAULT_API_RECORDS = {
  [SourceId.Wikipedia]: [],
  [SourceId.HackerNews]: [],
  [SourceId.OpenLibrary]: [],
  [SourceId.GitHub]: [],
};

export const APIS: MyApi[] = [
  {
    url: '/api/search?source=Wikipedia&search=',
    label: 'Wikipedia Search',
    sourceId: SourceId.Wikipedia,
  },
  {
    url: '/api/search?source=HackerNews&search=',
    label: 'Hacker News Algolia',
    sourceId: SourceId.HackerNews,
  },
  {
    url: '/api/search?source=OpenLibrary&search=',
    label: 'Open Library Search',
    sourceId: SourceId.OpenLibrary,
  },
  {
    url: '/api/search?source=GitHub&search=',
    label: 'GitHub Search API',
    sourceId: SourceId.GitHub,
  },
];

export interface MyApi {
  url: string;
  label: string;
  sourceId: SourceId;
}

export interface ApiRecord {
  sourceId: SourceId;
  title: string;
  snippet: string;
  score: number;
}

export const BOOKS_FIELDS_STRING = '&fields=author_name,language,title';
