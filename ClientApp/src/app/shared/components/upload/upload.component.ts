import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() public onUploaded = new EventEmitter();
  @Input() public image: string;
  @Input() public size: string;

  constructor(private http: HttpClient) {
    if (!this.image) {
      const defaultImages = [
        "https://localhost:44392/assets/img/restaurants/1.jpeg",
        "https://localhost:44392/assets/img/restaurants/2.jpeg",
        "https://localhost:44392/assets/img/restaurants/3.jpeg",
        "https://localhost:44392/assets/img/restaurants/4.jpeg",
        "https://localhost:44392/assets/img/restaurants/5.jpeg",
        "https://localhost:44392/assets/img/restaurants/6.jpeg",
        "https://localhost:44392/assets/img/restaurants/7.jpeg",
        "https://localhost:44392/assets/img/restaurants/8.jpeg",
      ];
      const randomImageIdx = Math.floor(Math.random() * defaultImages.length);
      this.image = defaultImages[randomImageIdx];
    } 
  }
  ngOnInit(): void {
    const response = {
      imagePath: this.image
    }
    this.onUploaded.emit(response);
  }

  public upload(files) {
    if (!files || files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post('https://localhost:44392/api/upload', formData, { observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.image = event.body["imagePath"];
          this.onUploaded.emit(event.body);
        }
      });
  }

  sizeClass() {
    switch (this.size) {
      case 'small':
      case 'medium':
      case 'large':
        return this.size;
      default:
        return 'large';
    }
  }
}
