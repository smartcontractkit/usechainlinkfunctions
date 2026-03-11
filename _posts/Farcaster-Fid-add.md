console.log("Args received:", args);
console.log("Secrets received:", secrets);

const fid = args[0];
const expectedAddress = args[1];

if (!fid || !expectedAddress) {
  throw Error("Invalid input: FID or expected address missing");
}

const neynarApiKey = secrets.NEYNAR_API_KEY;

try {
  const response = await Functions.makeHttpRequest({
    url: `https://api.neynar.com/v2/farcaster/user/bulk/?fids=${fid}`,
    headers: {
      'api_key': neynarApiKey
    }
  });

  console.log("API response:", JSON.stringify(response, null, 2));

  if (response.error) {
    throw Error(`API Error: ${response.error}`);
  }

  const userData = response.data?.users?.[0];

  if (!userData || !userData.custody_address) {
    throw Error("No custody address found for the given FID");
  }

  const custodyAddress = userData.custody_address.toLowerCase();
  const expectedAddressLower = expectedAddress.toLowerCase();

  console.log("Custody address:", custodyAddress);
  console.log("Expected address:", expectedAddressLower);

  const isValid = custodyAddress === expectedAddressLower;

  return Functions.encodeString(isValid ? "true" : "false");


} catch (error) {
  console.log("Caught error:", error.message || error);
  throw Error(`Verification failed: ${error.message || error}`);
}
