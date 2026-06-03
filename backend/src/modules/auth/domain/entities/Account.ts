export type AccountStatus= "PENDING" | "ACTIVE" | "APPROVED";
export type Role="User" | "Trainer" | "Gymowner"

export default class Account{
    public readonly id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public status: AccountStatus;
    public role:Role


  constructor(params:{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    status?:AccountStatus
    role:Role
  }){
    this.id=params.id,
    this.firstName=params.firstName,
    this.lastName=params.lastName,
    this.email=params.email,
    this.password=params.password,
    this.status=params.status??"PENDING"
    this.role=params.role
  }

  public activate(){
    this.status = "ACTIVE";
  }

  public isActive(){
    return this.status==='ACTIVE'
  }
}