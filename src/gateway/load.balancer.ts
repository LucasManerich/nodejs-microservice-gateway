import IService from "../interface/service.interface";

export default class LoadBalancer {
  private currentServer = 0;

  constructor(private service: IService) {}

  /**
   * Retorna o serviço
   */
  public getService(): IService {
    return this.service;
  }

  /**
   * Retorna o servidor que iremos executar o serviço
   */
  public selectServer(): string {
    const serverIndex = this.currentServer % this.service.servers.length;
    this.currentServer++;
    const server = this.service.servers[serverIndex];
    console.log(server);
    return server.url;
  }
}