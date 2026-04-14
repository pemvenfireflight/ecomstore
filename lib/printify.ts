const PRINTIFY_API_BASE = "https://api.printify.com/v1";

type PrintifyImage = { src: string };
type PrintifyVariant = {
  id: number;
  title: string;
  price: number;
  is_enabled: boolean;
  is_available?: boolean;
};

export type PrintifyProduct = {
  id: string;
  title: string;
  description: string;
  visible?: boolean;
  images?: PrintifyImage[];
  variants?: PrintifyVariant[];
};

export type PrintifyOrderPayload = {
  external_id: string;
  line_items: Array<{ product_id: string; variant_id: number; quantity: number }>;
  address_to: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    country: string;
    region?: string;
    city: string;
    address1: string;
    address2?: string;
    zip: string;
  };
  send_shipping_notification?: boolean;
};

function getPrintifyConfig() {
  const apiKey = process.env.PRINTIFY_API_KEY;
  const shopId = process.env.PRINTIFY_SHOP_ID;

  if (!apiKey) {
    throw new Error("PRINTIFY_API_KEY is missing.");
  }

  if (!shopId) {
    throw new Error("PRINTIFY_SHOP_ID is missing.");
  }

  return { apiKey, shopId };
}

async function printifyRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const { apiKey } = getPrintifyConfig();

  const response = await fetch(`${PRINTIFY_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Printify request failed (${response.status}): ${body}`);
  }

  return (await response.json()) as T;
}

export async function fetchPrintifyProducts(): Promise<PrintifyProduct[]> {
  const { shopId } = getPrintifyConfig();
  const data = await printifyRequest<{ data?: PrintifyProduct[] }>(`/shops/${shopId}/products.json`, {
    method: "GET",
  });

  const products = data.data ?? [];

  return products.filter((product) => {
    const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
    const published = typeof product.visible === "boolean" ? product.visible : true;
    return hasVariants && published;
  });
}

export async function createPrintifyOrder(payload: PrintifyOrderPayload) {
  const { shopId } = getPrintifyConfig();
  return printifyRequest<{ id: string }>(`/shops/${shopId}/orders.json`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
