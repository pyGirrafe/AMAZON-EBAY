from datetime import timedelta
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.db import get_db
from app.models import UserRegister, UserLogin, User, Message, Token
from app import crud
from app.settings import settings
from app.utils import create_access_token, get_current_user

SessionDep = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]

router = APIRouter()

@router.post("/login")
def login_user(
    session: SessionDep, form_data: UserLogin
) -> Any:
    user = crud.authenticate(
        session=session, email=form_data.email, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token=create_access_token(user.id, expires_delta=access_token_expires)
    return Token(access_token=access_token)
  
@router.post("/register")
def create_user(*, session: SessionDep, user_in: UserRegister) -> Any:
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists.",
        )

    user = crud.create_user(session=session, user_create=user_in)
    return Message(message="Your account is created successfully")

@router.get("/get_all")
def create_user(*, session: SessionDep, current_user: CurrentUser, page: int, per_page: int) -> Any:
    users, total_count = crud.get_all_users_by_page(session=session, page=page, per_page=per_page)
    return { "totalCount": total_count, "users": users }

@router.get("/user_allow")
def allow_user(*, session: SessionDep, current_user: CurrentUser, userId: int, isActive: bool) -> Any:
    user = crud.allow_user(session=session, userId=userId, isActive=isActive)
    if not user:
        raise HTTPException(
            status_code=400,
            detail="The user with this emawil isn't exists.",
        )
    if user.is_active == True:
        return Message(message="Allowed Successfully")
    else:
        return Message(message="Disallowed Successfully")
   