from fastapi import FastAPI
from fastapi.responses import HTMLResponse, PlainTextResponse

app = FastAPI()


@app.get("/text", response_class=PlainTextResponse)
def root_text():
    return "Hello METANIT.COM"


@app.get("/html", response_class=HTMLResponse)
def root_html():
    return "<h2>Hello METANIT.COM</h2>"