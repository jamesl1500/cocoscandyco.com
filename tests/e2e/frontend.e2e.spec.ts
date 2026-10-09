import { test, expect, type Page } from '@playwright/test'

const base = 'http://localhost:3000'

const pages = [
  '/',
  '/services',
  '/services/candy-buffets',
  '/menu',
  '/service-areas',
  '/service-areas/chapel-hill-nc',
  '/about',
  '/contact',
]

const jsonLd = async (page: Page) =>
  page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent || '{}')))

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto(base)

    await expect(page).toHaveTitle(/Candy & Dessert Catering in Chapel Hill, NC/)
    await expect(page).toHaveTitle(/Coco's Couture Candy Co\./)

    const heading = page.locator('h1').first()

    await expect(heading).toHaveText(
      'Candy buffets and dessert tables for Chapel Hill and the Triangle',
    )
  })

  test('shows the business name and contact details', async ({ page }) => {
    await page.goto(base)

    await expect(
      page.getByRole('banner').getByRole('link', { name: "Coco's Couture Candy Co." }),
    ).toBeVisible()

    const footer = page.locator('footer')
    await expect(footer.getByRole('link', { name: '(352) 973-7753' })).toHaveAttribute(
      'href',
      'tel:+13529737753',
    )
    await expect(
      footer.getByRole('link', { name: 'cocoscouturecandyco@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:cocoscouturecandyco@gmail.com')
    await expect(footer.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/cocoscouturecandyco/',
    )

    await page.goto(`${base}/contact`)
    await expect(page.getByRole('complementary')).toContainText('(352) 973-7753')
    await expect(page.getByRole('complementary')).toContainText('cocoscouturecandyco@gmail.com')
    await expect(page.getByRole('complementary')).toContainText('@cocoscouturecandyco')
  })

  test('credits the designer in the footer', async ({ page }) => {
    await page.goto(base)

    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: 'Foundry Frame' }),
    ).toHaveAttribute('href', 'https://www.foundryframe.com')
  })

  test('every page has one h1, a description and a canonical URL', async ({ page }) => {
    for (const path of pages) {
      await page.goto(base + path)

      await expect(page.locator('h1'), path).toHaveCount(1)
      await expect(page.locator('meta[name="description"]'), path).toHaveAttribute(
        'content',
        /.{50,}/,
      )
      await expect(page.locator('link[rel="canonical"]'), path).toHaveAttribute(
        'href',
        new RegExp(`${path === '/' ? '' : path}$`),
      )
    }
  })

  test('describes the local business in structured data', async ({ page }) => {
    await page.goto(base)

    const business = (await jsonLd(page)).find((data) => data['@type'] === 'LocalBusiness')

    expect(business.name).toBe("Coco's Couture Candy Co.")
    expect(business.telephone).toBe('+13529737753')
    expect(business.email).toBe('cocoscouturecandyco@gmail.com')
    expect(business.address.addressLocality).toBe('Chapel Hill')
    expect(business.address.addressRegion).toBe('NC')
    expect(business.sameAs).toContain('https://www.instagram.com/cocoscouturecandyco/')

    const areas = business.areaServed.map((area: { name: string }) => area.name)
    expect(areas).toContain('Durham, NC')
    expect(areas).toContain('Orange County, North Carolina')
  })

  test('links to a page for each service area', async ({ page }) => {
    await page.goto(`${base}/service-areas`)

    await expect(page.locator('main h2 a[href^="/service-areas/"]')).toHaveCount(8)

    await page.getByRole('link', { name: 'Durham, NC' }).first().click()

    await expect(page).toHaveURL(`${base}/service-areas/durham-nc`)
    await expect(page).toHaveTitle(/Candy Buffets & Dessert Tables in Durham, NC/)
    await expect(page.locator('h1')).toHaveText('Candy buffets and dessert tables in Durham, NC')

    const service = (await jsonLd(page)).find((data) => data['@type'] === 'Service')
    expect(service.areaServed.name).toBe('Durham, NC')
  })

  test('returns 404 for an unknown service area', async ({ page }) => {
    const response = await page.goto(`${base}/service-areas/nowhere-nc`)

    expect(response?.status()).toBe(404)
  })

  test('lists service areas in the sitemap and allows crawling', async ({ request }) => {
    const sitemap = await (await request.get(`${base}/sitemap.xml`)).text()

    expect(sitemap).toContain('/service-areas/chapel-hill-nc</loc>')
    expect(sitemap).toContain('/services/candy-buffets</loc>')

    const robots = await (await request.get(`${base}/robots.txt`)).text()

    expect(robots).toContain('Sitemap:')
    expect(robots).toContain('Allow: /')
  })

  test('loads every image', async ({ page }) => {
    await page.goto(base)

    const images = page.locator('main img')
    const count = await images.count()
    expect(count).toBeGreaterThan(5)

    for (let index = 0; index < count; index++) {
      const image = images.nth(index)
      await image.scrollIntoViewIfNeeded()
      await expect(image).toHaveJSProperty('complete', true)
      await expect(image).not.toHaveJSProperty('naturalWidth', 0)
      await expect(image).toHaveAttribute('alt', /.{10,}/)
    }
  })

  test('validates the quote form before sending', async ({ page }) => {
    await page.goto(`${base}/contact`)

    await page.getByRole('button', { name: 'Send request' }).click()

    await expect(page.getByText('Please fix the highlighted fields')).toBeVisible()
    await expect(page.locator('#name-error')).toHaveText('Please enter your name.')
    await expect(page.locator('#email-error')).toHaveText('Please enter your email address.')
  })

  test('still shows all content with reduced motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto(base)

    // Scroll-reveal must never leave content hidden when animation is off.
    for (const selector of ['main h2', 'main li', 'main details']) {
      const opacities = await page
        .locator(selector)
        .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).opacity))
      expect(
        opacities.every((opacity) => opacity === '1'),
        selector,
      ).toBe(true)
    }

    await context.close()
  })
})

for (const width of [320, 390, 768]) {
  test.describe(`Responsive at ${width}px`, () => {
    test.use({ viewport: { width, height: 800 } })

    test('no page scrolls sideways', async ({ page }) => {
      for (const path of pages) {
        await page.goto(base + path)

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(0)
      }
    })

    test('header keeps the name and menu button on one row', async ({ page }) => {
      await page.goto(base)

      const brand = await page
        .getByRole('banner')
        .getByRole('link', { name: "Coco's Couture Candy Co." })
        .boundingBox()
      const toggle = await page.getByRole('button', { name: 'Open navigation' }).boundingBox()

      expect(brand && toggle).toBeTruthy()
      expect(brand!.x + brand!.width).toBeLessThanOrEqual(toggle!.x)
      expect(
        Math.abs(brand!.y + brand!.height / 2 - (toggle!.y + toggle!.height / 2)),
      ).toBeLessThan(12)
    })

    test('menu opens and navigates', async ({ page }) => {
      await page.goto(base)

      const nav = page.getByRole('navigation', { name: 'Main' })
      await expect(nav).toBeHidden()

      await page.getByRole('button', { name: 'Open navigation' }).click()
      await expect(nav).toBeVisible()

      await nav.getByRole('link', { name: 'Service Areas' }).click()

      await expect(page).toHaveURL(`${base}/service-areas`)
      await expect(nav).toBeHidden()
    })

    test('tap targets are at least 44px tall', async ({ page }) => {
      await page.goto(base)

      for (const target of await page
        .locator('main a[href="/contact"], main a[href="/menu"], main a[href^="/service-areas/"]')
        .all()) {
        const box = await target.boundingBox()
        expect(box!.height).toBeGreaterThanOrEqual(44)
      }
    })
  })
}
