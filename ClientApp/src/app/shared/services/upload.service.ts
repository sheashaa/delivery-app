import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';


export class UploadService {
  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44392/api/upload';

  public upload(files) {
    return Observable.create(
      (observer: any) => {
        if (files.length === 0) {
          observer.next(undefined);
          return;
        }

        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

        this.http.post(this.baseUrl, formData, { observe: 'events' })
          .subscribe(event => {
            if (event.type === HttpEventType.Response) {
              observer.next(event.body);
            }
          });
      }
    );
  }
}
