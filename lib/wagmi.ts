import { 
  createConfig, 
  http, 
  cookieStorage,
  createStorage 
} from 'wagmi'
import { fuse } from 'wagmi/chains'

export function getConfig() {
  return createConfig({
    chains: [fuse],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [fuse.id]: http(),
    },
  })
}
