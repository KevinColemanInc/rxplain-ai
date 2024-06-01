from fastapi import FastAPI
import time

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional

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
    message: str


class RequestBody(BaseModel):
    new_context: str
    old_context: str
    history: List[HistoryItem]
    more_information: Optional[str]
    text_input: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


# todo: add accept history
@app.get("/prompt")
async def prompt(prev_context: str, new_context: str, text_input: str):
    # Your logic here to generate phrases and text_response
    phrases = ["Phrase 1", "Phrase 2", "Phrase 3"]
    text_response = "This is the text with Phrase 2 response."

    # Return an instance of PromptResponse
    return PromptResponse(phrases=phrases, text_response=text_response)


def fake_response_streamer():
    fake_response = [
        b"Sure, here's some information about lentil soup with marked interesting or complex phrases:",
        b"Lentil soup is a [hearty](hearty) and [nutritious](nutritious) dish made from [lentils](lentils), a type of ",
        b"[legume](legume) known for their [high protein](high protein) and [fiber content](fiber content). [Lentils](",
        b"    lentils) come in various [colors](colors) such as [brown](brown), [green](green), and [red](red), each o",
        b"    ffering a slightly different [texture](texture) and [flavor profile](flavor profile).",
        b"To make lentil soup, [lentils](lentils) are [cooked](cooked) with [aromatic](aromatic) [vegetables](vegetabl",
        b"es) such as [onions](onions), [carrots](carrots), and [celery](celery) in a [flavorful](flavorful) [broth](b",
        b"roth) or [stock](stock). [Herbs](herbs) and [spices](spices) like [cumin](cumin), [coriander](coriander), an",
        b"d [bay leaves](bay leaves) are often added to enhance the [taste](taste) and [aroma](aroma) of the soup.",
    ]

    for msg in fake_response:
        time.sleep(0.5)
        yield msg


@app.post("/prompt-static")
async def prompt_static(req_body: RequestBody):
    return StreamingResponse(fake_response_streamer())
