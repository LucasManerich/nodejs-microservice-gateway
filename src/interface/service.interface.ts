import IServer from "./server.interface";

export default interface IService {
  name: string;
  route: string;
  servers: Array<IServer>;
}