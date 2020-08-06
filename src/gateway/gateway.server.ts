import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import GatewayRouter from './gateway.router';

export default class GatewayServer {

  private app: express.Express;
  
  constructor() {
    this.app = express();
    this.setRoutes();
    this.configure();
  }

  /**
   * Configura o servidor HTTP
   */
  private configure() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private setRoutes() {
    const router = new GatewayRouter(this.app);
  }
  
  /**
   * Incia o servidor HTTP
   */
  public start() {
    this.app.listen(3000, () => {
      console.log('Servidor Executando...');
    });
  }
}