export default class Otp{
  public readonly id:string
  public ownerId:string
  private readonly code:string
  public expiresAt:Date

  constructor(params:{
    id:string
    ownerId:string
    code:string
    expiresAt:Date
  }){
    this.id=params.id,
    this.code=params.code,
    this.ownerId=params.ownerId,
    this.expiresAt=params.expiresAt
  }

  public isExpired():boolean{
    return new Date()>this.expiresAt
  }

  public getCode():string{
    return this.code
  }

  public getExpiry():Date{
    return this.expiresAt
  }

  public match(code:string):boolean{
    return this.code===code
  }
}