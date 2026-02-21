export class SaveOnFoodsAPI {
  async getSaveOnFoodsStores(lat: number, lon: number) {
    const radius = 5;
    const limit = 3;

    const apiUrl = `https://storefrontgateway.saveonfoods.com/api/near/${lat}/${lon}/${radius}/${limit}/stores`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch save on foods stores");
    }

    const data = await response.json();
    if (data.items.length == 0) {
      throw new Error("No save on foods stores found");
    }

    if (data.items[0].retailerStoreId) {
      return data.items[0].retailerStoreId;
    }

    throw new Error("Save on foods store has no store id");
  }

  async searchProducts(storeID: string, query: string) {
    const apiUrl = `https://storefrontgateway.saveonfoods.com/api/stores/${storeID}/search?q=${query}&take=30&skip=0&page=1&sort=relevance`;

    const response = await fetch(apiUrl);
    if (response.status != 200) {
      throw new Error("invalid status code from saveonfoods");
    }

    return await response.json();
  }
}
