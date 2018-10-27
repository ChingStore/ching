import web3 from 'web3';
import Maker from '@makerdao/dai';

const PRIVATE_KEY = '5f482aa06824ba6d822ea96ba8dbac840d382ed83ab7eff6f27d952318d3bbcc'
const NETWORK = "kovan"
const CDP_ID = 3414

function genereateQrCode(params) {
  const imgUri = {};
  return imgUri;
}

async function getBalance() {
  const maker = Maker.create(NETWORK, {
    privateKey: PRIVATE_KEY
  });
  await maker.authenticate();
  const cdp = await maker.getCdp(CDP_ID);
  await cdp.getDebtValue().then(function (value) {
    console.log(value.toString());
    return (value.toString());
  });
}



export default {
  genereateQrCode,
  getBalance
}