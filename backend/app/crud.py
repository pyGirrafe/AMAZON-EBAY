from sqlalchemy import func
from sqlmodel import Session, select
from datetime import datetime

from app.models import User, UserCreate, UserAllow, Eb_Product
from app.utils import get_password_hash, verify_password

def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user

def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user

def get_user_by_id(*, session: Session, userId: int) -> User | None:
    statement = select(User).where(User.id == userId)
    session_user = session.exec(statement).first()
    return session_user

def allow_user(*, session: Session, userId: int, isActive: bool) -> User | None:
    db_user = get_user_by_id(session=session, userId=userId)
    if not db_user:
        return None
    db_user.is_active = isActive
    db_user.updated_at = datetime.utcnow()
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

def create_product(session: Session, ebay_product: Eb_Product) -> Eb_Product:
    try:
        existing_product = session.query(Eb_Product).filter_by(eb_itemId=ebay_product["eb_itemId"]).first()
        if existing_product:
            return None
        
        db_obj = Eb_Product.model_validate(ebay_product)

        session.add(db_obj)
        session.commit()

        session.refresh(db_obj)
        return db_obj

    except Exception as e:
        session.rollback()
        print(f"Error creating product: {str(e)}")
        raise 

def get_all_products_by_page(*, session: Session, page: int = 1, per_page: int = 20) -> Eb_Product | None:
    offset = (page - 1) * per_page
    statement = select(Eb_Product).order_by(Eb_Product.created_at.desc()).offset(offset).limit(per_page)
    results = session.exec(statement)
    total_count = session.exec(select(func.count(Eb_Product.id)))
    return results, total_count

def get_one_product_by_itemId(*, session: Session, itemId: str) -> Eb_Product | None:
    statement = select(Eb_Product).where(Eb_Product.eb_itemId == itemId)
    result = session.exec(statement).first()
    if result:
        return result
    else:
        return None
    
def get_all_users_by_page(*, session: Session, page: int = 1, per_page: int = 20) -> Eb_Product | None:
    offset = (page - 1) * per_page
    statement = select(User).order_by(User.created_at.desc()).offset(offset).limit(per_page)
    results = session.exec(statement)
    total_count = session.exec(select(func.count(User.id)))
    return results, total_count
