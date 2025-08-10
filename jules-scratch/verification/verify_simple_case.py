import os
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Get the absolute path to the HTML file
    base_dir = os.path.dirname(os.path.abspath(__file__))
    test_path = os.path.join(base_dir, '..', 'test.html')
    test_url = f'file://{test_path}'

    page.goto(test_url)

    initial_list_html = page.inner_html('#my-list')

    # Click the button
    page.click('#my-button')

    # Wait for the page to reload
    page.wait_for_load_state()

    final_list_html = page.inner_html('#my-list')

    if initial_list_html == final_list_html:
        print("Error: The list was not updated.")
    else:
        print("Success: The list was updated.")
        page.screenshot(path="jules-scratch/verification/simple_case_success.png")

    browser.close()
