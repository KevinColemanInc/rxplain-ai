from fastapi import FastAPI
import time

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
import openai
import os

api_key = os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=api_key)

app = FastAPI()

# Set up CORS to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HistoryItem(BaseModel):
    role: str
    content: str


class RequestBody(BaseModel):
    new_context: str
    history: List[HistoryItem]
    more_information: Optional[str]
    text_input: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/prompt")
async def prompt(req_body: RequestBody):
    messages = [
        {
            "role": "system",
            "content": f"You are an expert in Healthcare terminology be empathetic. important phrases or keywords should be bracketed for example: [skin cancer] context: {req_body.new_context}",
        }
    ]
    messages = messages + req_body.history
    messages.append(
        {
            "role": "user",
            "content": f"Please provide more information about {req_body.more_information}\n.{req_body.text_input}.",
        }
    )
    print("messages", messages)
    response = client.chat.completions.create(model="gpt-4o", messages=messages)
    print(response.choices[0].message.content)

    # Return an instance of PromptResponse
    return response.choices[0].message.content


def fake_response_streamer():
    fake_response = [
        b"Sure, here's some information about lentil soup with marked interesting or complex phrases:",
        b"Lentil soup is a [hearty](hearty) and [nutritious](nutritious) dish made from [lentils soup](lentils), a type of ",
        b"[legume](legume) known for their [high protein](high protein) and [fiber content](fiber content). [Lentils](",
        b"lentils) come in various [colors](colors) such as [brown](brown), [green](green), and [red](red), each o",
        b"ffering a slightly different [texture](texture) and [flavor profile](flavor profile).",
        b"To make lentil soup, [lentils](lentils) are [cooked](cooked) with [aromatic](aromatic) [vegetables](vegetabl",
        b'es) such as :item[**Sparse Transformers**]{ to="Sparse Transformers" }, [carrots](carrots), and [celery](celery) in a [flavorful](flavorful) [broth](b',
        b"roth) or [stock](stock). [Herbs](herbs) and [spices](spices) like [cumin](cumin), [coriander](coriander), an",
        b"d [bay leaves](bay leaves) are often added to enhance the [taste](taste) and [aroma](aroma) of the soup.",
    ]

    for msg in fake_response:
        yield msg


@app.post("/prompt-static")
async def prompt_static(req_body: RequestBody):
    return StreamingResponse(fake_response_streamer())
