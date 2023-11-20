import * as dotenv from 'dotenv';

interface IConfig{
    privateKey:string
    data:string
}

dotenv.config()
export const config:IConfig = {
    privateKey: process.env.PRIVATE_KEY ||"UNKNOWN PRIVATE_KEY",
    data:process.env.DATA ||"UNKNOWN DATA"
}
