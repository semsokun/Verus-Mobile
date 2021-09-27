import { electrumServers } from './electrum/servers';
import { MAX_VERIFICATION } from '../constants/constants'
import Colors from '../../globals/colors'
import { coinsList } from './CoinsList'
import { DLIGHT_PRIVATE, ELECTRUM, ERC20, GENERAL } from '../constants/intervalConstants';

import { ENABLE_VERUS_IDENTITIES } from '../../../env/index'

import CoinLogoSvgs from '../../images/cryptologo/index'
import { ETHERS } from '../constants/web3Constants';
import { getDefaultSubWallets } from '../defaultSubWallets';
import {
  WALLET_APP_CONVERT,
  WALLET_APP_OVERVIEW,
  WALLET_APP_RECEIVE,
  WALLET_APP_SEND,
  WALLET_APP_MANAGE
} from "../constants/apps";

const getDefaultApps = (coinObj) => {
  const coinName = coinObj.display_name
  let subwallets = getDefaultSubWallets(coinObj)

  let data = [
    {
      screen: "Overview",
      icon: "format-list-bulleted",
      name: "Overview",
      key: WALLET_APP_OVERVIEW,
      color: Colors.primaryColor,
      //Verus Blue
    },
    {
      screen: "SendCoin",
      icon: "arrow-up",
      name: "Send",
      key: WALLET_APP_SEND,
      color: Colors.infoButtonColor,
      //Orange
    },
    {
      screen: "ReceiveCoin",
      icon: "arrow-down",
      name: "Receive",
      key: WALLET_APP_RECEIVE,
      color: Colors.verusGreenColor,
      //Green
    },
    {
      screen: "ConvertCoin",
      icon: "swap-horizontal-circle",
      name: "Convert",
      key: WALLET_APP_CONVERT,
      color: Colors.primaryColor,
    },
    {
      screen: "ManageCoin",
      icon: "bank-transfer",
      name: "Manage",
      key: WALLET_APP_MANAGE,
      color: Colors.primaryColor
    }
  ];

  return {
    default_app: "wallet",
    apps: {
      wallet: {
        title: coinName + " Wallet",
        data: data.filter((app) => {
          for (const subwallet of subwallets) {
            if (subwallet.compatible_apps.includes(app.key)) return true;
          }

          return false;
        }),
      },
    },
  };
}

const identityApp = {
  identity: {
    title: 'Identity App',
    data: [
      {
        screen: 'Home',
        icon: 'account-balance-wallet',
        name: 'Identity',
        key: 'Home',
        color: Colors.primaryColor
        //Verus Blue
      },
      {
        screen: 'Home',
        icon: 'account-balance-wallet',
        name: 'Personal Information',
        key: 'Personal information',
        color: Colors.primaryColor
      },
    ]
  }
}

export const explorers = {
  KMD: 'https://kmdexplorer.io',
  OOT: 'https://explorer.utrum.io',
  VRSC: 'https://explorer.veruscoin.io',
  ETH: 'https://etherscan.io',
  RFOX: 'https://etherscan.io',
  BAT: 'https://etherscan.io',
  DAI: 'https://etherscan.io',
  BAL: 'https://etherscan.io',
  BNT: 'https://etherscan.io',
  HOT: 'https://etherscan.io',
  LINK: 'https://etherscan.io',
  NEXO: 'https://etherscan.io',
  UNI: 'https://etherscan.io',
  VEN: 'https://etherscan.io',
  YFI: 'https://etherscan.io',
  ZRX: 'https://etherscan.io',
  TST: 'https://ropsten.etherscan.io',
  BTC: 'https://www.blockchain.com/btc',
  DOGE: 'https://dogeblocks.com/'
}

export const CoinLogos = {
  // btc protocol
  bch: CoinLogoSvgs.btc.BCH,		
  vrsc: CoinLogoSvgs.btc.VRSC,
  dash: CoinLogoSvgs.btc.DASH,	
  oot: CoinLogoSvgs.btc.OOT,		
  btc: CoinLogoSvgs.btc.BTC,
  testnet: CoinLogoSvgs.btc.BTC,
  dgb: CoinLogoSvgs.btc.DGB,		
  doge: CoinLogoSvgs.btc.DOGE,	
  kmd: CoinLogoSvgs.btc.KMD,		
  zec: CoinLogoSvgs.btc.ZEC,
  zectest: CoinLogoSvgs.btc.ZECTEST,
  zilla: CoinLogoSvgs.btc.ZILLA,	
  ltc: CoinLogoSvgs.btc.LTC,		
  ccl: CoinLogoSvgs.btc.CCL,
  
  // web3 protocol
  bat: CoinLogoSvgs.web3.BAT,
  tst: CoinLogoSvgs.web3.ETH,
  dai: CoinLogoSvgs.web3.DAI,
  eth: CoinLogoSvgs.web3.ETH,
  bal: CoinLogoSvgs.web3.BAL,
  bnt: CoinLogoSvgs.web3.BNT,
  hot: CoinLogoSvgs.web3.HOT,
  link: CoinLogoSvgs.web3.LINK,
  nexo: CoinLogoSvgs.web3.NEXO,
  uni: CoinLogoSvgs.web3.UNI,
  ven: CoinLogoSvgs.web3.VEN,
  yfi: CoinLogoSvgs.web3.YFI,
  zrx: CoinLogoSvgs.web3.ZRX,
  rfox: CoinLogoSvgs.web3.RFOX,
  usdt: CoinLogoSvgs.web3.USDT,
  usdc: CoinLogoSvgs.web3.USDC,
  aave: CoinLogoSvgs.web3.AAVE,

  // fiat "protocol"
  usd: CoinLogoSvgs.fiat.USD,
  aud: CoinLogoSvgs.fiat.AUD,
  eur: CoinLogoSvgs.fiat.EUR,
};

//To make flatlist render faster
export const namesList = Object.values(coinsList).map(function(coin) {
  return coin.id;
});

export const coinExistsInWallet = (coinTicker) => {
  let index = 0;

  while (index < namesList.length && namesList[index] !== coinTicker) {
    index++;
  }

  if (index < namesList.length) {
    return true;
  } else {
    return false;
  }
};

export const getCoinFromActiveCoins = (coinTicker, activeCoinsForUser) => {
  let index = 0;

  while (
    index < activeCoinsForUser.length &&
    activeCoinsForUser[index].id !== coinTicker
  ) {
    index++;
  }

  if (index < namesList.length) {
    return activeCoinsForUser[index];
  } else {
    return false;
  }
};

export const findCurrencyByImportId = (importObj) => {
  const allCoins = Object.values(coinsList)

  const coinObj = allCoins.find(coin => {
    return (
      coin.system_id === importObj.system_id &&
      coin.currency_id === importObj.currency_id
    );
  })

  return coinObj
}

export const findCoinObj = (id, userName) => {
  let coinObj = coinsList[id.toLowerCase()]

  if (coinObj) {
    coinObj.electrum_endpoints = coinObj.compatible_channels.includes(ELECTRUM) ? electrumServers[id.toLowerCase()].serverList : []
    coinObj.users = userName != null ? [userName] : [];
    
    if (!coinObj.compatible_channels.includes(DLIGHT_PRIVATE)) {
      coinObj.overrideCoinSettings = {
        privateAddrs: 0
      }
    }
    
    if (!coinObj.apps || Object.keys(coinObj.apps).length === 0) {
      const DEFAULT_APPS = getDefaultApps(coinObj)
      
      if (ENABLE_VERUS_IDENTITIES && (coinObj.id === 'VRSC' || coinObj.id === 'ZECTEST')) {
        coinObj.apps = {...identityApp, ...DEFAULT_APPS.apps};
      } else {
        coinObj.apps = DEFAULT_APPS.apps;
      }
      if (!coinObj.default_app) coinObj.default_app = DEFAULT_APPS.default_app
    } else if (!coinObj.default_app) {
      coinObj.default_app = Object.keys(coinObj.apps)[0]
    }
  }
  else {
    throw new Error(id + " not found in coin list!")
  }

  return coinObj;
}

export const getCoinObj = (coinList, coinId) => {
  return coinList.find(coinObj => {
    return coinObj.id === coinId
  })
}

export const getCoinLogo = (id) => {
  const idLc = id.toLowerCase()
  
  if (coinsList[idLc]) return CoinLogos[idLc]
  else return null
}

export const createErc20CoinObj = (contractAddress, displayName, displayTicker, description, userName) => {
  if (coinsList[displayTicker.toLowerCase()]) throw new Error(`Coin with ticker ${displayTicker} already exists in coin list`)
  let coinObj = {
    id: displayTicker,
    currency_id: contractAddress,
    system_id: '.eth',
    display_ticker: displayTicker,
    display_name: displayName,
    description: description,
    compatible_channels: [ERC20, GENERAL],
    dominant_channel: ERC20,
    decimals: ETHERS,
    tags: [],
    proto: 'erc20'
  }

  coinObj.users = userName != null ? [userName] : [];

  const DEFAULT_APPS = getDefaultApps(coinObj)

  coinObj.apps = DEFAULT_APPS.apps;
  coinObj.default_app = DEFAULT_APPS.default_app

  return coinObj;
}

// DEPRECATED
/**
 * @param {String} id The coin's identifier to be used in code
 * @param {String} name The coin's full name for display
 * @param {String} description A brief display description of the coin
 * @param {Number} defaultFee The default transaction fee for the coin (in sats)
 * @param {String[]} serverList A list of electrum servers for the coin
 * @param {String} userName The current user's username (coins must be activated with a user)
 * @param {Object} apps A list of applications the coin supports, 
 * fetched to display in the coin's menu (these still need to be written in order to be used)
 * @param {String} default_app The key of the app this coin will start on when selected
 */
export const createCoinObj = (id, name, description, defaultFee, serverList, userName, apps, default_app) => {
  let coinObj = coinsList[id];
  if (coinObj) throw new Error(`Coin with ID ${id} already exists in coin list`)

  coinObj = {
    id: id,
    display_name: name,
    description: description,
    logo: CoinLogos.default,
    fee: defaultFee,
    serverList: serverList ? serverList : [],
    users: [userName],
    compatible_channels: [ELECTRUM, GENERAL],
    apps: apps,
    default_app: default_app,
    overrideCoinSettings: {
      verificationLock: true,
      verificationLvl: MAX_VERIFICATION
    }
  }

  if (!coinObj.apps || Object.keys(coinObj.apps).length === 0) {
    const DEFAULT_APPS = getDefaultApps(coinObj)
    coinObj.apps = DEFAULT_APPS.apps
    if (!coinObj.default_app) coinObj.default_app = DEFAULT_APPS.default_app
  } else if (!coinObj.default_app) {
    coinObj.default_app = Object.keys(coinObj.apps)[0]
  }

  return coinObj;
}

