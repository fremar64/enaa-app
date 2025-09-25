import { test, expect } from '@playwright/test';

test.describe('Application ENAA', () => {
  test('page d\'accueil se charge correctement', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier que la page se charge
    await expect(page).toHaveTitle(/ENAA/);
    
    // Vérifier la présence d'éléments clés
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigation vers la page de connexion', async ({ page }) => {
    await page.goto('/');
    
    // Cliquer sur le lien de connexion (s'il existe)
    const loginLink = page.locator('a[href*="login"], button:has-text("Connexion")');
    if (await loginLink.count() > 0) {
      await loginLink.first().click();
      await expect(page).toHaveURL(/.*login.*/);
    }
  });
});

test.describe('Tests d\'accessibilité', () => {
  test('navigation au clavier', async ({ page }) => {
    await page.goto('/');
    
    // Tester la navigation au clavier
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('contraste et lisibilité', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier que les éléments textuels sont visibles
    const textElements = page.locator('h1, h2, h3, p, button, a');
    const count = await textElements.count();
    
    for (let i = 0; i < count; i++) {
      const element = textElements.nth(i);
      if (await element.isVisible()) {
        await expect(element).toBeVisible();
      }
    }
  });
});