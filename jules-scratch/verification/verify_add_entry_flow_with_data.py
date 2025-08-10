import os
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    page.on('console', lambda msg: print(msg))

    # Get the absolute path to the HTML file
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(base_dir, '..', '..', 'public', 'index.html')
    index_url = f'file://{index_path}'

    page.goto(index_url)

    # Click the add entry button
    page.click('#add-entry-button')

    # Wait for the entry type page to load
    expect(page).to_have_title("Nanny Calendar - Add Entry")

    # Click the activity button
    page.click('#activity-button')

    # Wait for the activity details page to load
    expect(page).to_have_title("Nanny Calendar - Add Activity")

    # Fill out the form
    page.fill('#activity-name', 'Test Activity')
    page.select_option('#activity-day', 'two') # Corresponds to "two"
    page.select_option('#activity-time', 'three') # Corresponds to "three"

    # Click the save button
    page.click('#save-button')

    # Wait for the confirmation page to load
    expect(page).to_have_title("Nanny Calendar - Confirm")

    # Check the confirmation page content
    expect(page.locator('#confirmation-activity-name')).to_have_text('Test Activity')
    expect(page.locator('#confirmation-activity-schedule')).to_have_text('two, three')

    # Take a screenshot of the confirmation page
    page.screenshot(path="jules-scratch/verification/confirmation_with_data.png")

    # Click the confirm button
    page.click('#confirm-button')

    # Wait for the index page to load
    expect(page).to_have_title("Nanny Calendar - Weekly Overview")

    # Check that the new entry is on the page
    expect(page.locator('#this-week-list')).to_contain_text('Test Activity')

    page.wait_for_selector('#this-week-list >> text=Test Activity')

    # Take a screenshot of the index page
    page.screenshot(path="jules-scratch/verification/index_with_new_entry.png")

    browser.close()
