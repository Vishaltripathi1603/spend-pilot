import { ToolId } from "./types";

export interface PlanData {
  id: string;
  name: string;
  pricePerSeat: number;
  minSeats?: number;
}

export const PRICING: Record<ToolId, PlanData[]> = {
  cursor: [
    { id: "hobby", name: "Hobby", pricePerSeat: 0 },
    { id: "pro", name: "Pro", pricePerSeat: 20 },
    { id: "business", name: "Business", pricePerSeat: 40 },
    { id: "enterprise", name: "Enterprise", pricePerSeat: 100 }, // Estimated
  ],
  copilot: [
    { id: "individual", name: "Individual", pricePerSeat: 10 },
    { id: "business", name: "Business", pricePerSeat: 19 },
    { id: "enterprise", name: "Enterprise", pricePerSeat: 39 },
  ],
  claude: [
    { id: "free", name: "Free", pricePerSeat: 0 },
    { id: "pro", name: "Pro", pricePerSeat: 20 },
    { id: "team", name: "Team", pricePerSeat: 25, minSeats: 5 },
    { id: "enterprise", name: "Enterprise", pricePerSeat: 50 }, // Estimated
  ],
  chatgpt: [
    { id: "plus", name: "Plus", pricePerSeat: 20 },
    { id: "team", name: "Team", pricePerSeat: 25 },
    { id: "enterprise", name: "Enterprise", pricePerSeat: 60 }, // Estimated
  ],
  anthropic_api: [
    { id: "direct", name: "API Direct", pricePerSeat: 0 },
  ],
  openai_api: [
    { id: "direct", name: "API Direct", pricePerSeat: 0 },
  ],
  gemini: [
    { id: "business", name: "Business", pricePerSeat: 20 },
    { id: "enterprise", name: "Enterprise", pricePerSeat: 30 },
  ],
  windsurf: [
    { id: "individual", name: "Individual", pricePerSeat: 0 },
    { id: "pro", name: "Pro", pricePerSeat: 15 },
    { id: "team", name: "Team", pricePerSeat: 30 },
  ],
  v0: [
    { id: "free", name: "Free", pricePerSeat: 0 },
    { id: "premium", name: "Premium", pricePerSeat: 20 },
  ],
};
