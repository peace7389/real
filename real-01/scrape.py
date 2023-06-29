from selenium import webdriver

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.binary_location = '/usr/bin/chromium-browser'

# Pass the path to the ChromeDriver as the first argument and use options argument instead of chrome_options
driver = webdriver.Chrome(executable_path='./chromedriver')

URL = "http://121.190.22.245:55023/dashboard"
driver.get(URL)

page_source = driver.page_source
print(page_source)

driver.quit()







