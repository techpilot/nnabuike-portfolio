const linkedin = "http://www.linkedin.com/in/nnabuike-ngwu-31b998279";

export const site = {
  name: "Nnabuike Ngwu",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  title: "Nnabuike Ngwu | Clean energy researcher",
  description:
    "Mechanical engineer (M.Eng., thermofluids and energy engineering) modelling energy-efficient buildings and PV-powered cold rooms. First-class B.Eng., three publications.",
  email: "ngwu.chris.2@gmail.com",
  linkedin,
  sameAs: [linkedin] as string[], // ORCID, Google Scholar, ResearchGate, LinkedIn
  cv: "/nnabuike-ngwu-cv.pdf"
};
