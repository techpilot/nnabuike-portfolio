import Image from "next/image";
import { Fragment } from "react";
import ChapterRail from "@/components/chapter-rail";
import FillBar from "@/components/fill-bar";
import LazyVideo from "@/components/lazy-video";
import ThemeToggle from "@/components/theme-toggle";
import CountUp from "@/components/count-up";
import DotGrid from "@/components/dot-grid";
import EnergyFlow from "@/components/energy-flow";
import { awards } from "@/content/awards";
import { publications, underReview } from "@/content/publications";
import { talks } from "@/content/talks";
import NameSignoff from "@/components/name-signoff";
import { site } from "@/content/site";
import podium from "@/assets/podium.jpg";
import stage from "@/assets/stage.jpeg";
import audience from "@/assets/audience.jpeg";
import between from "@/assets/between.jpeg";
import external_link from "@/assets/icons/link.svg"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person", name: site.name, url: site.url, jobTitle: "Mechanical engineer and clean energy researcher",
      affiliation: { "@type": "CollegeOrUniversity", name: "University of Nigeria" }, sameAs: site.sameAs, award: awards.map((a) => a.title),
      knowsAbout: ["Energy modelling", "Building energy", "Renewable energy systems", "Energy storage", "Thermal energy storage", "Refrigeration and air conditioning", "Electric mobility"],
    },
    ...publications.map((p) => ({
      "@type": "ScholarlyArticle", headline: p.title, datePublished: String(p.year), author: p.authors,
      isPartOf: p.venue, sameAs: `https://doi.org/${p.doi}`,
    })),
  ],
};

const results: { v?: number; n: number; d: number; s: string; t: string }[] = [
  { v: 0.766, n: 76.6, d: 1, s: "%", t: "Up to this much lower HVAC load from smart, occupancy-based scheduling in a modelled 2-storey, 11-room house across eight climate zones (Nigeria, China, Egypt, USA, Mexico, India, Bulgaria, Germany). Undergraduate research." },
  { v: 0.071, n: 7.1, d: 1, s: "%", t: "Up to this much lower annual heat-pump energy with PCM than with the cold room's 52.5 kWh battery, at a 3,000 kg product load, with smoother temperature control and less compressor cycling. TRNSYS model of a real PV-powered cold room run by Manamuz Electric." },
  { v: 0.073, n: 7.3, d: 1, s: "%", t: "Lower again with the best battery-PCM hybrid in the same model." },
  { n: 120, d: 0, s: "+", t: "Location-specific simulations across Nigeria, testing whether surplus building solar can charge an EV (Tesla Model 3 LR), mapped with Python." },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ChapterRail />
      <header className="top">
        <a href="#top" className="display" style={{ fontSize: "1.2rem" }}>{site.name}</a>
        <nav aria-label="Primary">
          <span className="links">
            <a href="#research">Research</a><a href="#proof">Publications</a><a href="#next">Contact</a>
          </span>
          <a className="cv-link" href={site.cv} target="_blank" rel="noopener">Resume</a>
          <ThemeToggle />
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div>
            <h1 className="display" aria-label="Making clean power go further.">
              {"Making clean power go further.".split(" ").map((w, i) => (
                <Fragment key={w}>{i > 0 && " "}<span aria-hidden="true" style={{ ["--i" as string]: i }}>{w}</span></Fragment>
              ))}
            </h1>
            <div className="charge" aria-hidden="true" />
            <p className="lede">
              I&rsquo;m {site.name}, a mechanical engineer modelling energy-efficient buildings and solar-powered cold rooms in Nigeria.
            </p>
            <p className="proof">First-class degree, CGPA 4.69/5.0, ranked 1st of 119. Best graduating student in the department. Three publications. Three scholarships.</p>
            <div className="actions">
              <a className="btn primary" href="#research">Read the research</a>
              <a className="btn" href="#next">Get in touch</a>
            </div>
          </div>
          <figure className="fig">
            <Image src={podium} alt="A speaker presenting at the AICCEES 2026 conference podium" priority placeholder="blur" sizes="(min-width: 960px) 40vw, 100vw" />
            <figcaption><span>Presenting at AICCEES 2026</span><span>Fig. 1</span></figcaption>
          </figure>
        </section>

        <section id="origin" className="chapter">
          <h2 className="display">Energy is moved, stored and lost. I wanted to see where.</h2>
          <div className="prose">
            <p>At the University of Nigeria, Nsukka, thermodynamics, refrigeration and air conditioning, and energy conversion taught me how energy is moved, stored and lost. The same ideas explained a problem outside the lecture hall: power that isn&rsquo;t there when people need it.</p>
            <p>My final-year thesis on solar panels built into buildings was the first time I tested a solution myself.</p>
          </div>
        </section>

        <section id="spark" className="chapter">
          <h2 className="display">Electricity doesn&rsquo;t have to wait for the grid.</h2>
          <div className="split">
            <div className="prose">
              <p>In many off-grid places the grid simply does not reach, and extending power lines to every community is slow and costly. Solar is decentralised: it can be installed right where it is needed. Nigeria also has high solar potential, so the resource is already there.</p>
              <h3 className="display">Access is only part of it</h3>
              <p>Even connected homes face frequent outages, and over 75% of the grid&rsquo;s electricity comes from fossil fuels (IEA). I want to play a part in my country&rsquo;s energy transition.</p>
              <p>Food shows what&rsquo;s at stake. Nigeria lost an estimated 30 to 40 million tonnes of food after harvest in 2025, worth about ₦3.5 to ₦5 trillion. The Bank of Agriculture links over 40% of those losses to energy poverty: too few cold rooms, and cold rooms need reliable power.</p>
            </div>
            <div><p className="bigstat display"><CountUp to={39} suffix="%" /><small>of Nigerians lacked access to electricity in 2023 (IEA)</small></p><DotGrid /></div>
          </div>
        </section>

        <section id="research" className="chapter">
          <h2 className="display">Test it on a computer first. Keep only what works.</h2>
          <EnergyFlow />
          <div className="split">
            <div>
              <div className="prose">
                <p>Trying energy ideas in the real world is costly and stressful, so I run simulations and optimisations first and keep only the options that hold up. The aim is evidence people can use: industry to cut energy use and cost, and policymakers to decide.</p>
                <p>After the thesis results, I tested whether surplus solar energy could charge electric vehicles. Manamuz is now considering PCM for its future cold rooms.</p>
                <p>My master&rsquo;s thesis compares battery and PCM storage in PV-powered cold rooms for sustainable microgrids, supervised by Prof. Howard Njoku. I work in TRNSYS, OpenStudio, PVGIS and Python (NumPy, Pandas, Matplotlib), and a scholarship now funds my training in HOMER and LEAP. I&rsquo;ve also started talks with Manamuz about IoT data from the live system to validate the model.</p>
              </div>
              <div className="results">
                {results.map((r) => (
                  <div className="result" key={r.n}>
                    <strong className="display"><CountUp to={r.n} decimals={r.d} suffix={r.s} /></strong>
                    {r.v !== undefined && <FillBar value={r.v} />}
                    <p>{r.t}</p>
                  </div>
                ))}
              </div>
            </div>
            <figure className="fig sticky-col">
              <LazyVideo src="/media/cold-room.mp4" poster="/media/cold-room-poster.jpg" width={478} height={850} label="Presenting the cold room modelling scenarios to a meeting room" />
              <figcaption><span>Presenting the cold room model</span><span>Fig. 2</span></figcaption>
            </figure>
          </div>
        </section>

        <section id="proof" className="chapter">
          <h2 className="display">Published, and recognised.</h2>
          <ul className="pubs">
            {publications.map((p) => (
              <li key={p.doi}>
                <h3 className="display">{p.title}</h3>
                <p>{p.takeaway}</p>
                <p className="meta">{p.authors} ({p.year}). {p.venue}. {p.kind}</p>
                <a className="paper-link" href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" aria-label={`Read the paper: ${p.title} (opens in a new tab)`}>Read the paper</a>
              </li>
            ))}
          </ul>
          <h3 className="display">Under review</h3>
          <ul className="pubs">
            {underReview.map((p) => (
              <li key={p.title}><h3 className="display">{p.title}</h3><p className="meta">{p.authors}. {p.note}.</p></li>
            ))}
          </ul>
          <h3 className="display">Scholarships, funding and prizes</h3>
          <ol className="timeline">
            {awards.map((a) => (
              <li key={a.when + a.title}><p className="when">{a.when}</p><p className="what">{a.title}</p><p className="kind">{a.kind}</p></li>
            ))}
          </ol>
          <h3 className="display">Credentials and affiliations</h3>
          <p className="prose">Scientific Writing (Cureus, Springer Nature), Renewable Energy and Green Building Entrepreneurship (Duke University, Coursera), Aspire Leaders Program, Python (NIIT). Member of the Nigerian Society of Engineers, Society of Petroleum Engineers, CEPREC and the Aspire Institute alumni network.</p>
        </section>

        <section id="voice" className="chapter">
          <h2 className="display">Presenting the work.</h2>
          <ol className="timeline">
            {talks.map((t) => (
              <li key={t.when}><p className="when">{t.when}</p><p className="what">{t.title}</p><p className="kind">{t.kind} · {t.event}</p></li>
            ))}
          </ol>
          <div className="gallery">
            <figure className="fig wide">
              <Image src={stage} alt="Four conference participants standing on stage in front of the AICCEES programme screen" placeholder="blur" sizes="(min-width: 1200px) 1100px, 100vw" />
              <figcaption><span>On stage at AICCEES 2026</span><span>Fig. 3</span></figcaption>
            </figure>
            <figure className="fig">
              <Image src={audience} alt="Delegates wearing green lanyards listening to a session" placeholder="blur" sizes="(min-width: 800px) 50vw, 100vw" />
              <figcaption><span>In the audience</span><span>Fig. 4</span></figcaption>
            </figure>
            <figure className="fig">
              <Image src={between} alt="Delegates gathered around a table between sessions" placeholder="blur" sizes="(min-width: 800px) 50vw, 100vw" />
              <figcaption><span>Between sessions</span><span>Fig. 5</span></figcaption>
            </figure>
          </div>
        </section>

        <section id="next" className="chapter">
          <h2 className="display">Next: a graduate program where this work can go further.</h2>
          <div className="prose">
            <p>I want to find more energy-efficient ways of doing things, in industry and in daily life, and put the evidence in a form people can use. When energy is used efficiently, the same supply reaches more people. That widens access to electricity and moves us toward sustainable energy.</p>
            <p>I&rsquo;m applying for graduate programs scholarships in the United States, Canada, Europe and Asia.</p>
          </div>
          <h3 className="display">Beyond the lab</h3>
          <ul className="pubs">
            <li><h3 className="display">Pioneered OpenIQ</h3><p>A peer-support platform for students retaking courses, where I taught thermodynamics at several levels.</p></li>
            <li><h3 className="display">Tutored 150+ students</h3><p>Mathematics and Physics at Saint Maria Goretti Secondary School, preparing them for WAEC and JAMB; 96% passed.</p></li>
            <li><h3 className="display">Volunteer tutor, Mechanical Engineering</h3><p>Thermodynamics, refrigeration and air conditioning, and energy conversion, 2021 to 2024.</p></li>
          </ul>
          <div className="actions">
            <a className="btn primary" href={`mailto:${site.email}`}>Email {site.name}</a>
            <a className="btn" href={site.cv} target="_blank" rel="noopener">View resume</a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <a
          className="social"
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={`${site.name} on LinkedIn (opens in a new tab)`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
          <span>Connect on LinkedIn</span>
        </a>
        <span>© {new Date().getFullYear()} {site.name}. Conference photos © AICCEES 2026.</span>
      </footer>
      <NameSignoff />
    </>
  );
}
