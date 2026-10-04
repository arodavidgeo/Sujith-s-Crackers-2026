import { Product, Order, ShopSettings, ProductCategory } from '../types';

export const INITIAL_SETTINGS: ShopSettings = {
  business_name: "Sujith's Cracker",
  phone: "9788927795",
  upi_id: "gracemansujith@okhdfcbank",
  location_url: "https://maps.app.goo.gl/cJmhjLryX8mshDsN9",
  free_delivery_threshold: 5000,
  standard_delivery_fee: 250,
  owner_notification_email: "",
  delivery_zones: "Direct delivery across Tamil Nadu, Bangalore and nearby regions",
  contact_email: "",
  opening_hours: "9:00 AM - 10:00 PM (Daily)",
  license_number: ""
};

export const INITIAL_CATEGORIES: ProductCategory[] = [
  'Ground Crackers',
  'Sparklers',
  'Aerial Crackers',
  'Sound Crackers',
  'Fancy Crackers',
  'Gift Boxes'
];

// Development / Demo Seed Data (From Stitch Design)
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "sc-prod-001",
    name: "Flower Pot Deluxe (Pack of 10)",
    description: "Golden fountain sparkle with zero-choke smoke chemistry. Sturdy terracotta-style cones emitting high-density golden embers.",
    category: "Ground Crackers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSoWBk6bghq3jk4MgZD6NonTcHqpAtnv7qmicWlN5LlnNLEhtFrKbe7BulglI13B2CZ3lKOylBM8kB_8GiOvWdnWlW9-hZtjI0LTatGDBIAPdHa4hk3ZLaD0p1VnZN-DnL30Ej4DUZLXd83xhpBO5bLlLYy1NxfytDkJwABc3hvT2bvHmy2RexQtN1Aj2DmpN7PycE0UYlPR1_8ZxHQRSCCGwoSxefj-pYbecF7Zk4qorruxAy1T28Vw",
    original_price: 350,
    offer_price: 249,
    stock: 140,
    is_available: true,
    unit_info: "Box of 10 Cones",
    safety_info: "Place firmly on flat dry ground. Light with an agarbatti or sparkler at arm's length. Maintain 5 meters clearance.",
    delivery_info: "Packed in moisture-resistant 5-ply carton box. Safe transit guaranteed.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sc-prod-002",
    name: "1000 Wala Deluxe Garland",
    description: "Crisp rhythmic crackle roll tested to compliant decibel levels. Traditional red firecracker lari rolled tightly with green fuse.",
    category: "Sound Crackers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArCfISg8inIPuSF9mwCMLe-kThMKdBwu5MkRzyBhBAJjG_4mwxLC23EiVAi_scdw0oo9vMyWU-aNkw2pKd_VfNCBBfbcK49Humqt1_aXDnXQCkih1ybo_pb2pRAB95aGTc_CoxDRsPpy2b_SoqgOvK39MwlQmytCpMzY0QRYun3TNuP1mj9OVa-OmrmXWqR0HSst0cCcn_UZh2Zdgd9-cyBr-pGgRnjy4lr_EHBZ2d6iLOfe4L1ub8dQ",
    original_price: 450,
    offer_price: 299,
    stock: 85,
    is_available: true,
    unit_info: "1 Heavy Roll (1000 Shots)",
    safety_info: "Unroll completely on open ground away from walls and vehicles. Light the lead fuse and retire to a safe distance.",
    delivery_info: "Anti-friction packaging with shock absorber lining.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sc-prod-003",
    name: "12 Color Sky Shot Multi-Break",
    description: "High-altitude multi-stage breaks with ruby red peonies, emerald brocade and golden crackling salute. Burst height 40-50 meters.",
    category: "Aerial Crackers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbGFrksk8jPe5rJMUgPiBUUhEsmtauAHHtSVCaLIEiEcYFg33HC6OjQTufoFXiJOswrvNIUEIAPoyOIgUU-IQsPm7_pLV6yED-VX6-OkYSmpy_UOGPGu9wUcJDkQdKOZZClGUgBpC0_avKUb_9JBFEwVa0eG25OIpsRPt-aC5wco9nkXa3WhANk87EyUgNqdjUwfN_z2sFRQV65dz019Cc5JYVt6qAdCU06DSM9EMOFXie6mYn20vK3A",
    original_price: 850,
    offer_price: 580,
    stock: 60,
    is_available: true,
    unit_info: "Pack of 5 Aerial Tubes",
    safety_info: "Outdoor use strictly. Bury tube base upright 1/3 in soil or secure in a heavy bucket. Never lean over the tube.",
    delivery_info: "Factory sealed tubes with safety cap.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sc-prod-004",
    name: "Electric Zero-Dust Sparklers (15cm)",
    description: "Bright golden sparks with minimal smoke emission. Safe for family celebrations and easy hand ignition.",
    category: "Sparklers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpKECfAOfxvMa-lKOzjdoQdYo6kE-tEz-zvQwXquRZdKYbmWc66n5M0UMSQu7L7UkNSj8Ko33C8f2wR-upRKoBwJXPga-i3ds6hKJh4_c9A-lANZ2iRxXqVaSTgAXn--gBy2Jm7uJ1ycWxfVg9RqlQIENivRt147G-Y6CEtTy1bBFr9_Tb5jSHJ8d-ObSQUA45zyxoJh6iKO1irIYxZVfcYME5y6UbkdGjDNgJ3FSBZ5tkahcPAb81zg",
    original_price: 180,
    offer_price: 120,
    stock: 220,
    is_available: true,
    unit_info: "Box of 10 Sparkler Sticks",
    safety_info: "Hold at arm's length. Keep a bucket of water nearby to quench spent hot wires immediately.",
    delivery_info: "Moisture-sealed foil wrap.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sc-prod-005",
    name: "Deluxe Jumbo Flower Pots (10 Pcs)",
    description: "Conical terracotta-style flower pot crackers with dazzling golden sparkles and multi-color embers.",
    category: "Ground Crackers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTSHO2uPD0k1PLA-H-CoE38c72_50KHiTfsoBzj-24VBsBWsibI-R8xZUG2GjkmbC0kukW7mn8Ox1EuFdw9Cqn0M5YU3G3RDqToOfNoIpx8fjZGufUyOGYVZ6jJWAi0A5wPkMkH73w0faAZO1LNRV6Y7XoPFzmMG6w4h-dOzwn-x0nGwJ2m9WLcTnMufaWheKos_RVgKfENgK9POdCpjEt_qwbEk6EYyC00d7Y2bqQy1PIuwFMA0bq_g",
    original_price: 520,
    offer_price: 349,
    stock: 95,
    is_available: true,
    unit_info: "Pack of 10 Jumbo Pots",
    safety_info: "Light at arm's length on flat outdoor ground. Do not bend over while lighting.",
    delivery_info: "Heavy duty corrugated carton.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sc-prod-006",
    name: "Family Mega Festive Hamper 2026",
    description: "Curated assortment of safe celebration fireworks: sparklers, flower pots, ground chakkars, pencil torches, and aerial multi-shots.",
    category: "Gift Boxes",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_HnOoZ1f5MhPyXQWTCmckEqcyz4npXS-24h5ClLtyhBk_mV4J5KYhVSNu3Z2ewU2pEfJOpPeCCkVFWA7Y5Eok6KxyX--rZJ9fC1LAWFaw8lnzMdKVISpnsyMQAHzxcPdMO4Qh2WiGudkLhQo_kbCK7bmu1eLss4wc_ScaTMOipO4eMHbj5IrpaNV1HnKNRUOgo-WIniOkjjbTE2J8HCsGdp969BguUFsM2Nz-hGo-m-k1toEZJX6P6w",
    original_price: 4200,
    offer_price: 2850,
    stock: 45,
    is_available: true,
    unit_info: "36 Assorted Safe Items",
    safety_info: "Read individual box instructions before lighting. Store the hamper in a cool, dry place.",
    delivery_info: "Deluxe presentation box wrapped in protective waterproof outer shell.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sc-prod-007",
    name: "Special Ground Chakkar Deluxe",
    description: "High speed spinning wheel emitting a vivid ring of golden crackling sparks. Low residue formulation.",
    category: "Ground Crackers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSoWBk6bghq3jk4MgZD6NonTcHqpAtnv7qmicWlN5LlnNLEhtFrKbe7BulglI13B2CZ3lKOylBM8kB_8GiOvWdnWlW9-hZtjI0LTatGDBIAPdHa4hk3ZLaD0p1VnZN-DnL30Ej4DUZLXd83xhpBO5bLlLYy1NxfytDkJwABc3hvT2bvHmy2RexQtN1Aj2DmpN7PycE0UYlPR1_8ZxHQRSCCGwoSxefj-pYbecF7Zk4qorruxAy1T28Vw",
    original_price: 280,
    offer_price: 190,
    stock: 110,
    is_available: true,
    unit_info: "Box of 10 Pieces",
    safety_info: "Place flat on smooth ground. Light tip and step back 3 meters.",
    delivery_info: "Moisture-free packaging.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sc-prod-008",
    name: "Fancy Peacock Feather Multi-Color Fountain",
    description: "Spectacular vertical color changes transitioning through green, violet, gold, and silver cascades.",
    category: "Fancy Crackers",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTSHO2uPD0k1PLA-H-CoE38c72_50KHiTfsoBzj-24VBsBWsibI-R8xZUG2GjkmbC0kukW7mn8Ox1EuFdw9Cqn0M5YU3G3RDqToOfNoIpx8fjZGufUyOGYVZ6jJWAi0A5wPkMkH73w0faAZO1LNRV6Y7XoPFzmMG6w4h-dOzwn-x0nGwJ2m9WLcTnMufaWheKos_RVgKfENgK9POdCpjEt_qwbEk6EYyC00d7Y2bqQy1PIuwFMA0bq_g",
    original_price: 650,
    offer_price: 430,
    stock: 35,
    is_available: true,
    unit_info: "Pack of 2 Large Fountains",
    safety_info: "Use only in outdoor open spaces. Light fuse and maintain 6 meters distance.",
    delivery_info: "Rigid corrugated box packing.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const STORAGE_KEYS = {
  PRODUCTS: 'sc_products',
  ORDERS: 'sc_orders',
  SETTINGS: 'sc_settings',
  CART: 'sc_cart',
  ACTIVE_USER_PHONE: 'sc_active_user_phone'
};

export const getStoredProducts = (): Product[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProduct = (product: Product): Product[] => {
  const products = getStoredProducts();
  const existingIdx = products.findIndex(p => p.id === product.id);
  let updated: Product[];
  if (existingIdx >= 0) {
    updated = [...products];
    updated[existingIdx] = { ...product, updated_at: new Date().toISOString() };
  } else {
    updated = [product, ...products];
  }
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  return updated;
};

export const deleteStoredProduct = (id: string): Product[] => {
  const products = getStoredProducts();
  const updated = products.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  return updated;
};

export const getStoredOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!data) {
      // Clean slate - do NOT invent fake orders!
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
      return [];
    }
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const getStoredOrderById = (id: string): Order | undefined => {
  const orders = getStoredOrders();
  return orders.find(o => o.id === id);
};

export const generateNextOrderId = (): string => {
  const orders = getStoredOrders();
  const year = new Date().getFullYear();
  const count = orders.length + 1;
  const padded = String(count).padStart(4, '0');
  return `SC-${year}-${padded}`;
};

export const saveStoredOrder = (order: Order): Order => {
  const orders = getStoredOrders();
  const existingIdx = orders.findIndex(o => o.id === order.id);
  let updated: Order[];
  if (existingIdx >= 0) {
    updated = [...orders];
    updated[existingIdx] = { ...order, updated_at: new Date().toISOString() };
  } else {
    updated = [order, ...orders];
  }
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  return order;
};

export const updateStoredOrderStatus = (
  id: string,
  orderStatus: Order['order_status'],
  paymentStatus?: Order['payment_status']
): Order | undefined => {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === id);
  if (!order) return undefined;
  
  order.order_status = orderStatus;
  if (paymentStatus) {
    order.payment_status = paymentStatus;
  }
  order.updated_at = new Date().toISOString();
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return order;
};

export const getStoredSettings = (): ShopSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    return { ...INITIAL_SETTINGS, ...JSON.parse(data) };
  } catch {
    return INITIAL_SETTINGS;
  }
};

export const saveStoredSettings = (settings: ShopSettings): ShopSettings => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  return settings;
};

export const getStoredActivePhone = (): string => {
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_PHONE) || '';
};

export const saveStoredActivePhone = (phone: string): void => {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_PHONE, phone);
};
