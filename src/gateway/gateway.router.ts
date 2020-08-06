import express from 'express';
import YamlReader from '../yaml/yaml.reader';
import IService from '../interface/service.interface';
import proxy from 'express-http-proxy';
import LoadBalancer from './load.balancer';

export default class GatewayRouter {

  private balancers: Array<LoadBalancer> = [];

  constructor(private app: express.Express) {
    this.createServices();
  }

  /**
   * Adiciona os serviços ao LoadBalancer
   */
  private createServices(): void {
    const config = this.getConfiguration();
    const services: Array<IService> = config.services;
    
    services.forEach(service => {
      const balancer = new LoadBalancer(service);
      this.balancers.push(balancer);
      this.addRoutes(balancer);
    });
  }

  /**
   * Adiciona as rotas
   * @param balancer
   */
  private addRoutes(balancer: LoadBalancer) {
    const service = balancer.getService();
    this.app.use(service.route, proxy(() => balancer.selectServer()))
  }
  
  /**
   * Retorna as configurações
   */
  private getConfiguration(): any {
    return YamlReader.getInstance().get();
  }
}
