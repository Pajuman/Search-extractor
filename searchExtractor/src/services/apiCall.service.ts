import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiRecord,
  BOOKS_FIELDS_STRING,
  MyApi,
  SourceId,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  public apiRecords: WritableSignal<Record<SourceId, ApiRecord[]>> = signal({
    [SourceId.Wikipedia]: [],
    [SourceId.HackerNews]: [],
    [SourceId.OpenLibrary]: [],
    [SourceId.GitHub]: [],
  });
  private http = inject(HttpClient);

  public callApi(searchString: string, myApi: MyApi) {
    const url = this.getUrl(myApi, searchString);
    this.http.get<string>(url).subscribe({
      next: (res) => {
        console.log(res);
        this.processApiData(myApi.sourceId, res);
      },
      error: (err) => console.error(err),
    });
  }

  public processApiData(sourceId: SourceId, response: string) {
    switch (sourceId) {
      case SourceId.OpenLibrary:
        this.processLibraryData(response);
        break;
      case SourceId.HackerNews:
        this.processHackerNewsData(response);
        break;
      case SourceId.Wikipedia:
        this.processWikipediaData(response);
        break;
      case SourceId.GitHub:
        this.processGitHubData(response);
        break;
    }
  }

  private processWikipediaData(response: any) {
    const apiRecords: ApiRecord[] = [];
    if (response.title && response.html_url && response.latest.timestamp) {
      const title = response.title;
      const snippet: string = response.html_url;
      const timestampStr = response.latest.timestamp;
      const score = this.getAgeInMonths(timestampStr);

      const apiRecord: ApiRecord = {
        sourceId: SourceId.Wikipedia,
        title: title,
        snippet: snippet,
        score: score,
      };
      apiRecords.push(apiRecord);
    }
    this.apiRecords().Wikipedia = apiRecords;
  }

  private processHackerNewsData(response: any) {
    const apiRecords: ApiRecord[] = [];
    const hits: any[] = response.hits;
    hits.forEach((hit) => {
      if (hit.title && hit.author && hit.points) {
        const title = hit.title;
        const snippet: string = hit.author;
        const score = hit.points;
        const apiRecord: ApiRecord = {
          sourceId: SourceId.HackerNews,
          title: title,
          snippet: snippet,
          score: score,
        };
        apiRecords.push(apiRecord);
      }
    });
    this.apiRecords().HackerNews = apiRecords;
  }

  private processLibraryData(response: any) {
    const apiRecords: ApiRecord[] = [];
    const authors: any[] = response.docs;
    authors.forEach((author) => {
      if (author.title && author.author_name && author.language) {
        const title = author.title;
        const snippet: string = author.author_name.join(', ');
        const score = author.language.length;
        const apiRecord: ApiRecord = {
          sourceId: SourceId.OpenLibrary,
          title: title,
          snippet: snippet,
          score: score,
        };
        apiRecords.push(apiRecord);
      }
    });

    this.apiRecords().OpenLibrary = apiRecords;
  }

  private processGitHubData(response: any) {
    console.log(1);
    const apiRecords: ApiRecord[] = [];
    const items: any[] = response.items;
    items.forEach((item) => {
      if (item.name && item.description && item.stargazers_count) {
        const title = item.name;
        const snippet: string = item.description;
        const score = item.stargazers_count;
        const apiRecord: ApiRecord = {
          sourceId: SourceId.GitHub,
          title: title,
          snippet: snippet,
          score: score,
        };
        apiRecords.push(apiRecord);
      }
    });

    this.apiRecords().GitHub = apiRecords;
    console.log(this.apiRecords().GitHub);
  }

  private getAgeInMonths(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();

    const yearsDiff = now.getFullYear() - date.getFullYear();
    const monthsDiff = now.getMonth() - date.getMonth();

    // Total months difference
    let totalMonths = yearsDiff * 12 + monthsDiff;

    // If the current day is before the timestamp day, subtract 1 month
    if (now.getDate() < date.getDate()) {
      totalMonths -= 1;
    }

    return totalMonths;
  }

  private getUrl(myApi: MyApi, searchString: string) {
    let url = myApi.url + searchString;
    switch (myApi.sourceId) {
      case SourceId.OpenLibrary:
        return url + BOOKS_FIELDS_STRING;
      default:
        return url;
    }
  }
}
