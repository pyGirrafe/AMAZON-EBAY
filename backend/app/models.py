from typing import List, Optional
from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

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

class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"
    
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(SQLModel):
    sub: str
    exp: int

class UserLogin(SQLModel):
    email: str
    password: str
    
class Product(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    isbn: str
    itemId: str
    title: str
    image: Optional[str] = ''
    price: Optional[str] = ''
    itemHref: Optional[str] = ''
    epid: Optional[str] = ''
    itemWebUrl: Optional[str] = ''
    itemCreationDate: str

class Isbns(SQLModel):
    isbns: List[str]
