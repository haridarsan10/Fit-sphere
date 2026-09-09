export default class Client{

  public readonly id:string;
  public readonly account_id:string;
  public gym_id:string | null;
  public trainer_id:string | null;

  public fitnessGoal:string | null;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params:{
    id:string,
    account_id:string,
    gym_id:string | null,
    trainer_id:string | null,
    fitnessGoal:string | null,
    createdAt: Date,
    updatedAt: Date
  }){
    this.id=params.id,
    this.account_id=params.account_id,
    this.gym_id=params.gym_id,
    this.trainer_id=params.trainer_id,
    this.fitnessGoal=params.fitnessGoal,
    this.createdAt=params.createdAt,
    this.updatedAt=params.updatedAt
  }
}