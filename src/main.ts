import {config} from "./config";
import {ethers, Wallet} from "ethers";

const main=()=>{
    const provider = new ethers.JsonRpcProvider("https://1rpc.io/avax/c")
    const signer = new Wallet(config.privateKey,provider)

    console.log(config)
}

main()
