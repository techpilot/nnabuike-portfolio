export type Award = { when: string; title: string; kind: "Scholarship" | "Funding" | "Prize" | "Honours" };

// Newest first.
export const awards: Award[] = [
  { when: "Oct 2026", kind: "Scholarship", title: "Petroleum Technology Development Fund In-Country Scholarship Award for Masters" },
  { when: "Sep 2026", kind: "Scholarship", title: "Intra-Africa – Mobility in Sustainable Energy & Materials, Energy, Policy, Climate Change, Energy Economics and Environment (SMECC2E) Scholarship Award for training in HOMER and LEAP software" },
  { when: "Apr 2025", kind: "Funding", title: "Circular Economy Powered Renewable Energy Centre (CEPREC): financial support for a master's research assistantship and mentorship in renewable energy systems" },
  { when: "Dec 2024", kind: "Prize", title: "Departmental Prize to the best graduating student in the Department of Mechanical Engineering" },
  { when: "Dec 2024", kind: "Prize", title: "Okenze Ezinne Innocent Nneji Chukwu Prize to the best graduating student in the Department of Mechanical Engineering" },
  { when: "Apr 2023, Apr 2022, Mar 2021", kind: "Honours", title: "HOD's Honours Award for the best-performing students in Mechanical Engineering" },
  { when: "Apr 2022", kind: "Honours", title: "HOD's Honours Award for the best-performing academic student in 300-level Mechanical Engineering, 2020/2021 session" },
  { when: "Jun 2019", kind: "Scholarship", title: "National Institute of Information Technology (NIIT) Scholarship Award" },
];
