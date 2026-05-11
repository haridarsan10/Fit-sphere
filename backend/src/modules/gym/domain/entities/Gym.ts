export type GymStatus="PENDING"|"ACTIVE"|'SUSPENDED'|'REJECTED';

export interface GymProps {
  id: string
  name: string
  description: string
  address: string
  contact_phone: string
  email: string
  owner_id: string
  status?: GymStatus
  reject_reason?: string
  max_members: number
  max_trainers: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}


export default class Gym{
  public readonly id:string;
  public name:string;
  public description:string;
  public address:string;
  public contact_phone:string;
  public email:string;
  public owner_id:string;
  public status:GymStatus;
  public reject_reason:string|null;
  public max_members:number;
  public max_trainers:number;
  public created_at:Date|null;
  public updated_at:Date|null
  public deleted_at:Date|null

  constructor(params:{
    id:string,
    name:string,
    description:string,
    address:string,
    contact_phone:string,
    email:string,
    owner_id:string,
    status?:GymStatus,
    reject_reason?:string, 
    max_members:number,
    max_trainers:number,
    created_at?:Date,
    updated_at?:Date,
    deleted_at?:Date
  }){
    this.id=params.id,
    this.name=params.name,
    this.description=params.description
    this.address=params.address
    this.contact_phone=params.contact_phone
    this.email=params.email
    this.owner_id=params.owner_id
    this.status=params.status ?? "PENDING"
    this.reject_reason=params.reject_reason ?? null
    this.max_members=params.max_members
    this.max_trainers=params.max_trainers
    this.created_at=params.created_at ?? new Date()
    this.updated_at=params.updated_at??null
    this.deleted_at=params.deleted_at??null
  }

  public isActive(){
    return this.status==='ACTIVE'
  }

  public approve(){
    if(this.status==='ACTIVE'){
      throw new Error('Gym is already active.')
    }

    if(this.status==='SUSPENDED'){
      throw new Error('Gym is suspended.')
    }

    this.status='ACTIVE'
    this.reject_reason=null
    this.updated_at=new Date()
  }
}