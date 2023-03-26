import re
import requests
import json
from Snippets.sub_progress.secret import youtube_key as API_KEY
from pathlib import Path


from nnsplit import NNSplit
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)


def split_long_sub(text):
    splitter = NNSplit("models/en/model.onnx")
    splits = splitter.split([text])
    return [str(sentence).strip() for sentence in splits[0]]


def is_old_sub(vtt: str | Path):
    with open(vtt) as vtt_file:
        vtt_file.read()


def get_videoId_by_link(url: str):
    if result := re.search('(?<=v=).+?(?=$|&)', url):
        return result[0]


def get_playlistId_by_link(url: str):
    if result := re.search('(?<=list=).+?(?=$|&)', url):
        return result[0]


def get_urls_by_playlistId(PLAYLIST_ID: str):
    """
    Args:
        PLAYLIST_ID (str): like: PLyJiOytEPs4etH7Ujq7PU7jlOlHL-9RmV
    Returns:
        [type]: url list
    """
    # Set up the API endpoint and request parameters
    url = 'https://www.googleapis.com/youtube/v3/playlistItems'
    params = {
        'part': 'snippet',
        'playlistId': PLAYLIST_ID,
        'maxResults': 50,
        'key': API_KEY,
    }

    # Send the API request and retrieve all playlist items
    video_urls = []
    next_page_token = None
    while True:
        if next_page_token:
            params['pageToken'] = next_page_token
        response = requests.get(url, params=params)
        response_json = json.loads(response.text)
        items = response_json.get('items', [])
        video_urls += [
            f"https://www.youtube.com/watch?v={item['snippet']['resourceId']['videoId']}" for item in items]
        next_page_token = response_json.get('nextPageToken')
        if not next_page_token:
            break

    return video_urls
