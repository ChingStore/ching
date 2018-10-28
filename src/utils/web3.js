import Maker from '@makerdao/dai';

async function send({address, amount}) {
  const maker = Maker.create("browser");
  await maker.authenticate();
  let balance;
  const dai = maker.service('token').getToken("DAI");
  balance = await dai.balanceOf(address);
  console.log(balance.toString());
  try {
    const tx = await dai.transfer(address, amount);
    // await maker.service('transactionManager').confirm();
    // console.log(NETWORK);
    console.log('tx', tx._state);
  } catch (err) {
    console.error(err);
  }
  balance = await dai.balanceOf(address);
  console.log(balance.toString());
}

async function getBalance() {
  const maker = Maker.create("browser")
  await maker.authenticate()
  const dai = maker.service('token').getToken("DAI");
  const accounts = await dai._web3.eth.getAccounts();
  return await dai.balanceOf(accounts[0]);
}

export default {
  send,
  getBalance,
}
