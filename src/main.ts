import {config} from "./config";
import {ethers, JsonRpcProvider, Wallet} from "ethers";
import { formatUnits } from "@ethersproject/units";
async function updateBalance (provider:JsonRpcProvider,address:string):Promise<number>{
    const bigIntBalance = await provider.getBalance(address)

    return +formatUnits(bigIntBalance,"ether")
}
const main=async ()=>{
    let count = 0
    const provider = new ethers.JsonRpcProvider("https://fantom.publicnode.com")
    const signer = new Wallet(config.privateKey,provider)
    const address = await signer.getAddress()
    let balance = await updateBalance(provider,address)
    let feeData = await provider.getFeeData();
    console.log("Connected Wallet:", address," Total Amount:",balance)
    while (balance>5){
       try {
           const tx = await signer.sendTransaction({to:address,data:config.data,gasPrice:feeData.gasPrice})
           await tx.wait()
           count++
           balance = await updateBalance(provider,address)
           console.log({
               hash:tx.hash,
               count:count,
               balance,
               gas:ethers.formatUnits(feeData.gasPrice!, "ether")
           })
       }catch (e) {
           feeData = await provider.getFeeData();
       }
    }
}

main()
