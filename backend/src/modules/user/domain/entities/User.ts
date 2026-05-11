export type UserStatus= "PENDING" | "ACTIVE" | "APPROVED";


export default class User{
    public readonly id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public phoneNumber: string;
    public status: UserStatus;


  constructor(params:{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    phoneNumber:string,
    status?:UserStatus
  }){
    this.id=params.id,
    this.firstName=params.firstName,
    this.lastName=params.lastName,
    this.email=params.email,
    this.password=params.password,
    this.phoneNumber=params.phoneNumber,
    this.status=params.status??"PENDING"
  }

  public activate() {
    this.status = "ACTIVE";
  }

  public isActive(){
    return this.status==='ACTIVE'
  }
}