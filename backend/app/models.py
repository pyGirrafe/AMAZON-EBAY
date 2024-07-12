from typing import List, Optional
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel
from datetime import datetime

class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    full_name: str | None = Field(default=None, max_length=255)
    is_active: bool = False
    
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)

class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)

class UserAllow(UserBase):
    is_active: bool
    
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

class TokenPayload(SQLModel):
    sub: str
    exp: int

class UserLogin(SQLModel):
    email: str
    password: str

class Message(SQLModel):
    message: str

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"

class SearchIsbn(SQLModel):
    isbns: List[str]
    ebayMakeUp: int
    amazonMakeUp: int
    
class Eb_Product(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    isbn: Optional[str] = None
    makeup: Optional[str] = None
    am_price: Optional[str] = None
    status: str = "store"
    eb_itemId: Optional[str] = None
    eb_title: Optional[str] = None
    eb_price: Optional[str] = None
    eb_categoryPath: Optional[str] = None
    eb_condition: Optional[str] = None
    eb_image: Optional[str] = None
    eb_gtin: Optional[str] = None
    eb_epid: Optional[str] = None
    eb_amount: Optional[str] = None
    eb_shippingServiceCode: Optional[str] = None
    eb_shippingCost: Optional[str] = None
    eb_author: Optional[str] = None
    eb_bookTitle: Optional[str] = None
    eb_publisher: Optional[str] = None
    eb_publisherYear: Optional[str] = None
    eb_language: Optional[str] = None
    eb_topic: Optional[str] = None
    eb_pageNumber: Optional[str] = None
    eb_itemWebUrl: Optional[str] = None
    eb_paymentMethodBrandType: Optional[str] = None
    eb_legacyItemId: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
