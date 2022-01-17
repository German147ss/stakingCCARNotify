var requiredPoolId = 'ccar_lovers';
var ccarAvailableAmountInWallet = 50;


function getStakingPools(){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", 'https://cryptocars.me/staking-pools', false ); // false for synchronous request
  xmlHttp.send( null );
  return JSON.parse(xmlHttp.response);
}

function checkPool() {
  const stakingPools = getStakingPools();
  const requiredPool = stakingPools.find(stakingPool => stakingPool.id === requiredPoolId);
  if (requiredPool) {
    const currentPoolSupply = requiredPool.current;
    const poolSupplyTotal = requiredPool.total;
    const minimumRequiredSupply = poolSupplyTotal - ccarAvailableAmountInWallet;
    const canAddSupply = minimumRequiredSupply >= currentPoolSupply;
    console.log("CCAR in wallet", ccarAvailableAmountInWallet)
    console.log("current pool supply:", currentPoolSupply)
    console.log("can add supply:", canAddSupply)
  } else {
    console.log("Pool not found")
  }
}

setInterval('checkPool()',5000);

//Check on sale cars
var minimumCcarToBuyCar = 323;

function getOnSaleCars(){
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", 'https://cryptocars.me/car/on-sale-list?page=1', false ); // false for synchronous request
  xmlHttp.send( null );
  return JSON.parse(xmlHttp.response).result.data;
}

function checkOnSaleCars() {
  const onSaleCars = getOnSaleCars();
  const firstCarToBuy = onSaleCars.find(onSaleCar => onSaleCar.selling_price < minimumCcarToBuyCar);
  if (firstCarToBuy) {
    window.alert(firstCarToBuy)
    window.open("google.com", "_blank")
  } else {
    console.log("not CAR found")
  }
}

setInterval('checkOnSaleCars()',7000);



