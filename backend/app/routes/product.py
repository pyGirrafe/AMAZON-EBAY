from typing import Annotated, Any, List
import json

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.models import User, Message, SearchIsbn
from app.db import get_db
from app import crud
from app.api_client import ebay_api
from app.utils import get_current_user

SessionDep = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]

router = APIRouter()

@router.post("/search")
def search_ebay_isbn(session: SessionDep, search_list: SearchIsbn) -> Message:
    total_count = 0
    new_count = 0
    if search_list.isbns:
        for isbn in search_list.isbns:    
            ebay_products = ebay_api.get_ebay_product(isbn)
            total_count += len(ebay_products)
            for ebay_product in ebay_products:
                ebay_product['makeup'] = str(search_list.ebayMakeUp)
                if ebay_product['eb_price'] is not None and ebay_product['eb_shippingCost'] is not None:
                    ebay_product['am_price'] = str((float(ebay_product['eb_price']) + float(ebay_product['eb_shippingCost'])) * ((100 + search_list.ebayMakeUp) / 100))
                elif ebay_product['eb_price'] is not None and ebay_product['eb_shippingCost'] is None:
                    ebay_product['am_price'] = str(float(ebay_product['eb_price']) * ((100 + search_list.ebayMakeUp) / 100))
                else:
                    ebay_product['am_price'] = None
                new_product = crud.create_product(session=session, ebay_product=ebay_product)
                if new_product:
                    new_count += 1
        return Message(message=f"Successfully Added for products of {new_count}/{total_count}")

@router.get("/get_ebay_all")
def get_all_products(session: SessionDep, current_user: CurrentUser, page: int, per_page: int) -> Any:
    ebay_products, total_count = crud.get_all_products_by_page(session=session, page=page, per_page=per_page)
    return { "totalCount": total_count, "ebay_products": ebay_products }

@router.get("/get_ebay_item")
def get_one_product(session: SessionDep, itemId: str) -> Any:
    ebay_product = crud.get_one_product_by_itemId(session=session, itemId=itemId)
    return ebay_product