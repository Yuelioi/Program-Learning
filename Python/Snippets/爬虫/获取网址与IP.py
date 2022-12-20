import requests
import socket
import codecs
import csv


def get_ip(url):
    try:
        h_name = socket.gethostbyname(url)
        IP_addres = socket.gethostbyname(h_name)
    except:
        return "0.0.0.0"
    return IP_addres


def get_location(url):
    ip_address = get_ip(url)
    response = requests.get(f'https://ipapi.co/{ip_address}/json/').json()
    if "error" in response:
        return {"country": "unknow"}

    location_data = {
        "ip": ip_address,
        "city": response.get("city"),
        "region": response.get("region"),
        "country": response.get("country_name")
    }
    return location_data


with codecs.open('1.csv', encoding='utf-8-sig') as f:
    for row in csv.DictReader(f, skipinitialspace=True):
        url = row["link"]
        print(url, end="\t")
        print(get_location(url)["country"])
