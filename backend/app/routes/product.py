from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.models import Isbns, User
from app.db import get_db
from app import crud
from app.api_client import ebay_api
from app.utils import get_current_user

SessionDep = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]

router = APIRouter()

@router.post("/search")
def search_ebay_isbn(session: SessionDep, current_user: CurrentUser, isbns: Isbns) -> Any:
    total_count = 0
    print(isbns.isbns)
    try:
        for isbn in isbns.isbns:    
            ebay_products = ebay_api.search_ebay_by_isbn(isbn)
            total_count += len(ebay_products)
            for ebay_product in ebay_products:
                crud.create_product(session=session, ebay_product=ebay_product)
        return {"result": True, "total_count": total_count}
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return {"result": False, "total_count": total_count}

@router.get("/get_all") 
def get_all_products(session: SessionDep, current_user: CurrentUser, page: int, per_page: int) -> Any:
    products = crud.get_all_products_by_page(session=session, page=page, per_page=per_page)
    return products