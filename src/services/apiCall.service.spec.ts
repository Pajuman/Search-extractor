import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ApiCallService } from './apiCall.service';
import { APIS, SourceId } from '../interfaces/interfaces';
import { MOCK_RESPONSES, PRECESSED_RESPONSES } from './testMock';

describe('ApiCallService', () => {
  let service: ApiCallService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ApiCallService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(ApiCallService);
  });

  it('should process mocked response WIKIPEDIA_RESPONSE and create record in apiRecords signal', fakeAsync(() => {
    const sourceIds = Object.values(SourceId);
    for (let i = 0; i < APIS.length; i++) {
      httpClientSpy.get.and.returnValue(of(MOCK_RESPONSES[i]));

      service.callApi('hobit', APIS[i]);
      tick();
      const expectedUrl = APIS[i].url + 'hobit';
      expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
      expect(service.apiRecords()[sourceIds[i]]).toEqual(
        PRECESSED_RESPONSES[i],
      );
    }
  }));
});
