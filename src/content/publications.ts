export type Publication = {
  title: string; authors: string; venue: string; kind: string; year: number; doi: string; takeaway: string;
};

export const publications: Publication[] = [
  {
    title: "Feasibility of Dual-Function BIPV for Indoor Thermal Comfort and Electric Vehicle Energy Demands in Nigerian Urban Centres",
    authors: "Ngwu, N., Segnon, J.R., Nwokedi, M.E., Njoku, H.",
    venue: "Proceedings of the International Conferences on Digital Technology Driven Engineering 2025 (DiGiCES 2025). Lecture Notes in Civil Engineering, vol 877. Springer, Cham",
    kind: "Conference proceedings", year: 2026, doi: "10.1007/978-3-032-28520-1_14",
    takeaway: "Asks whether solar panels built into buildings can serve both indoor comfort and EV charging in Nigerian cities.",
  },
  {
    title: "Investigation into the performance and emission of diesel engine operating at different blends of Egusi melon (Citrullus lanatus) biodiesel",
    authors: "Eke, M., Umemba, U. I., Omeje, P. C., Odenyi, E. C., & Ngwu, N. C.",
    venue: "Intellectual Journal of Energy Harvesting and Storage, 3(1), 38-45",
    kind: "Journal article", year: 2025, doi: "10.11591/ehs.v3i1.pp38-45",
    takeaway: "Tests how a diesel engine performs and what it emits on different blends of Egusi melon biodiesel.",
  },
  {
    title: "Estimating the Potentials for Indoor Comfort in Smart Green Buildings with BIPV",
    authors: "Ngwu, N., Ahanonu, M., Chen, K., Sang, Y., Njoku, H., & Pei, G.",
    venue: "10th Virtual International Conference on Science, Technology and Management in Energy (eNergetics 2024)",
    kind: "Conference paper", year: 2025, doi: "10.5281/zenodo.14732925",
    takeaway: "Estimates the indoor comfort that building-integrated solar can deliver in smart green buildings.",
  },
];

export const underReview = [
  { title: "Comparative Assessment of Battery and PCM Energy Storage in Off-grid PV-Powered Cold Rooms", authors: "Ngwu, N., Njoku, H., Oyinlola, M., Shire, S., Mbamalu, U., Aliozor, C.", note: "Under review, 2026" },
];
