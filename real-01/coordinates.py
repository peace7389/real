import requests
from bs4 import BeautifulSoup

# URLs of the web pages to scrape
urls = ['http://121.190.22.245:55023/dashboard']

# Dictionary to store the column names and their respective coordinates
column_coords = {}

# Loop through each URL
for url in urls:
    # Fetch the HTML content of the web page
    response = requests.get(url)
    
    print(f"response : {response}")
    print("")
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        print(f"response.text : {response.text}")
        print("")
        print(f"soup : {soup}")
        
        # Find all area tags
        areas = soup.find_all('line')
        
        # Loop through each area tag
        for area in areas:
            # Extract the column name from the href or alt attribute (depends on the web page)
            # and the coords attribute
            x1 = area.get('x1')
            y1 = area.get('y1')
            
            # Store them in the dictionary
            print(f'x1 = {x1}')
            print(f'y1 = {y1}')

