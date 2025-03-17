
export interface VMPricing {
  id: string;
  provider: string;
  processor: string;
  resources: string;
  cpu: number;
  ram: number;
  disk: number;
  bandwidth: string;
  speed: number;
  currency: string;
  price: number;
  priceEUR: number;
}

export const vmData: VMPricing[] = [
  {
    id: "aws-t2-micro",
    provider: "AWS",
    processor: "Intel Xeon",
    resources: "Shared",
    cpu: 1,
    ram: 1,
    disk: 30,
    bandwidth: "Low to Moderate",
    speed: 3.0,
    currency: "USD",
    price: 8.50,
    priceEUR: 7.65
  },
  {
    id: "aws-t2-small",
    provider: "AWS",
    processor: "Intel Xeon",
    resources: "Shared",
    cpu: 1,
    ram: 2,
    disk: 40,
    bandwidth: "Low to Moderate",
    speed: 3.0,
    currency: "USD",
    price: 17.00,
    priceEUR: 15.30
  },
  {
    id: "aws-t2-medium",
    provider: "AWS",
    processor: "Intel Xeon",
    resources: "Shared",
    cpu: 2,
    ram: 4,
    disk: 80,
    bandwidth: "Low to Moderate",
    speed: 3.0,
    currency: "USD",
    price: 34.00,
    priceEUR: 30.60
  },
  {
    id: "gcp-e2-micro",
    provider: "Google Cloud",
    processor: "Intel or AMD",
    resources: "Shared",
    cpu: 0.25,
    ram: 1,
    disk: 30,
    bandwidth: "2 Gbps",
    speed: 2.8,
    currency: "USD",
    price: 6.80,
    priceEUR: 6.12
  },
  {
    id: "gcp-e2-small",
    provider: "Google Cloud",
    processor: "Intel or AMD",
    resources: "Shared",
    cpu: 0.5,
    ram: 2,
    disk: 30,
    bandwidth: "4 Gbps",
    speed: 2.8,
    currency: "USD",
    price: 13.50,
    priceEUR: 12.15
  },
  {
    id: "azure-b1s",
    provider: "Azure",
    processor: "Intel Xeon",
    resources: "Shared",
    cpu: 1,
    ram: 1,
    disk: 4,
    bandwidth: "5 Mbps",
    speed: 2.7,
    currency: "USD",
    price: 7.80,
    priceEUR: 7.02
  },
  {
    id: "azure-b2s",
    provider: "Azure",
    processor: "Intel Xeon",
    resources: "Shared",
    cpu: 2,
    ram: 4,
    disk: 8,
    bandwidth: "10 Mbps",
    speed: 2.7,
    currency: "USD",
    price: 31.00,
    priceEUR: 27.90
  },
  {
    id: "digitalocean-s1",
    provider: "DigitalOcean",
    processor: "Intel Xeon",
    resources: "Dedicated",
    cpu: 1,
    ram: 1,
    disk: 25,
    bandwidth: "1000 GB",
    speed: 2.5,
    currency: "USD",
    price: 5.00,
    priceEUR: 4.50
  },
  {
    id: "digitalocean-s3",
    provider: "DigitalOcean",
    processor: "Intel Xeon",
    resources: "Dedicated",
    cpu: 1,
    ram: 2,
    disk: 60,
    bandwidth: "3000 GB",
    speed: 2.6,
    currency: "USD",
    price: 12.00,
    priceEUR: 10.80
  },
  {
    id: "linode-shared1-1",
    provider: "Linode",
    processor: "AMD EPYC",
    resources: "Shared",
    cpu: 1,
    ram: 1,
    disk: 25,
    bandwidth: "1 TB",
    speed: 2.2,
    currency: "USD",
    price: 5.00,
    priceEUR: 4.50
  },
  {
    id: "linode-shared6-4",
    provider: "Linode",
    processor: "AMD EPYC",
    resources: "Shared",
    cpu: 2,
    ram: 4,
    disk: 80,
    bandwidth: "4 TB",
    speed: 2.2,
    currency: "USD",
    price: 20.00,
    priceEUR: 18.00
  },
  {
    id: "vultr-cloud-1",
    provider: "Vultr",
    processor: "Intel Xeon",
    resources: "Shared",
    cpu: 1,
    ram: 1,
    disk: 25,
    bandwidth: "1 TB",
    speed: 2.4,
    currency: "USD",
    price: 5.00,
    priceEUR: 4.50
  },
  {
    id: "vultr-cloud-2",
    provider: "Vultr",
    processor: "Intel Xeon",
    resources: "Shared",
    cpu: 1,
    ram: 2,
    disk: 55,
    bandwidth: "2 TB",
    speed: 2.4,
    currency: "USD",
    price: 10.00,
    priceEUR: 9.00
  },
  {
    id: "vultr-cloud-3",
    provider: "Vultr",
    processor: "Intel Xeon",
    resources: "Shared",
    cpu: 2,
    ram: 4,
    disk: 80,
    bandwidth: "3 TB",
    speed: 2.4,
    currency: "USD",
    price: 20.00,
    priceEUR: 18.00
  },
  {
    id: "hetzner-cx11",
    provider: "Hetzner",
    processor: "AMD EPYC",
    resources: "Shared",
    cpu: 1,
    ram: 2,
    disk: 20,
    bandwidth: "20 TB",
    speed: 2.5,
    currency: "EUR",
    price: 3.49,
    priceEUR: 3.49
  },
  {
    id: "hetzner-cx21",
    provider: "Hetzner",
    processor: "AMD EPYC",
    resources: "Shared",
    cpu: 2,
    ram: 4,
    disk: 40,
    bandwidth: "20 TB",
    speed: 2.5,
    currency: "EUR",
    price: 5.83,
    priceEUR: 5.83
  }
];
