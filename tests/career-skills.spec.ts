import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const root = "/web-site";
const widths = [320, 390, 768, 1024, 1440];

test("defines one typed bilingual chronology with safe undated project records", async () => {
  const source = await readFile("src/data/career.ts", "utf8");

  expect(source).toContain("export type CareerRecord");
  expect(source).toContain('kind: "experience"');
  expect(source).toContain('kind: "education"');
  expect(source).toContain('kind: "certification"');
  expect(source).toContain('kind: "project"');
  expect(source).toContain('side: "experience"');
  expect(source).toContain('side: "education"');
  expect(source).toContain("links:");
  expect(source).toContain("period: null");
  expect(source).toContain("careerChronology");
  expect(source).not.toContain("RLP / PROD");
});

test("renders the shared chronological career story with supported overlap in both locales", async ({
  page,
}) => {
  for (const route of [
    {
      path: `${root}/experience/`,
      lang: "es",
      heading: "Experiencia",
      focus: "experience",
      storyLabel: "Cronología profesional",
      labels: [
        { kind: "experience", text: "EXPERIENCIA", count: 3 },
        { kind: "education", text: "FORMACIÓN", count: 3 },
        { kind: "certification", text: "CERTIFICACIÓN", count: 4 },
      ],
      workTitle: "Desarrollador Fullstack y Técnico de Sistemas",
      studyTitle:
        "FP Grado Superior en Desarrollo de Aplicaciones Multiplataforma",
      periods: ["2024 - Actualmente", "2023 - 2025", "12/2025", "01/2026"],
      projectNames: ["Cosecha en Cope", "ImportadorDB", "Glea-Nexo"],
      projectContext: "Crecimiento reciente",
      projectLink: "/web-site/work/cosecha-en-cope/",
      milestones: [
        {
          title: "Cosecha en Cope",
          side: "education",
          period: "12/2025",
          context: "Proyecto final del DAM.",
        },
        {
          title: "ImportadorDB",
          side: "experience",
          period: "01/2026",
          context:
            "Después del DAM y antes de la especialización en IA y Big Data.",
        },
        {
          title: "Glea-Nexo",
          side: "experience",
          period: null,
          context:
            "Crecimiento reciente, con dirección hacia IA y Big Data, en contexto LAB.",
        },
      ],
      relativeOrder: [
        "Desarrollador Fullstack y Técnico de Sistemas",
        "Glea-Nexo",
        "Curso de especialización FP en Inteligencia Artificial y Big Data",
      ],
    },
    {
      path: `${root}/en/education/`,
      lang: "en",
      heading: "Education",
      focus: "education",
      storyLabel: "Career chronology",
      labels: [
        { kind: "experience", text: "EXPERIENCE", count: 3 },
        { kind: "education", text: "EDUCATION", count: 3 },
        { kind: "certification", text: "CERTIFICATION", count: 4 },
      ],
      workTitle: "Fullstack Developer and Systems Technician",
      studyTitle:
        "Higher Vocational Training in Multiplatform Application Development",
      periods: ["2024 - Present", "2023 - 2025", "12/2025", "01/2026"],
      projectNames: ["Cosecha en Cope", "ImportadorDB", "Glea-Nexo"],
      projectContext: "Recent growth",
      projectLink: "/web-site/en/work/cosecha-en-cope/",
      milestones: [
        {
          title: "Cosecha en Cope",
          side: "education",
          period: "12/2025",
          context: "DAM final project.",
        },
        {
          title: "ImportadorDB",
          side: "experience",
          period: "01/2026",
          context: "After DAM and before the AI and Big Data specialization.",
        },
        {
          title: "Glea-Nexo",
          side: "experience",
          period: null,
          context: "Recent growth toward AI and Big Data, in a LAB context.",
        },
      ],
      relativeOrder: [
        "Fullstack Developer and Systems Technician",
        "Glea-Nexo",
        "FP specialization course in Artificial Intelligence and Big Data",
      ],
    },
  ] as const) {
    await page.goto(route.path);
    await expect(page.locator("html")).toHaveAttribute("lang", route.lang);
    await expect(
      page.getByRole("heading", { level: 1, name: route.heading, exact: true }),
    ).toBeVisible();
    await expect(
      page.locator(
        `[data-career-timeline][data-career-focus="${route.focus}"]`,
      ),
    ).toHaveCount(1);
    await expect(
      page.locator("[data-career-record][data-record-kind='experience']"),
    ).toHaveCount(3);
    await expect(
      page.locator("[data-career-record][data-record-kind='education']"),
    ).toHaveCount(3);
    await expect(
      page.locator("[data-career-record][data-record-kind='certification']"),
    ).toHaveCount(4);
    await expect(
      page.locator("[data-career-record][data-record-kind='project']"),
    ).toHaveCount(3);
    await expect(
      page.getByRole("heading", { name: route.workTitle, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: route.studyTitle, exact: true }),
    ).toBeVisible();
    await expect(page.locator("[data-career-story]")).toHaveAttribute(
      "aria-label",
      route.storyLabel,
    );
    await expect(
      page.getByRole("heading", { name: route.storyLabel, exact: true }),
    ).toHaveCount(0);

    for (const { kind, text, count } of route.labels) {
      const labels = page.locator(
        `[data-career-record][data-record-kind="${kind}"] .career-record__label`,
      );
      await expect(labels).toHaveCount(count);
      await expect(labels).toHaveText(
        Array.from({ length: count }, () => text),
      );
    }
    for (const period of route.periods)
      await expect(
        page.locator("[data-career-period]", { hasText: period }).first(),
      ).toBeVisible();
    for (const projectName of route.projectNames)
      await expect(
        page.getByRole("heading", { name: projectName, exact: true }),
      ).toBeVisible();
    await expect(
      page.getByText(route.projectContext, { exact: false }),
    ).toBeVisible();
    const titles = await page
      .locator("[data-career-record] h3")
      .allTextContents();
    const relativeIndexes = route.relativeOrder.map((title) =>
      titles.indexOf(title),
    );
    expect(relativeIndexes.every((index) => index >= 0)).toBe(true);
    expect(relativeIndexes[0]).toBeLessThan(relativeIndexes[1]);
    expect(relativeIndexes[1]).toBeLessThan(relativeIndexes[2]);
    await expect(
      page.locator("[data-project-record][data-period]"),
    ).toHaveCount(2);
    await expect(
      page.locator("[data-project-record]:not([data-period])"),
    ).toHaveCount(1);
    await expect(
      page.getByRole("link", { name: /Cosecha en Cope/ }).first(),
    ).toHaveAttribute("href", route.projectLink);
    await expect(
      page.locator("[data-career-timeline] [data-project-record]"),
    ).toHaveCount(3);
    await expect(page.locator("[data-career-timeline]")).not.toContainText(
      "RLP / PROD",
    );

    for (const milestone of route.milestones) {
      const record = page.locator("[data-project-record]", {
        hasText: milestone.title,
      });
      await expect(record).toHaveAttribute("data-career-side", milestone.side);
      await expect(record).toContainText(milestone.context);
      if (milestone.period)
        await expect(record).toHaveAttribute("data-period", milestone.period);
      else await expect(record).not.toHaveAttribute("data-period");
    }
  }
});

test("keeps Experience and Education as focused views of one combined timeline", async ({
  page,
}) => {
  for (const [path, heading, focus] of [
    [`${root}/experience/`, "Experiencia", "experience"],
    [`${root}/education/`, "Formación", "education"],
    [`${root}/en/experience/`, "Experience", "experience"],
    [`${root}/en/education/`, "Education", "education"],
  ] as const) {
    const response = await page.goto(path);
    expect(response?.ok()).toBe(true);
    await expect(
      page.getByRole("heading", { level: 1, name: heading, exact: true }),
    ).toBeVisible();
    await expect(
      page.locator(`[data-career-timeline][data-career-focus="${focus}"]`),
    ).toHaveCount(1);
    await expect(
      page.locator("#site-navigation [aria-current='page']"),
    ).toHaveCount(1);
    await expect(
      page.locator("#site-navigation [aria-current='page']"),
    ).toHaveText(path.includes("/en/") ? "Career" : "Trayectoria");
  }
});

test("assigns stable semantic sides around a central axis with nodes and connectors", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${root}/experience/`);

  await expect(page.locator("[data-career-axis]")).toHaveCount(1);
  await expect(page.locator("[data-career-node]")).toHaveCount(13);
  await expect(page.locator("[data-career-connector]")).toHaveCount(13);
  await expect(
    page.locator("[data-career-record][data-career-side='experience']"),
  ).toHaveCount(5);
  await expect(
    page.locator("[data-career-record][data-career-side='education']"),
  ).toHaveCount(8);
  await expect(
    page.locator(
      "[data-career-record][data-career-side='experience'] .career-record__body",
    ),
  ).toHaveCount(5);
  await expect(
    page.locator(
      "[data-career-record][data-career-side='education'] .career-record__body",
    ),
  ).toHaveCount(8);

  const desktopLayout = await page
    .locator("[data-career-axis]")
    .evaluate((element) => {
      const record = element.querySelector<HTMLElement>("[data-career-record]");
      const axis = element.querySelector<HTMLElement>(".career-timeline__rail");
      return {
        columns: record
          ? getComputedStyle(record).gridTemplateColumns.split(" ").length
          : 0,
        railVisible: Boolean(axis && getComputedStyle(axis).display !== "none"),
      };
    });
  expect(desktopLayout).toEqual({ columns: 3, railVisible: true });

  await page.setViewportSize({ width: 390, height: 900 });
  await page.reload();
  expect(
    await page
      .locator(".career-timeline[data-career-axis]")
      .evaluate(
        (element) =>
          getComputedStyle(element).gridTemplateColumns.split(" ").length,
      ),
  ).toBe(1);
  await expect(
    page.locator("[data-career-axis] .career-timeline__rail"),
  ).toBeVisible();
  await expect(
    page.locator("[data-career-axis] [data-career-node]").first(),
  ).toBeVisible();
});

test("keeps descriptions, lists, and project references naturally left-aligned on desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${root}/experience/`);

  const alignment = await page
    .locator("[data-career-timeline]")
    .evaluate((element) => {
      const selectors = [
        "[data-career-side='experience'] .career-record__body",
        "[data-career-side='experience'] .career-record__summary",
        "[data-career-side='experience'] .career-record__details",
        "[data-career-side='experience'] .career-record__links",
        "[data-project-record] .career-record__body",
      ];
      return selectors.map((selector) => {
        const node = element.querySelector<HTMLElement>(selector);
        return node ? getComputedStyle(node).textAlign : null;
      });
    });

  expect(
    alignment.every((value) => value === "left" || value === "start"),
  ).toBe(true);
  expect(alignment).not.toContain("right");
  expect(alignment).not.toContain("center");
});

test("keeps the career timeline readable, themed, and reduced-motion safe at canonical widths", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const path of [`${root}/experience/`, `${root}/en/education/`]) {
    for (const theme of ["light", "dark"] as const) {
      await page.addInitScript(
        (value) => localStorage.setItem("rlp-theme", value),
        theme,
      );
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        expect(
          await page
            .locator("html")
            .evaluate((element) => element.scrollWidth <= window.innerWidth),
        ).toBe(true);
        await expect(page.locator("[data-career-timeline]")).toBeVisible();
        await expect(page.locator("[data-career-record]").first()).toHaveCSS(
          "background-image",
          "none",
        );
        await expect(page.locator("[data-career-node]").first()).toHaveCSS(
          "animation-name",
          "none",
        );
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      }
    }
  }

  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(`${root}/experience/`);
  const mobileGeometry = await page
    .locator("[data-career-timeline]")
    .evaluate((element) => {
      const timeline = element.querySelector<HTMLElement>(".career-timeline");
      const rail = timeline?.querySelector<HTMLElement>(
        ".career-timeline__rail",
      );
      const style = rail ? getComputedStyle(rail) : null;
      const recordBoxes = [
        ...element.querySelectorAll<HTMLElement>("[data-career-record]"),
      ]
        .slice(0, 3)
        .map((record) => record.getBoundingClientRect());
      return {
        axis: Boolean(
          style &&
          style.display !== "none" &&
          Number.parseFloat(style.width) > 0,
        ),
        oneColumn: recordBoxes.every(
          (box) =>
            box.width > 0 && box.left >= element.getBoundingClientRect().left,
        ),
        sameReadingEdge:
          new Set(recordBoxes.map((box) => Math.round(box.left))).size === 1,
      };
    });
  expect(mobileGeometry).toEqual({
    axis: true,
    oneColumn: true,
    sameReadingEdge: true,
  });
});

test("renders four evidence-led peer Skills domains with bilingual Applied AI boundaries", async ({
  page,
}) => {
  for (const route of [
    {
      path: `${root}/skills/`,
      lang: "es",
      heading: "Habilidades",
      kickers: [
        "RLP / SKILLS / 001",
        "RLP / SKILLS / 002",
        "RLP / SKILLS / 003",
        "RLP / SKILLS / 004",
      ],
      domains: ["Backend", "Data", "Systems", "IA aplicada"],
      evidence: "36 rutas explícitas",
      routing: "enrutamiento de proveedores/modelos 7/7",
      link: "Ver repositorio ↗",
      copy: "Flujos de ingeniería asistidos por agentes",
    },
    {
      path: `${root}/en/skills/`,
      lang: "en",
      heading: "Skills",
      kickers: [
        "RLP / SKILLS / 001",
        "RLP / SKILLS / 002",
        "RLP / SKILLS / 003",
        "RLP / SKILLS / 004",
      ],
      domains: ["Backend", "Data", "Systems", "Applied AI"],
      evidence: "36 explicit routes",
      routing: "7/7 provider/model routing",
      link: "View repository ↗",
      copy: "Agent-assisted engineering workflows",
    },
  ] as const) {
    for (const theme of ["light", "dark"] as const) {
      await page.addInitScript(
        (value) => localStorage.setItem("rlp-theme", value),
        theme,
      );
      await page.goto(route.path);
      await expect(page.locator("html")).toHaveAttribute("lang", route.lang);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: route.heading,
          exact: true,
        }),
      ).toBeVisible();
      await expect(page.locator("[data-skill-domain]")).toHaveCount(4);
      await expect(
        page.locator("[data-skill-domain] .skills-domain__kicker"),
      ).toHaveText(route.kickers);
      await expect(page.locator("[data-skill-domain] h2")).toHaveText(
        route.domains,
      );
      for (const domain of route.domains)
        await expect(
          page.getByRole("heading", { level: 2, name: domain, exact: true }),
        ).toBeVisible();
      await expect(page.locator(".skills-domain__label")).toHaveCount(0);
      await expect(
        page.getByText(route.evidence, { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByText(route.routing, { exact: true }),
      ).toBeVisible();
      await expect(page.getByText(route.copy, { exact: true })).toBeVisible();
      await expect(
        page.getByRole("link", { name: route.link, exact: true }),
      ).toHaveAttribute(
        "href",
        "https://github.com/RafaLopezZz/codex-workstation-baseline",
      );
      await expect(
        page.locator(
          "[data-skill-score], progress, [aria-label*='proficiency' i], .skill-meter, .tag-cloud",
        ),
      ).toHaveCount(0);
      await expect(
        page.locator("[data-generic-ai-panel], [data-kpi-dashboard]"),
      ).toHaveCount(0);
      await expect(page.locator("body")).not.toContainText(/\d+%|★|⭐/);

      const colorState = await page
        .locator("[data-skill-domain] .skills-domain__kicker")
        .evaluateAll((elements) => {
          const probe = document.createElement("span");
          probe.style.color = "var(--theme-accent)";
          document.body.append(probe);
          const accent = getComputedStyle(probe).color;
          const colors = elements.map(
            (element) => getComputedStyle(element).color,
          );
          probe.remove();
          return { accent, colors };
        });
      expect(colorState.colors).toEqual(Array(4).fill(colorState.accent));
    }
  }
});

test("uses one visible technology-name pattern with only local decorative marks", async ({
  page,
}) => {
  await page.goto(`${root}/skills/`);
  const technologies = page.locator("[data-technology]");
  await expect(technologies).not.toHaveCount(0);
  await expect(technologies.locator(".technology-mark")).toHaveCount(
    await technologies.count(),
  );

  for (const technology of await technologies.all()) {
    await expect(technology.locator(".technology-mark__name")).toBeVisible();
    await expect(
      technology.locator("img[aria-hidden='true'][alt='']"),
    ).toHaveCount(await technology.locator("img").count());
    for (const logo of await technology.locator("img").all()) {
      await expect(logo).toHaveAttribute(
        "src",
        /\/web-site\/icons\/tech\/.+\.svg$/,
      );
    }
  }

  const mark = await page
    .locator(".technology-mark")
    .first()
    .evaluate((element) => getComputedStyle(element));
  expect(Number.parseFloat(mark.fontSize)).toBeLessThanOrEqual(12);
});

test("renders only the approved local anchor marks beside visible technology names", async ({
  page,
}) => {
  await page.goto(`${root}/skills/`);
  const icons = await page
    .locator(".technology-mark img")
    .evaluateAll((images) =>
      images.map((image) =>
        new URL(image.getAttribute("src") ?? "", window.location.href).pathname
          .split("/")
          .pop(),
      ),
    );

  expect(icons.sort()).toEqual([
    "docker.svg",
    "git.svg",
    "openjdk.svg",
    "python.svg",
  ]);
});

test("keeps Skills peer domains and locale routes overflow-safe with one current Skills header link", async ({
  page,
}) => {
  for (const path of [`${root}/skills/`, `${root}/en/skills/`]) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      expect(
        await page
          .locator("html")
          .evaluate((element) => element.scrollWidth <= window.innerWidth),
      ).toBe(true);
      await expect(
        page.locator("[data-surface='artifact'][data-skill-domain]"),
      ).toHaveCount(4);
      await expect(
        page.locator("#site-navigation [aria-current='page']"),
      ).toHaveCount(1);
      await expect(
        page.locator("#site-navigation [aria-current='page']"),
      ).toHaveText(path.includes("/en/") ? "Skills" : "Habilidades");
    }
  }
});
