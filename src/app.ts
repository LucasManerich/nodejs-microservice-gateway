import GatewayServer from './gateway/gateway.server';

(async() => {
  const gatewayCtrl = new GatewayServer();
  gatewayCtrl.start();
})();