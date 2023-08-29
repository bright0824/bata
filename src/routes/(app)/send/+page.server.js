import axios from 'axios';
export const prerender = true;

export async function load () {

	const priceConversion = {
		btc: await getPrice('BTC'),
		eth: await getPrice('ETH'),
		trx: await getPrice('TRX'),
		matic: await getPrice('MATIC')
	}

	return priceConversion;

}

const getPrice = async (symbol) => {
	try {
		const res = await axios.get(`https://pro-api.coinmarketcap.com/v2/tools/price-conversion`, {
			headers: {
				'X-CMC_PRO_API_KEY': 'd818321d-d67d-4882-8522-143c2f160698',
			},
			params: { amount: 1, symbol },
		});
		const price = res.data.data[0].quote.USD.price;
		//console.log(price, "token price testing")
		return price;

	} catch (error) {
        console.log('error=>', error)
		return 0;
	}
} 
