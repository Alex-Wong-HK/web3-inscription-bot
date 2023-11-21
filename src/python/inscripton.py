from web3 import Web3

address = 'walletAddress'
_p = 'privateKeyhere'
rpc_url = 'https://1rpc.io/avax/c'
web3 = Web3(Web3.HTTPProvider(rpc_url))
print(web3.is_connected())
print(Web3.from_wei(web3.eth.get_balance(address),'ether'))
c=0
_d_t = b'data:,{"p":"asc-20","op":"mint","tick":"aval","amt":"100000000"}'
_d = '0x646174613a2c7b2270223a226173632d3230222c226f70223a226d696e74222c227469636b223a226176616c222c22616d74223a22313030303030303030227d'

while True:
    print(Web3.from_wei(web3.eth.get_balance(address),'ether'))
    nonce = web3.eth.get_transaction_count(address)
    tx = {
        'nonce': nonce,
        'chainId': 43114,
        'to': address,
        'from':address,
        'data':_d,
        'maxFeePerGas': Web3.to_wei(195, 'gwei'),
        'maxPriorityFeePerGas': Web3.to_wei(18, 'gwei'),
        # 'gas': 24000,
        'value': Web3.to_wei(0, 'ether')
    }
    try:
        gas = web3.eth.estimate_gas(tx)
        tx['gas'] = gas
        print(tx)
        signed_tx = web3.eth.account.sign_transaction(tx,_p)
        tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        print(web3.to_hex(tx_hash))
        receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
        print("done", receipt)
        if receipt.status == 1:
            c = c+1
            print("%s Mint Success!" %c)
            continue
        else:
            continue
    except Exception as e:
        print(e)
