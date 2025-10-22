import { AppComponent } from './app.component';
import { signal, WritableSignal } from '@angular/core';
import { ApiRecord, SourceId } from '../interfaces/interfaces';
import {
  PROCESSED_RESPONSES,
  STRNGIFIED_HACKER_JSON,
} from '../services/testMock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiCallService } from '../services/apiCall.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent save', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiCallService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    component.apiRecords = signal({
      Wikipedia: PROCESSED_RESPONSES[0],
      HackerNews: PROCESSED_RESPONSES[1],
      OpenLibrary: PROCESSED_RESPONSES[2],
      GitHub: PROCESSED_RESPONSES[3],
    }) as WritableSignal<Record<SourceId, ApiRecord[]>>;

    component.searchString = 'hobbit';
  });

  it('should produce correct stringified JSON for selected records', () => {
    component.selectedHackerNewsRecords.push(PROCESSED_RESPONSES[1][1]);
    const spy = spyOn<any>(component, 'saveDataToFile').and.callThrough();

    component.save();

    expect(spy).toHaveBeenCalledOnceWith(STRNGIFIED_HACKER_JSON, 'hobbit');
  });

  xit('should include all records when saveAll = true', () => {
    const json = component['getStringifiedObject'](true); // saveAll = true

    const expected = JSON.stringify(
      {
        Wikipedia: [{ title: 'Hobbit', url: 'wiki-url' }],
      },
      null,
      2,
    );

    expect(json).toBe(expected);
  });
});
