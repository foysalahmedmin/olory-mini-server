class AppResponse {
    public status : number;
    public success : boolean;
    public message : string;
    public data : any;
  constructor(success : boolean, status : number, message : string = "", data : any = null) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export default AppResponse;