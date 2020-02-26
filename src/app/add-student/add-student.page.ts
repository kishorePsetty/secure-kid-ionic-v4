import { SkApiService } from './../service/sk-api.service';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage implements OnInit {

  constructor(private camera: Camera, private router: Router, private skApi: SkApiService) { }

  studentDetails = {
    schoolid: "1",
    name: "Naveen",
    class: "LKG",
    fathername: "Rahul",
    fathernumber: "9876547321",
    mothername: "Mala",
    mothernumber: "7893453213",
    drivername: "danme",
    drivernumber: "9837245322",
    guestname: "Thejas",
    guestnumber: "86683738432",
    relationship: "Brother",
    vanuses: "0",
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  initialStudentImageSource = 'assets/pick-student-avatar.png';
  initialGuestImageSource = 'assets/pick-student-avatar.png';

  ngOnInit() {
    
  }

  captureStudentImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.initialStudentImageSource = base64Image;
     }, (err) => {
      alert(err);
      // Handle error
     });
  }

  captureGuestImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.initialGuestImageSource = base64Image;
     }, (err) => {
       alert(err);
      // Handle error
     });
  }

  cancelAddingStudent() {
    this.router.navigate(['/home']);
  }

  addStudent() {
    this.skApi.addStudent(this.studentDetails).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }
}
