import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import * as Config from './config.json';


@Injectable()
export class HttpClient {
  baseUrl:string = Config.baseUrl
  $http: Http;
  defaultOptions = {
  }

  constructor(public http: Http) {
    this.$http = http;
  }

  resolveUrl(endPoint:string):string {
    let _base = this.baseUrl;
    if (_base[_base.length - 1] == '/') {
      _base = _base.substr(0, _base.length - 1);
    }
    let _end = endPoint;
    if (_end[0] == '/') {
      _end = _end.substr(1);
    }

    return _base + '/' + _end;
  }

  resolveOptions(options:any) {
    let opt = Object.assign({withCredentials: true }, options);
    new RequestOptions();
    return opt;
  }

  get(endPoint:string, options?: any):any {

    return this.$http.get(this.resolveUrl(endPoint), this.resolveOptions(options))
      .toPromise()
      .then((res:Response) => res.json())
  }

  post(endPoint:string, data: any, options?: any):any {
    return this.$http.post(this.resolveUrl(endPoint), data, this.resolveOptions(options))
      .toPromise()
      .then((res:Response) => {
        let headers: Headers = res.headers;
        let x = headers.getAll('set-cookie');
        console.log('xxx');
        console.log(x);
        console.log(headers);
        return res.json();
      })
  }

  put(endPoint:string, data: any, options?: any):any {
    return this.$http.put(this.resolveUrl(endPoint), data, this.resolveOptions(options))
      .toPromise()
      .then((res:Response) => res.json())
  }

  delete(endPoint:string, options?: any):any {
    return this.$http.delete(this.resolveUrl(endPoint), this.resolveOptions(options))
      .toPromise()
      .then((res:Response) => res.json())
  }
}
