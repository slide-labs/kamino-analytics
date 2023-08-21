const KEYS = process.env.NEXT_PUBLIC_API_KEYS?.split(",") || [];

const HELIUS_API = `https://rpc.helius.xyz/?api-key=${
  KEYS[Math.floor(Math.random() * KEYS.length)]
}`;

export default HELIUS_API;
