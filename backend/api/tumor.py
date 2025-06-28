# app/api/tumor.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from core.utils import preprocess_image_tf, generate_gemini_insights
from functools import lru_cache
import numpy as np
from keras import Sequential
from keras.layers import TFSMLayer
import os
from huggingface_hub import snapshot_download

router = APIRouter()

CLASS_LABELS = ["glioma", "meningioma", "no_tumor", "pituitary"]


@lru_cache(maxsize=1)
def load_model():
    model_dir = snapshot_download(
        repo_id="uiuxarghya/test-store",
        repo_type="dataset",
        allow_patterns=["models/tumor_effnet/*"],
        local_dir="hf_cache/tumor_effnet",
        local_dir_use_symlinks=False
    )
    model_path = os.path.join(model_dir, "models", "tumor_effnet")
    return Sequential([TFSMLayer(model_path, call_endpoint="serving_default")])


@router.post(
    "/classify",
    name="neuro_setu",
    description="Classify brain tumor type from MRI images",
)
async def classify(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        if file.content_type not in ["image/jpeg", "image/png"]:
            raise HTTPException(status_code=400, detail="Only JPG/PNG supported.")

        input_tensor = preprocess_image_tf(contents)
        model = load_model()
        predictions = model(input_tensor)

        if isinstance(predictions, dict):
            predictions = list(predictions.values())[0]

        confidences = predictions[0].numpy().tolist()  # type: ignore
        predicted_class = CLASS_LABELS[np.argmax(confidences)]
        confidence_dict = {
            label: round(float(score), 4)
            for label, score in zip(CLASS_LABELS, confidences)
        }

        insights = await generate_gemini_insights(
            predicted_class, confidence_dict, mode="tumor"
        )
        return {
            "predictedClass": predicted_class,
            "confidences": confidence_dict,
            "insights": insights,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Classification failed: {str(e)}")