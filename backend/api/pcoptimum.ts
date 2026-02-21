import { v4 as uuidv4 } from "uuid";

export class PCOptimumAPI {
  async searchProducts(keyword: string, storeId: string) {
    let payload = {
      cart: { cartId: "" },
      fulfillmentInfo: {
        storeId: storeId,
        pickupType: "STORE",
        offerType: "OG",
        date: this.currentDateFormatted(),
        timeSlot: null,
      },
      listingInfo: {
        filters: { "search-bar": [keyword] },
        sort: {},
        pagination: { from: 1 },
        includeFiltersInResponse: true,
      },
      banner: "superstore",
      userData: {
        domainUserId: uuidv4(),
        sessionId: uuidv4(),
      },
      device: { screenSize: 1536 },
      searchRelatedInfo: {
        term: keyword,
        options: [
          { name: "rmp.unifiedSearchVariant", value: "Y" },
          { name: "bff.exp.next_gen_active", value: "variant" },
        ],
      },
    };

    const response = await fetch(
      "https://api.pcexpress.ca/pcx-bff/api/v2/products/search",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en",
          "business-user-agent": "PCXWEB",
          "cache-control": "no-cache",
          "content-type": "application/json",
          "is-helios-account": "false",
          "is-iceberg-enabled": "true",
          origin_session_header: "B",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-apikey": "C1xujSegT5j3ap3yexJjqhOfELwGKYvz",
          "x-application-type": "Web",
          "x-channel": "web",
          "x-loblaw-tenant-id": "ONLINE_GROCERIES",
          "x-preview": "false",
          Referer: "https://www.realcanadiansuperstore.ca/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: JSON.stringify(payload),
        method: "POST",
      },
    );

    if (response.status != 200) {
      // invalid err
      throw new Error("invalid status code from superstore");
    }

    return await response.json();
  }

  currentDateFormatted(date = new Date()) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}${month}${year}`;
  }
}
