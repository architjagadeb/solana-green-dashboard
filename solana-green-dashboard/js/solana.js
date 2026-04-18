const RPC_URL = 'https://mainnet.helius-rpc.com/?api-key=ae011a1a-05e7-4c2c-9c39-bb2f9a6b4a71';

const MOCK_TPS_DATA = [2100, 2340, 2567, 2234, 2890, 2456, 2678, 2123, 2789, 2345];

async function fetchTPS() {
  try {
    const response = await fetch(RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getRecentPerformanceSamples',
        params: [10]
      })
    });

    if (!response.ok) {
      throw new Error(`RPC request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.result || data.result.length === 0) {
      throw new Error('No performance samples returned');
    }

    // Each sample has numTransactions and samplePeriodSecs
    // TPS = numTransactions / samplePeriodSecs
    const tpsValues = data.result.map(sample => {
      return Math.round(sample.numTransactions / sample.samplePeriodSecs);
    });

    console.log('Live TPS data fetched successfully:', tpsValues);
    return tpsValues;

  } catch (error) {
    console.warn('Error fetching TPS from Solana RPC, using fallback data:', error);
    return MOCK_TPS_DATA;
  }
}

// Returns only the latest single TPS value (most recent sample)
async function fetchLatestTPS() {
  const tpsArray = await fetchTPS();
  return tpsArray[0];
}

// Returns full array of 10 TPS samples for the line chart
async function fetchTPSHistory() {
  return await fetchTPS();
}