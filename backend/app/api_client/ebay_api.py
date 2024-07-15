import requests
from requests.exceptions import ConnectTimeout, HTTPError, RequestException
from dotenv import load_dotenv
import time

from app.token.ebay_token import get_basic_oauth_token

load_dotenv()

EBAY_ACCESS_TOKEN = get_basic_oauth_token()

def search_ebay_by_isbn(isbn):
    EBAY_GET_ITEM_SUMMARY_ENDPOINT = "https://api.ebay.com/buy/browse/v1/item_summary/search"
    headers = {
        'Authorization': f'Bearer {EBAY_ACCESS_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    params = {
        'q': isbn,
        'limit': 200,
        'offset': 0
    }

    all_items = []
    current_page = 1
    while True:
        response = requests.get(EBAY_GET_ITEM_SUMMARY_ENDPOINT, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()
            items = data.get('itemSummaries', [])
            all_items.extend(items)

            print(f"Page {current_page} - Items collected so far: {len(items)}")

            next_page = data.get('next', None)
            if next_page:
                params['offset'] += 200
                current_page = current_page + 1
            else:
                break
        else:
            response.raise_for_status()
    return all_items

def search_ebay_by_item_id(item_id):
    EBAY_GET_ITEM_ENDPOINT = f"https://api.ebay.com/buy/browse/v1/item/{item_id}?fieldgroups=PRODUCT"

    headers = {
        'Authorization': f'Bearer {EBAY_ACCESS_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    retries = 3
    backoff_factor = 0.3
    timeout = 10

    for attempt in range(retries):
        try:
            response = requests.get(EBAY_GET_ITEM_ENDPOINT, headers=headers, timeout=timeout)
            response.raise_for_status()
            return response.json()
        except ConnectTimeout:
            print(f"Attempt {attempt + 1}: Connection timed out. Retrying...")
            time.sleep(backoff_factor * (2 ** attempt))
        except HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
            break
        except RequestException as req_err:
            print(f"Request error occurred: {req_err}")
            break
    return None

def get_ebay_itemId(all_items):
    all_itemIds = []
    item_count = 1
    for item in all_items:
        filtered_item = filter_item(item)
        if filtered_item:
            print(f"{item_count}: ItemId {item["itemId"]}")
            itemId = search_ebay_by_item_id(item["itemId"])
            all_itemIds.append(itemId)
            item_count = item_count +  1
    return all_itemIds

def filter_item(item):
    conditionId = item.get("conditionId")
    buyingOptions = item.get("buyingOptions")
    listingMarketplaceId = item.get("listingMarketplaceId")

    if conditionId is not None and buyingOptions is not None and listingMarketplaceId is not None:
        try:
            if int(conditionId) < 4500 and "FIXED_PRICE" in buyingOptions and listingMarketplaceId == "EBAY_US":
                return item
        except ValueError:
            return None
    return None

def filter_details(data):
    eb_itemId = data.get("itemId")
    eb_title = data.get("title")
    eb_price = data.get("price", {}).get("value")
    eb_categoryPath = data.get("categoryPath")
    eb_condition = data.get("condition")
    eb_image = data.get("image", {}).get("imageUrl")
    eb_gtin = data.get("gtin")
    eb_epid = data.get("epid")
    estimatedAvailabilities = data.get("estimatedAvailabilities", [])
    if estimatedAvailabilities:
        eb_amount = str(estimatedAvailabilities[0].get("estimatedAvailableQuantity"))
    else:
        eb_amount = None
    shipping_options = data.get("shippingOptions", [])
    if shipping_options:
        eb_shippingServiceCode = shipping_options[0]["shippingServiceCode"]
        eb_shippingCost = shipping_options[0]["shippingCost"]["value"] or '0.00'
    else:
        eb_shippingServiceCode = None
        eb_shippingCost = None
    eb_author = None
    eb_bookTitle = None
    eb_publisher = None
    eb_publisherYear = None
    eb_language = None
    eb_topic = None
    eb_pageNumber = None
    if "localizedAspects" in data:
        for item in data["localizedAspects"]:
            name = item.get("name", "")
            value = item.get("value", "")
            
            if name == "Author":
                eb_author = value
            elif name == "Book Title":
                eb_bookTitle = value
            elif name == "Publisher":
                eb_publisher = value
            elif name == "Publication Year":
                eb_publisherYear = value
            elif name == "Language":
                eb_language = value
            elif name == "Topic":
                eb_topic = value
            elif name == "Number of Pages":
                eb_pageNumber = value.split()[0]
    eb_itemWebUrl = data.get("itemWebUrl")
    eb_paymentMethodBrandType = get_paymentMethodBrandType(data.get("paymentMethods"))
    eb_legacyItemId = data.get("legacyItemId")
    return eb_itemId, eb_title, eb_price, eb_categoryPath, eb_condition, eb_image, eb_gtin, eb_epid, eb_shippingServiceCode, eb_shippingCost, eb_author, eb_bookTitle, eb_publisher, eb_publisherYear, eb_language, eb_topic, eb_pageNumber, eb_itemWebUrl, eb_paymentMethodBrandType, eb_legacyItemId, eb_amount

def get_paymentMethodBrandType(paymentMethods):
    payment_method_brands = []
    if paymentMethods:
        for item in paymentMethods:
            if "paymentMethodBrands" in item:
                for brand in item["paymentMethodBrands"]:
                    payment_method_brands.append(brand["paymentMethodBrandType"])
        result = ",".join(payment_method_brands)
        return result

def get_ebay_product(isbn):
    print(f"Searching for {isbn}")
    all_items = search_ebay_by_isbn(isbn)
    print(f"Total Count of Items: {len(all_items)}")
    all_itemIds = get_ebay_itemId(all_items)
    print(f"Total Available Count of Items: {len(all_itemIds)}")
    
    products = []
    for item in all_itemIds:
        if item is not None:
            filtered_data = filter_details(item)
            product_dict = {
                "isbn": isbn,
                "eb_itemId": filtered_data[0],
                "eb_title": filtered_data[1],
                "eb_price": filtered_data[2],
                "eb_categoryPath": filtered_data[3],
                "eb_condition": filtered_data[4],
                "eb_image": filtered_data[5],
                "eb_gtin": filtered_data[6],
                "eb_epid": filtered_data[7],
                "eb_shippingServiceCode": filtered_data[8],
                "eb_shippingCost": filtered_data[9],
                "eb_author": filtered_data[10],
                "eb_bookTitle": filtered_data[11],
                "eb_publisher": filtered_data[12],
                "eb_publisherYear": filtered_data[13],
                "eb_language": filtered_data[14],
                "eb_topic": filtered_data[15],
                "eb_pageNumber": filtered_data[16],
                "eb_itemWebUrl": filtered_data[17],
                "eb_paymentMethodBrandType": filtered_data[18],
                "eb_legacyItemId": filtered_data[19],
                "eb_amount": filtered_data[20]
            }
            products.append(product_dict)
    
    return products
