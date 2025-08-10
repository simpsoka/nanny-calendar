import os
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Get the absolute path to the HTML file
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(base_dir, '..', '..', 'public', 'index.html')
    index_url = f'file://{index_path}'

    page.goto(index_url)

    initial_list_html = page.inner_html('#this-week-list')

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
    page.select_option('#activity-day', 'two')
    page.select_option('#activity-time', 'three')

    # Click the save button
    page.click('#save-button')

    # Wait for the confirmation page to load
    expect(page).to_have_title("Nanny Calendar - Confirm")

    # Click the confirm button
    page.click('#confirm-button')

    # Wait for the index page to load
    expect(page).to_have_title("Nanny Calendar - Weekly Overview")

    final_list_html = page.inner_html('#this-week-list')

    if initial_list_html == final_list_html:
        print("Error: The list was not updated.")
    else:
        print("Success: The list was updated.")
        page.wait_for_timeout(1000)
        page.screenshot(path="jules-scratch/verification/index_with_new_entry.png")

    browser.close()
