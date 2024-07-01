import requests
from dotenv import load_dotenv
import os

load_dotenv()

EBAY_SEARCH_API_ENDPOINT = os.getenv("EBAY_SEARCH_API_ENDPOINT")
EBAY_ACCESS_TOKEN = os.getenv("EBAY_ACCESS_TOKEN")

def search_ebay_by_isbn(isbn):
    headers = {
        'Authorization': f'Bearer {EBAY_ACCESS_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    params = {
        'q': isbn,
        'filter': 'buyingOptions:{FIXED_PRICE},itemLocationCountry:US',
        'limit': 100,
        'offset': 0
    }

    all_items = []
    
    while True:
        response = requests.get(EBAY_SEARCH_API_ENDPOINT, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()
            items = data.get('itemSummaries', [])
            fomatted_items = []
            for item in items:
                fomatted_item = {
                    'isbn': isbn,
                    'itemId': item.get('itemId', ''),
                    'title': item.get('title', ''),
                    'image': item.get('image', {}).get('imageUrl', ''),
                    'price': item.get('price', {}).get('value', ''),
                    'itemHref': item.get('itemHref', ''),
                    'epid': item.get('epid'),
                    'itemWebUrl': item.get('itemWebUrl', ''),
                    'itemCreationDate': item.get('itemCreationDate', ''),
                }
                fomatted_items.append(fomatted_item)
            all_items.extend(fomatted_items)
            
            next_page = data.get('next', None)
            if next_page:
                params['offset'] += 100
            else:
                break
        else:
            response.raise_for_status()

    return all_items
