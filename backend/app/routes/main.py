from fastapi import APIRouter

from app.routes import user
from app.routes import product

api_router = APIRouter()

api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(product.router, prefix="/product", tags=["product"])