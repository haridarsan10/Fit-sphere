import Client from "../entities/Client.js";

export default interface ClientRepository{
  create(client: Client):Promise<Client>;
  findById(clientId: string):Promise<Client|null>;
  update(client: Client):Promise<Client>;
  delete(clientId: string):Promise<void>;
}