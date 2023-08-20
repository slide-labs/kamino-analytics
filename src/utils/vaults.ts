const strategies: {
  [key: string]: string;
} = {
  BfyQYYr2T9eJfMfq5gPXcq3SUkJSh2ahtk7ZNUCzkx9e: "UXD-USDC",
  CEz5keL9hBCUbtVbmcwenthRMwmZLupxJ6YtYAgzp4ex: "RAYDIUM_SOL_USDC",
  "8oZVstz1YaEdgu5yc9Bi7bi2ACT2sEfgG3ofZ8ZresC4": "JITOSOL_BSOL",
  "2dczcMRpxWHZTcsiEjPT4YBcSseTaUmWFzw24HxYMFod": "MSOL_SOL",
  BwjnMHzEE5aFxYvc587pSQRXBn6ZPvxMgi33FAtd6QF6: "MSOL_STSOL",
  "55vEQ9LEwo6s98q4MRWPpgYwiBtkhDz2ppEAkNbjWT1L": "HNT_SOL",
  H62RwxzuHiKkSTbrieJc9Xukj6ZZHfoMGZnSGnpEsWNo: "HNT_MOBILE",
  "7sfxkYUsHddBVgVE57Z4PuKrwiKbniPmZkucMDRrAvNR": "HNT_USDC",
  B9xEHj9AHhoaWZsCsKGNnaa7tojJRrd21ak7i4CevGhD: "HNT_IOT",
  Cfuy5T6osdazUeLego5LFycBQebm9PP3H7VNdCndXXEN: "USDC_USDH",
  "98kNMp1aqWoYAaUU8m5REBAYVwhFb4aX9yoSpgq8kUFu": "ORCA_USDT_USDC",
  "9LtLV3PreTYAXz7MPcg4ZgSu923zFdJXkD7TA5TqhFKy": "MSOL_JITOSOL",
  "5EfeGn1h7m6Rx9mGEmamDoxMtdhRmUh2N9fYRiDQqteS": "ORCA_SOL_USDC",
  ByXB4xCxVhmUEmQj3Ut7byZ1Hbva1zhKjaVcv3jBMN7E: "STSOL_SOL",
  "8NP2J7q6swBkVoLDZAqkejKPQrWkRizZHaVVM897CKpA": "STSOL_USDC",
  "5QgwaBQzzMAHdxpaVUgb4KrpXELgNTaEYXycUvNvRxr6": "JITOSOL_SOL",
  "2VQaDuSqqxeX2h9dS9WgpvN6ShaBxd8JjaaWEvbmTDY1": "USDT_USDH",
  "7ypH9hpQ6fLRXCVdK9Zb6zSgUvzFp44EN7PWfWdUBDb5": "BSOL_SOL",
  FAVSpnZsNWKTnPmn4qPttZjT6MiWyCQjUVzDuf6pLcTB: "ORCA_MNDE_MSOL",
  "9ypQYQP8SxEsfwcJdoGSHjSTvLt6S8dDs7XVjo97U98T": "RAYDIUM_USDT_USDC",
  "6K4jM79yijUEFxdFhCFZSjav1nZji1gsxUWQE6XrC8YD": "STSOL_ETH",
  AepjvYK4QfGhV3UjSRkZviR2AJAkLGtqdyKJFCf9kpz9: "RLB_SOL",
  CYLt3Bs51QT3WeFhjtYnPGZNDzdd6SY5vfUMa86gT2D8: "SOL_USDH",
  HWg7yB3C1BnmTKFMU3KGD7E96xx2rUhv4gxrwbZLXHBt: "BONK_SOL",
  "9zBNQtnenpQY6mCoRqbPpeePeSy17h34DZP82oegt1fL": "MSOL_USDH",
  F3v6sBb5gXL98kaMkaKm5GfEoBNUaSd3ZGErbjqgzTho: "MSOL_ETH",
  "2M1Qf5C8zJAxkqKm2AK3H2xzYxWuMbhA2rzzPig9j247": "WBTC_SOL",
  EG5DpbnuQQ988m3m1ZDpa6aPA6MnZzkikWZ6cWwjweia: "MSOL_USDC",
  "7KqB3vRJQDdGwK7ewiDpAxXpTeMmgGicdDdbftQH41XC": "ETH_USDH",
  A4ufgHTe3jLzxbR6sDdrZhLxNdR1Lw2ija1uEdDFLPbX: "DUST_SOL",
  "8XgX1EkSHC43mwdaUCZeXL2JVFz15JJynFrcxrQa3jss": "BONK_USDH",
  AjBqzzHKQ7QXukKYXxuzRCDsbRGcSJyCxjVmREXgkBMN: "SAMO_USDH",
  GX3rxBeAUuhg76eoFgAEEmQkX4pf87rv1AUhafmMhfsQ: "SOL_USDT",
  GscnFgC7WLpgcg8Mop3bX6g7jRvwaQ2BUa564pdimwUW: "SAMO_SOL",
  EDECTcgfdjdpwVPAgac4oAQwwW1oET4ZAqfRSjLaCT4v: "RAY_SOL",
  "3w1MiUh6Nn4YJLue8Ut8uwonKvFupLKve9nifDaicBf2": "STSOL_USDH",
  "46HF3cV4JBkbPbiT6HsXMkBh9qLsmifLzt8F8iNcPdnv": "HADES_SOL",
  CJhyKExm1sqFkcRnemEQj847TgqEsPEgE5GbiHFqntkH: "HNT_USDH",
  "7uGCZJSepSkWqujUw3Cz2sjXg4GW7rzJNXiKe13L7Am9": "MSOL_CGNTSOL",
  "6satrFEw7p382wkJPcS1U3AWi25YcGiJuHkt7NyJa9vi": "RAYDIUM_MNDE_MSOL",
  EoXt4R1gyuPY8PZmXL95rgecszERmCqVfnxue6QpwpyX: "USDCET_USDC",
  frAcfwyZKKVemA3pAS7E97UiX82AqMkCn56TnVuBWjL: "HADES_USDC",
};

export const renderVaultName = (strategy: string) => {
  const associatedStrategy = strategies[strategy];
  if (associatedStrategy) {
    return associatedStrategy;
  } else {
    return "";
  }
};
