import { map } from "rxjs/operators";
import { SkApiService } from "./../service/sk-api.service";
import { Component } from "@angular/core";
import * as moment from "moment";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { LoadingController } from "@ionic/angular";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"]
})
export class HomePage {
    allStudentsList: Array<Object> = [];
    lodaingStudentData = false;
    studentDataForCheckInCheckOut: Array<Object> = [];

    constructor(
        private router: Router,
        public alertController: AlertController,
        private storage: Storage,
        private skApi: SkApiService,
        private callNumber: CallNumber,
        public loadingController: LoadingController
    ) {
        // this.storage.get("apiKey").then(data => {
        //     if (!data) {
        //         this.router.navigate(["/login"]);
        //     }
        // });
        
        this.allStudentsList = [
            {
                id: '1',
                name: "Sam",
                class: "LKG",
                father: {
                    name: "Ashish",
                    phone: "9845612531"
                },
                mother: {
                    name: "Shamala",
                    phone: "8645234567"
                },
                image: `assets/kid-1.jpg`
            },
            {
                id: '2',
                name: "Rio",
                class: "UKG",
                father: {
                    name: "Sujan",
                    phone: "924512534"
                },
                mother: {
                    name: "Richa",
                    phone: "753234567"
                },
                image: `assets/kid-2.jpg`
            },
            {
                id: '3',
                name: "Maggie",
                class: "LKG",
                father: {
                    name: "Mahesh",
                    phone: "774512595"
                },
                mother: {
                    name: "Sneha",
                    phone: "883234568"
                },
                image: `assets/kid-3.jpg`
            },
            {
                id: '4',
                name: "Shiv",
                class: "UKG",
                father: {
                    name: "Naveen",
                    phone: "884512595"
                },
                mother: {
                    name: "Sneha",
                    phone: "983234568"
                },
                image: `assets/kid-4.jpg`
            },
            {
                id: '5',
                name: "Kumar",
                class: "UKG",
                father: {
                    name: "Mahesh",
                    phone: "774512595"
                },
                mother: {
                    name: "Sunil",
                    phone: "8809234568"
                },
                image: `assets/kid-5.jpg`
            },
            {
                id: '6',
                name: "Walt",
                class: "UKG",
                father: {
                    name: "Suresh",
                    phone: "774002595"
                },
                mother: {
                    name: "Sneha",
                    phone: "899234568"
                },
                image: `assets/kid-6.jpg`
            },
            {
                id: '7',
                name: "Karen",
                class: "LKG",
                father: {
                    name: "Rahul",
                    phone: "994512595"
                },
                mother: {
                    name: "Sneha",
                    phone: "884234568"
                },
                image: `assets/kid-7.jpg`
            }
        ];
        
    }

    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    dayName = this.days[new Date().getDay()];
    dateDayForHeader = moment().format("MMM D, YYYY, ");
    activeTab = "list";

    ngOnInit() {
        this.setStudentDataForCheckInCheckOut();
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: "Loading"
        });
        return loading;
    }

    setStudentDataForCheckInCheckOut() {
        const studentData = this.allStudentsList.map(student => {
            student['checkInTime'] = "";
            student['checkOutTime'] = "";
            return student;
        });
        this.storage.set("studentCheckInCheckOutData", studentData).then(success => {
            this.studentDataForCheckInCheckOut = success;
        });
    }

    editStudentData(studentDetails) {
        this.router.navigate(["/add-student"], studentDetails);
    }

    changeTab(tab) {
        this.activeTab = tab;
    }

    addStudent() {
        this.router.navigate(["/add-student"]);
    }

    getAllStudents() {
        this.skApi.getAllStudents().subscribe(
            res => {
                this.allStudentsList = res["studentlist"];
            },
            err => {
                console.log(err);
            }
        );
    }

    callPhoneNumber(number) {
        this.callNumber
            .callNumber(number, true)
            .then(res => console.log("Launched dialer!", res))
            .catch(err => console.log("Error launching dialer", err));
    }

    async checkInStudent(studentDetail) {
        const loader = await this.presentLoading();
        await loader.present();
        this.storage.get("studentCheckInCheckOutData").then(data => {
            const updatedStudentData = data.map(student => {
                if (student.id == studentDetail.id) {
                    student.checkInTime = new Date();
                    return student;
                }
                return student;
            });
            this.storage
                .set("studentCheckInCheckOutData", updatedStudentData)
                .then(async success => {
                    this.studentDataForCheckInCheckOut = success;
                    await loader.dismiss();
                });
        });
    }

    async checkOutStudent(studentDetail) {
        const loader = await this.presentLoading();
        await loader.present();
        this.storage.get("studentCheckInCheckOutData").then(data => {
            const updatedStudentData = data.map(student => {
                if (student.id == studentDetail.id) {
                    student.checkOutTime = new Date();
                    return student;
                }
                return student;
            });
            this.storage
                .set("studentCheckInCheckOutData", updatedStudentData)
                .then(async success => {
                    this.studentDataForCheckInCheckOut = success;
                    await loader.dismiss();
                });
        });
    }

    checkIfCheckedInStudents() {
        this.storage.get("studentCheckInCheckOutData").then(data => {
            let checkedInStudentsAvailable = false;
            data.map(student => {
                if (student.checkInTime) {
                    checkedInStudentsAvailable = true;
                }
            });
            return !checkedInStudentsAvailable;
        });
    }

    async deleteStudentAlert(student) {
        const alert = await this.alertController.create({
            header: "Confirm!",
            message: `<strong>${student.name}</strong> will be deleted.`,
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel",
                    cssClass: "secondary"
                },
                {
                    text: "Okay",
                    handler: () => {
                        console.log("Confirm Okay");
                    }
                }
            ]
        });
        await alert.present();
    }
}
