import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRecord, SourceId } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private http = inject(HttpClient);

  public callApi(url: string): Observable<any> {
    return this.http.get(url);
  }

  public processApiData(sourceId: SourceId, response: string): ApiRecord[] {
    switch (sourceId) {
      case SourceId.OpenLibrary:
        return this.processLibraryData(response);
      case SourceId.HackerNews:
        return this.processHackerNewsData(response);
      case SourceId.Wikipedia:
        return this.processWikipediaData(response);
      default:
        return [];
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
    return apiRecords;
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
    return apiRecords;
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

    return apiRecords;
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
}
