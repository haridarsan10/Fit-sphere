export type Gender= "MALE" | "FEMALE" | "OTHER"
export type ActivityLevel="HIGH" | "MODERATE" | "LOW"

export default class Client{

  public readonly id:string;
  public readonly account_id:string;
  public gym_id:string | null;

  public trainer_id:string | null;

  public dateOfBirth: Date | null;
  public gender: Gender | null;

  public fitnessGoal:string | null;
  public activityLevel: ActivityLevel | null;

  public createdAt: Date;
  public updatedAt: Date;

  constructor(params:{
    id:string,
    account_id:string,
    gym_id:string | null,
    trainer_id:string | null,
    dateOfBirth: Date | null,
    gender: Gender | null,
    fitnessGoal:string | null,
    activityLevel: ActivityLevel | null,
    createdAt: Date,
    updatedAt: Date
  }){
    this.id=params.id,
    this.account_id=params.account_id,
    this.gym_id=params.gym_id,
    this.trainer_id=params.trainer_id,
    this.dateOfBirth=params.dateOfBirth,
    this.gender=params.gender,
    this.fitnessGoal=params.fitnessGoal,
    this.activityLevel=params.activityLevel,
    this.createdAt=params.createdAt,
    this.updatedAt=params.updatedAt
  }
}