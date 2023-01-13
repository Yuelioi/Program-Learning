import requests
req_url = "https://api.lolicon.app/setu/v2"
params = {
    "keyword": "",
    "r18": 1,
    "size": "regular"
}
q = requests.get(url = req_url,params=params)
print(q.text)
