from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import router
from app.db import Base, engine
from app.settings import settings

app = FastAPI()

origins = [
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(router, prefix=settings.API_PREFIX)

@app.get("/")
async def root():
    return {"message": "Hello World"}