const strategies: Record<string, string> = {
  BfyQYYr2T9eJfMfq5gPXcq3SUkJSh2ahtk7ZNUCzkx9e: "UXD-USDC",
  CEz5keL9hBCUbtVbmcwenthRMwmZLupxJ6YtYAgzp4ex: "RAYDIUM-SOL-USDC",
  "8oZVstz1YaEdgu5yc9Bi7bi2ACT2sEfgG3ofZ8ZresC4": "JITOSOL-BSOL",
  "2dczcMRpxWHZTcsiEjPT4YBcSseTaUmWFzw24HxYMFod": "MSOL-SOL",
  BwjnMHzEE5aFxYvc587pSQRXBn6ZPvxMgi33FAtd6QF6: "MSOL-STSOL",
  "55vEQ9LEwo6s98q4MRWPpgYwiBtkhDz2ppEAkNbjWT1L": "HNT-SOL",
  H62RwxzuHiKkSTbrieJc9Xukj6ZZHfoMGZnSGnpEsWNo: "HNT-MOBILE",
  "7sfxkYUsHddBVgVE57Z4PuKrwiKbniPmZkucMDRrAvNR": "HNT-USDC",
  B9xEHj9AHhoaWZsCsKGNnaa7tojJRrd21ak7i4CevGhD: "HNT-IOT",
  Cfuy5T6osdazUeLego5LFycBQebm9PP3H7VNdCndXXEN: "USDC-USDH",
  "98kNMp1aqWoYAaUU8m5REBAYVwhFb4aX9yoSpgq8kUFu": "ORCA-USDT-USDC",
  "9LtLV3PreTYAXz7MPcg4ZgSu923zFdJXkD7TA5TqhFKy": "MSOL-JITOSOL",
  "5EfeGn1h7m6Rx9mGEmamDoxMtdhRmUh2N9fYRiDQqteS": "ORCA-SOL-USDC",
  ByXB4xCxVhmUEmQj3Ut7byZ1Hbva1zhKjaVcv3jBMN7E: "STSOL-SOL",
  "8NP2J7q6swBkVoLDZAqkejKPQrWkRizZHaVVM897CKpA": "STSOL-USDC",
  "5QgwaBQzzMAHdxpaVUgb4KrpXELgNTaEYXycUvNvRxr6": "JITOSOL-SOL",
  "2VQaDuSqqxeX2h9dS9WgpvN6ShaBxd8JjaaWEvbmTDY1": "USDT-USDH",
  "7ypH9hpQ6fLRXCVdK9Zb6zSgUvzFp44EN7PWfWdUBDb5": "BSOL-SOL",
  FAVSpnZsNWKTnPmn4qPttZjT6MiWyCQjUVzDuf6pLcTB: "ORCA-MNDE-MSOL",
  "9ypQYQP8SxEsfwcJdoGSHjSTvLt6S8dDs7XVjo97U98T": "RAYDIUM-USDT-USDC",
  "6K4jM79yijUEFxdFhCFZSjav1nZji1gsxUWQE6XrC8YD": "STSOL-ETH",
  AepjvYK4QfGhV3UjSRkZviR2AJAkLGtqdyKJFCf9kpz9: "RLB-SOL",
  CYLt3Bs51QT3WeFhjtYnPGZNDzdd6SY5vfUMa86gT2D8: "SOL-USDH",
  HWg7yB3C1BnmTKFMU3KGD7E96xx2rUhv4gxrwbZLXHBt: "BONK-SOL",
  "9zBNQtnenpQY6mCoRqbPpeePeSy17h34DZP82oegt1fL": "MSOL-USDH",
  F3v6sBb5gXL98kaMkaKm5GfEoBNUaSd3ZGErbjqgzTho: "MSOL-ETH",
  "2M1Qf5C8zJAxkqKm2AK3H2xzYxWuMbhA2rzzPig9j247": "WBTC-SOL",
  EG5DpbnuQQ988m3m1ZDpa6aPA6MnZzkikWZ6cWwjweia: "MSOL-USDC",
  "7KqB3vRJQDdGwK7ewiDpAxXpTeMmgGicdDdbftQH41XC": "ETH-USDH",
  A4ufgHTe3jLzxbR6sDdrZhLxNdR1Lw2ija1uEdDFLPbX: "DUST-SOL",
  "8XgX1EkSHC43mwdaUCZeXL2JVFz15JJynFrcxrQa3jss": "BONK-USDH",
  AjBqzzHKQ7QXukKYXxuzRCDsbRGcSJyCxjVmREXgkBMN: "SAMO-USDH",
  GX3rxBeAUuhg76eoFgAEEmQkX4pf87rv1AUhafmMhfsQ: "SOL-USDT",
  GscnFgC7WLpgcg8Mop3bX6g7jRvwaQ2BUa564pdimwUW: "SAMO-SOL",
  EDECTcgfdjdpwVPAgac4oAQwwW1oET4ZAqfRSjLaCT4v: "RAY-SOL",
  "3w1MiUh6Nn4YJLue8Ut8uwonKvFupLKve9nifDaicBf2": "STSOL-USDH",
  "46HF3cV4JBkbPbiT6HsXMkBh9qLsmifLzt8F8iNcPdnv": "HADES-SOL",
  CJhyKExm1sqFkcRnemEQj847TgqEsPEgE5GbiHFqntkH: "HNT-USDH",
  "7uGCZJSepSkWqujUw3Cz2sjXg4GW7rzJNXiKe13L7Am9": "MSOL-CGNTSOL",
  "6satrFEw7p382wkJPcS1U3AWi25YcGiJuHkt7NyJa9vi": "RAYDIUM-MNDE-MSOL",
  EoXt4R1gyuPY8PZmXL95rgecszERmCqVfnxue6QpwpyX: "USDCET-USDC",
  frAcfwyZKKVemA3pAS7E97UiX82AqMkCn56TnVuBWjL: "HADES-USDC",
};

export const renderVaultName = (strategy: string) => {
  const associatedStrategy = strategies[strategy];

  if (associatedStrategy) {
    return associatedStrategy;
  }

  return "";
};
