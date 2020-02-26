import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Storage } from "@ionic/storage";

@Injectable({
    providedIn: "root"
})
export class SkApiService {
    baseUrl: String = "http://securekid.in/api";
    routes: Object = {
        login: "/login",
        logout: "/logout",
        allStudentsList: "/studentsList",
        addStudent: '/addStudent',
    };

    constructor(private http: HttpClient, private storage: Storage) {}

    loginUser(loginData: Object): Observable<any> {
        return this.http
            .post(this.baseUrl + this.routes["login"], loginData)
            .pipe(tap(_ => console.log("response received")));
    }

    getAllStudents() {
        return this.http
            .get(this.baseUrl + this.routes["allStudentsList"])
            .pipe(tap(_ => console.log("response received")));
    }

    addStudent(studentDetails: Object) {
        return this.http
            .post(this.baseUrl + this.routes["addStudent"], studentDetails)
            .pipe(tap(_ => console.log("response received")));
    }
}
