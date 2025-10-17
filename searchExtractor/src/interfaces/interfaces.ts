export enum SourceId {
  Wikipedia = 'Wikipedia',
  HackerNews = 'HackerNews',
  OpenLibrary = 'OpenLibrary',
  GitHub = 'GitHub',
}

export const APIS: MyApi[] = [
  {
    url: 'https://en.wikipedia.org/api/rest_v1/page/title/',
    label: 'Wikipedia Search',
    sourceId: SourceId.Wikipedia,
  },
  {
    url: 'https://hn.algolia.com/api/v1/search?query=',
    label: 'Hacker News Algolia',
    sourceId: SourceId.HackerNews,
  },
  {
    url: 'https://openlibrary.org/search.json?q=',
    label: 'Open Library Search',
    sourceId: SourceId.OpenLibrary,
  },
  {
    url: 'aaa',
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
