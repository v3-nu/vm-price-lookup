
export interface SupabaseVMPricing {
  ID: number;
  Provider: string | null;
  Processor: string | null;
  Resources: string | null;
  vCPU: number | null;
  RAM: number | null;
  Disk: string | null;
  "Bandwidth TB": number | null;
  "Speed Gbit": number | null;
  Currency: string | null;
  "Price (0% curr)": number | null;
  "EUR (0%)": number | null;
  "EUR (25%)": number | null;
  Locations: string | null;
  Comments: string | null;
}

// Convert Supabase data to our app's data format
export const convertToVMPricing = (data: SupabaseVMPricing) => {
  return {
    id: `vm-${data.ID}`,
    provider: data.Provider || 'Unknown',
    processor: data.Processor || 'Unknown',
    resources: data.Resources || 'Unknown',
    cpu: data.vCPU || 0,
    ram: data.RAM || 0,
    disk: data.Disk ? parseInt(data.Disk) || 0 : 0,
    bandwidth: data["Bandwidth TB"] ? `${data["Bandwidth TB"]} TB` : 'Unknown',
    speed: data["Speed Gbit"] || 0,
    currency: data.Currency || 'EUR',
    price: data["Price (0% curr)"] || 0,
    priceEUR: data["EUR (0%)"] || 0
  };
};
