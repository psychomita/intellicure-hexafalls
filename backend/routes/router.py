# app/routes/router.py
from fastapi import APIRouter
from api import tumor, pneumonia, alzheimers, disease

api_router = APIRouter()
api_router.include_router(
    tumor.router,
    prefix="/tumor",
)  # Tumor Insight
api_router.include_router(
    pneumonia.router,
    prefix="/pneumonia",
)  # Pneumonia Insight
api_router.include_router(
    alzheimers.router,
    prefix="/alzheimers",
)  # Alzheimer Insight
api_router.include_router(
    disease.router,
    prefix="/disease",
)  # General Disease Classification