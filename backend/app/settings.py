from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_PREFIX: str = '/api/v1'

settings = Settings()  # type: ignore
