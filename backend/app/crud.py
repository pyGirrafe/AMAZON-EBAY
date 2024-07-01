from sqlmodel import Session, select

from app.models import User, UserCreate, UserUpdate, Product
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

def create_product(session: Session, ebay_product: Product) -> Product:
    db_obj = Product.model_validate(ebay_product)
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def get_all_products_by_page(*, session: Session, page: int = 1, per_page: int = 20) -> Product | None:
    offset = (page - 1) * per_page
    statement = select(Product).offset(offset).limit(per_page)
    results = session.exec(statement)
    return results
