import Maker from '@makerdao/dai';

let maker
let dai
let initPromise = init()

async function init() {
  maker = Maker.create("browser");
  await maker.authenticate();
  dai = maker.service('token').getToken("DAI");
}

async function ensureInit() {
  if (!initPromise) {
    initPromise = await init()
  } else if (!initPromise.done) {
    await initPromise
  }
}


async function send({address, amount}) {
  // await ensureInit()
  maker = Maker.create("browser");
  await maker.authenticate();
  dai = maker.service('token').getToken("DAI");

  let balance;
  balance = await dai.balanceOf(address);
  console.log(balance.toString());
  try {
    const tx = await dai.transfer(address, amount);
    console.log('tx', tx._state);
  } catch (err) {
    console.error(err);
  }
  balance = await dai.balanceOf(address);
  console.log(balance.toString());
}

async function getAddress() {
  // await ensureInit()
  maker = Maker.create("browser");
  await maker.authenticate();
  dai = maker.service('token').getToken("DAI");

  const account = await dai._web3.eth.getAccounts();
  return account;
}

async function getBalance() {
  // await ensureInit()
  maker = Maker.create("browser");
  await maker.authenticate();
  dai = maker.service('token').getToken("DAI");

  return await dai.balanceOf(await getAddress());
}

export default {
  send,
  getAddress,
  getBalance,
}
